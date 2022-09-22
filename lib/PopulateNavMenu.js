import { useEffect } from 'react'
import { useNavigation } from '../lib/NavContext'

export default function PopulateNavMenu(categoryData) {
  
    const { setNavigation } = useNavigation();

    const categories = categoryData.data.map(category => {
        const pages = category.attributes.pages.data.map(page => {
        return {
            id: page.id,
            title: page.attributes.title,
            slug: page.attributes.slug,
        }
        })
        
        return {
        id: category.id,
        name: category.attributes.category_name,
        slug: category.attributes.category_slug,
        pages: pages
        }
    })

    useEffect(() => {
        setNavigation(categories)
    }, [])
}