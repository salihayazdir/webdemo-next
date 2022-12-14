import fetchFromCms from "../lib/fetchFromCms"
import getCategoryData from "../lib/getCategoryData"
import PopulateNavMenu from "../lib/PopulateNavMenu"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
import getLocaleAlias from "../lib/getLocaleAlias"
import { useNavigation } from "../lib/NavContext"
import { useEffect } from "react"
import Head from "next/head"
import RenderMarkdown from "../components/RenderMarkdown"

export default function Page({ pageData, categoryData, localeAlias, slug }) {
    
    PopulateNavMenu(categoryData)
    
    const { t } = useTranslation('common')
    const router = useRouter()

    const { setCurrentLocaleAlias } = useNavigation()
    useEffect(() => {
        setCurrentLocaleAlias(localeAlias)
    },[router.asPath])

    return (
    <>
        <Head>
            <title>{`${pageData.title} | Bileşim`}</title>
            <meta name="description" content={pageData.description || `${pageData.title} | Bileşim Finansal Teknolojiler ve Ödeme Sistemleri`} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <RenderMarkdown
            content={pageData.content}
            styles=""
            slug={slug}
        />
    </>
    )
}

export async function getStaticPaths() {

    const pathsRequest = await fetchFromCms(
        {
            url: "pages",
            params: {
                "fields[0]": "slug",
                "fields[1]": "locale",
                "locale[0]" : "en",
                "locale[1]" : "tr-TR",
            }
        }
    )

    const pathsData = await pathsRequest.data.map(page => page.attributes)

    const paths = pathsData.map(page => ({
        params: { slug: page.slug },
        locale: `${(page.locale === "en" ? "en" : "tr")}`
    }))

    return { 
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params, locale }) {
    
    const { slug } = params

    const data = await fetchFromCms({
        url: "pages",
        params: { 
            "filters[slug][$eq]": slug,
            "locale" : `${(locale === "en" ? "en" : "tr-TR")}`,
        }
    })

    const pageData = data.data[0].attributes

    const categoryData = await getCategoryData(locale)

    const localeAlias = await getLocaleAlias(slug)
    
    return {
        props: { 
            pageData,
            categoryData,
            localeAlias,
            slug
        }
    }
}