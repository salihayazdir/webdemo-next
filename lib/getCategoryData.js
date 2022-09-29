import fetchFromCms from "./fetchFromCms"

export default async function getCategoryData(locale) {

    const categoryData = await fetchFromCms({
        url: "categories",
        params: {
          "locale" : `${(locale === "en" ? "en" : "tr-TR")}`,
          "fields[0]": "category_name", 
          "fields[1]": "category_slug",
          "populate[pages][fields][0]": "title",
          "populate[pages][fields][1]": "slug"
        }
      })
      
    return await categoryData
}