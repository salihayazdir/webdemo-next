import fetchFromCms from "./fetchFromCms"

export default async function getLocaleAlias(currentPath) {

  const pathsData = await fetchFromCms(
    {
      url: "pages",
      params: {
        "fields[0]": "slug",
        "populate[localizations][fields][0]": "slug",
      }
    }
  )

  const aliases = pathsData.data.map(page => (
    {
      tr: page.attributes.slug,
      en: page.attributes.localizations.data[0].attributes.slug,
    }
  ))

  const aliasGroup = aliases.find(group => (currentPath === group.tr) || (currentPath === group.en))

  if(!aliasGroup){
      return '/'
  } else if(currentPath === aliasGroup.tr) {
      return aliasGroup.en
  } else if(currentPath === aliasGroup.en) {
      return aliasGroup.tr
  } else {
      return '/'
  }
}