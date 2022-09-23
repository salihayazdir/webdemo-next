import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useNavigation } from '../../lib/NavContext'

function LanguageSelect() {
    const router = useRouter()
    const { currentLocaleAlias} = useNavigation();
    return (
    <div className='px-4 py-2 text-center bg-gray-100 rounded-md' >
        <Link
            href={`/${currentLocaleAlias}`}
            locale={router.locale === 'tr' ? 'en' : 'tr'}>
            <button>
            {router.locale === 'tr' ? 'English' : 'Türkçe'}
            </button>
        </Link>
    </div>
  )
}

export default LanguageSelect