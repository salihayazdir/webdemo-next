import { Fragment } from 'react';
import { useNavigation } from '../../lib/NavContext'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Sidebar({sidebarIsOpen, setSidebarIsOpen}) {
  
  const {navigation} = useNavigation();
  
  const menu = navigation.map(category => (
    <Disclosure key={category.id}>
        {({ open }) => (
        <>
            <Disclosure.Button
            className="flex justify-between w-full px-4 py-2 text-xl font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                <span>{category.name}</span>
                <ChevronUpIcon className={`${ open ? 'rotate-180 transform' : '' } h-5 w-5`} />
            </Disclosure.Button>
            <Disclosure.Panel
            className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <ul>
                    {
                        category.pages.map(page => (
                            <li key={page.id} >
                                <Link href={`/${page.slug}`} >
                                    <a>{page.title}</a>
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
    <Transition appear show={sidebarIsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setSidebarIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center min-h-full p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-10"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 translate-x-10"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                    <Dialog.Title
                    as="div"
                    className="flex justify-between">
                    <h3 className='text-xl font-medium leading-6 text-gray-900'>
                        Menü
                    </h3>
                    <button onClick={() => setSidebarIsOpen(false)}>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true"/>
                    </button>
                    </Dialog.Title>
                    <div className="mt-6">
                    {menu}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}