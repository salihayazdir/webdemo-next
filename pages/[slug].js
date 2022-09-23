import FetchFromCms from "../lib/FetchFromCms"
import PopulateNavMenu from "../lib/PopulateNavMenu"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
import getLocaleAlias from "../lib/getLocaleAlias"
import { useNavigation } from "../lib/NavContext"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw"
import rehypeSanitize from 'rehype-sanitize'
import Image from "next/image"

export default function Page({ pageData, categoryData, localeAlias }) {

    PopulateNavMenu(categoryData)
    const { t } = useTranslation('common')
    const router = useRouter()

    const imageSizes = () => {
        if(router.asPath === ("/yonetici-kadromuz" || "/management-staff")) {
            return {width: "500", height: "800"}
        }
    }

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
            <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
                img: ({node, ...props}) => (
                <Image width={imageSizes().width} height={imageSizes().height} layout="intrinsic" objectFit="cover" {...props} />
                )
            }}
            className="prose prose-stone max-w-none
            prose-h1:text-3xl prose-h1:mt-4 prose-h1:font-bold
            prose-h2:mb-2 prose-h2:mt-4 prose-h2:text-2xl
            prose-h5:text-lg prose-h5:font-medium
            prose-img:min-w-[200px] prose-img:rounded-md prose-img:mt-4 prose-img:mb-0
            prose-thead:hidden
            prose-tr:py-0
            prose-td:align-top prose-td:px-6
            prose-td:-md:flex prose-td:-md:flex-col  prose-td:-md:p-2
            " >
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