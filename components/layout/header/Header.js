import { useState } from 'react'
import { useNavigation } from '../../../lib/NavContext'
import Sidebar from './Sidebar'
import Link from 'next/link';
import MenuBar from './MenuBar';
import { Bars3Icon } from '@heroicons/react/20/solid';

export default function Header() {
  
  const {navigation} = useNavigation();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  
  const menu = navigation.map(category => (
    <li key={category.id}>{category.name}</li>
  ))

  return (
    <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200`} >
      
      <Sidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen} />

      <div>
        <Link href='/' >
          <a>LOGO</a>
        </Link>
      </div>
      <div className='-md:hidden' >
        <MenuBar/>
      </div>
      <button
        onClick={() => setSidebarIsOpen(true)}
        className="md:hidden"
      >
        <Bars3Icon className="w-6 h-6"/>
      </button>
    </div>
  )
}

