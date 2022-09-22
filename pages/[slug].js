import FetchFromCms from "../lib/FetchFromCms"
import PopulateNavMenu from "../lib/PopulateNavMenu"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
import getLocaleAlias from "../lib/getLocaleAlias"
import { useNavigation } from "../lib/NavContext"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown";

export default function Page({ pageData, categoryData, localeAlias }) {

    PopulateNavMenu(categoryData)
    const { t } = useTranslation('common')
    const router = useRouter()

    const { setCurrentLocaleAlias } = useNavigation()
    useEffect(() => {
        setCurrentLocaleAlias(localeAlias)
    },[router.asPath])

    return (
        <>
            {/* <h1 className="text-xl font-semibold" >
                {pageData.title}
            </h1>
            <hr className="my-4" /> */}
            <ReactMarkdown className="prose prose-stone prose-h1:text-[#00a3c0]" >
                {pageData.content}
            </ReactMarkdown>
        </>
    )
}

export async function getStaticPaths() {
    const trPageListData = await FetchFromCms(
        {url: "pages",
        params: {
            "fields[0]": "slug",
        }
    })
    const trPaths = trPageListData.data.map(page => ({
        params: { slug: page.attributes.slug },
        locale: "tr"
    }))

    const enPageListData = await FetchFromCms(
        {url: "pages",
        params: {
            "fields[0]": "slug",
            "locale": "en"
        }
    })
    const enPaths = enPageListData.data.map(page => ({
        params: { slug: page.attributes.slug },
        locale: "en"
    }))

    const paths = trPaths.concat(enPaths)

    return { 
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params, locale }) {
    const { slug } = params

    const data = await FetchFromCms({
        url: "pages",
        params: { 
            "filters[slug][$eq]": slug,
            "locale" : `${(locale === "tr" ? "tr-TR" : "en")}`,
        }
    })

    const pageData = data.data[0].attributes

    const categoryData = await FetchFromCms({
        url: "categories",
        params: {
            "locale" : `${(locale === "tr" ? "tr-TR" : "en")}`,
            "fields[0]": "category_name", 
            "fields[1]": "category_slug",
            "populate[pages][fields][0]": "title",
            "populate[pages][fields][1]": "slug"
        }
      })

    const localeAlias = await getLocaleAlias(slug)
    
    return {
        props: { pageData, categoryData, localeAlias }
    }
}