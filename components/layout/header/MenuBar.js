import React from 'react'
import LanguageSelect from '../LanguageSelect'
import { useNavigation } from '../../../lib/NavContext'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
  

function MenuBar() {
    const { navigation } = useNavigation()

    const menu = navigation.map(category => (
    <Popover className="relative" key={category.slug} >
        {({ open }) => (
        <>
        <Popover.Button
        className={`
            ${open ? 'text-gray-900' : 'text-gray-500'}
            group inline-flex items-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
            <span>{category.name}</span>
            <ChevronDownIcon
                className={`
                ${open ? 'text-gray-600' : 'text-gray-400'}
                ml-2 h-5 w-5 group-hover:text-gray-500`}
                aria-hidden="true"
            />
        </Popover.Button>

        <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        >
            <Popover.Panel className="absolute z-10 max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 px-5 py-6 bg-white min-w-[250px] sm:gap-8 sm:p-8">
                        {category.pages.map((page) => (
                        <Link href={page.slug} key={page.slug}  >
                            <a 
                            className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                            >
                                {/* <ChartBarIcon className="flex-shrink-0 w-6 h-6 text-indigo-600" aria-hidden="true" /> */}
                                <div className="">
                                <p className="text-gray-900 ">{page.title}</p>
                                </div>
                            </a>
                        </Link>
                        ))}
                    </div>
                </div>
            </Popover.Panel>
        </Transition>
        </>
        )}
    </Popover>
    ))

    return (
    <Popover className="relative flex items-center gap-10">
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {menu}
          </Popover.Group>
          <LanguageSelect/>
    </Popover>
  )
}

export default MenuBar