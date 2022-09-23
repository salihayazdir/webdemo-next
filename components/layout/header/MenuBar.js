import React from 'react'
import LanguageSelect from '../LanguageSelect'
import { useNavigation } from '../../../lib/NavContext'

function MenuBar() {
    const { navigation } = useNavigation()

    const menuLinks = navigation.map(menuItem => (
        <li>
            {menuItem.name}
        </li>
    ))

    return (
    <div className='flex items-center gap-8' >
        <ul className='flex items-center gap-6' >
            {menuLinks}
        </ul>
        <LanguageSelect/>
    </div>
  )
}

export default MenuBar