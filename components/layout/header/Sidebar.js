import { useNavigation } from '../../../lib/NavContext'
import { Dialog, Disclosure } from '@headlessui/react'
import { XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import LanguageSelect from '../LanguageSelect';

export default function Sidebar({sidebarIsOpen, setSidebarIsOpen}) {
  
  const { navigation } = useNavigation();
  const { t } = useTranslation('common')

  const menu = navigation.map(category => (
    <Disclosure key={category.id}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex justify-between w-full px-4 py-2 text-xl font-medium
            text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75`}
          >
            <span>{category.name}</span>
            <ChevronUpIcon className={`${ open ? 'rotate-180 transform' : '' } h-5 w-5`} />
          </Disclosure.Button>
          <Disclosure.Panel
            className="px-4 pb-4 text-sm text-gray-500"
          >
            <ul className='flex flex-col gap-2 text-lg'>
              {
                category.pages.map(page => (
                  <li key={page.id} >
                    <Link href={page.slug} >
                        <a onClick={() => setSidebarIsOpen(false)}>
                          {page.title}
                        </a>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))

  return (
  <Dialog
    as="div"
    className="relative z-10"
    open={sidebarIsOpen}
    onClose={() => setSidebarIsOpen(false)}
  >
    <div className="fixed inset-0 bg-black bg-opacity-25" />
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex justify-center min-h-full p-6">
        <Dialog.Panel
          className={`w-full max-w-md p-6 overflow-hidden text-left
            align-middle transition-all transform bg-white rounded-lg shadow-xl`}
        >
          <Dialog.Title
            as="div"
            className="flex justify-between"
          >
            <h3 className='font-medium leading-6 text-gray-400'>
              MENU
            </h3>
            <button onClick={() => setSidebarIsOpen(false)}>
              <XMarkIcon className="w-6 h-6" aria-hidden="true"/>
            </button>
          </Dialog.Title>
          <div className='flex flex-col justify-between h-full' >
            <div className="mt-6">
              {menu}
            </div>
            <div className='mb-6' >
              <LanguageSelect />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
  )
}