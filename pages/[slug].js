import FetchFromCms from "../lib/FetchFromCms"
import PopulateNavMenu from "../lib/PopulateNavMenu"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
import getLocaleAlias from "../lib/getLocaleAlias"
import { useNavigation } from "../lib/NavContext"
import { useEffect } from "react"

export default function Page({ pageData, categoryData, localeAlias }) {
    
    PopulateNavMenu(categoryData)
    
    const { t } = useTranslation('common')
    
    const router = useRouter()

    const { setCurrentLocaleAlias } = useNavigation()
    useEffect(() => {
        setCurrentLocaleAlias(localeAlias)
    },[])

    return (
        <>
            <h1>{pageData.title}</h1>
            <h1>{pageData.content}</h1>
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