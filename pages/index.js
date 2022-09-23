import Head from 'next/head'
import FetchFromCms from '../lib/FetchFromCms'
import PopulateNavMenu from '../lib/PopulateNavMenu'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { useNavigation } from '../lib/NavContext'


export default function Home({categoryData}) {
  PopulateNavMenu(categoryData)
  const { setCurrentLocaleAlias } = useNavigation()
  useEffect(() => {
    setCurrentLocaleAlias("/")
  },[])
  
  const { t } = useTranslation('common')

  return (
    <div>
      <Head>
        <title>Bileşim A.Ş. | Anasayfa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex max-w-20' >
        <h1>{t('heading')}</h1>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  
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

  // const translations = await serverSideTranslations(locale, ['common'])

  return { props: { categoryData, ...(await serverSideTranslations(locale, ['common'])) } }
}