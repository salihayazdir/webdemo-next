import FetchFromCms from "../lib/FetchFromCms"
import PopulateNavMenu from "../lib/PopulateNavMenu"

export default function Page({ pageData, categoryData }) {
    PopulateNavMenu(categoryData)
    
    return (
        <>
            <h1>{pageData.title}</h1>
            <h1>{pageData.content}</h1>
        </>
    )
}

export async function getStaticPaths() {
    const data = await FetchFromCms({url: "pages"})
    const paths = data.data.map(page => ({
        params: { slug: page.attributes.slug }
    }))
    return { 
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const data = await FetchFromCms({url: "pages", params: { "filters[slug][$eq]": slug  }})
    const pageData = data.data[0].attributes

    const categoryData = await FetchFromCms({
        url: "categories",
        params: {
          "fields[0]": "category_name", 
          "fields[1]": "category_slug",
          "populate[pages][fields][0]": "title",
          "populate[pages][fields][1]": "slug"
        }
      })
    
    return {
        props: { pageData, categoryData }
    }
}