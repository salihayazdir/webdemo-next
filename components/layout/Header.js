import { useState } from 'react';
import { useNavigation } from '../../lib/NavContext'
import Sidebar from './Sidebar';

export default function Header() {
  
  const {navigation, setNavigation} = useNavigation();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  
  const menu = navigation.map(category => (
    <li key={category.id}>{category.name}</li>
  ))

  return (
    <div className={`flex justify-between px-6 py-4 text-xl bg-gray-200`} >
      
      <Sidebar
      sidebarIsOpen={sidebarIsOpen}
      setSidebarIsOpen={setSidebarIsOpen} />

      <div>LOGO</div>
      <button
      onClick={() => setSidebarIsOpen(true)}>
        NAV
      </button>
    </div>
  )
}