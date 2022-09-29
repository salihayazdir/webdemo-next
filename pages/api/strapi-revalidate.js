import axios from "axios"

export default async function strapiRevalidate(req, res) {
    
    console.log(req)

    if (req.headers.secret !== process.env.REVALIDATION_TOKEN) {
        return res.status(500).json({ message: 'Invalid token.' })
    }

    if((req.body.event !== "entry.publish" || "entry.unpublish") && req.body.model !== "page") {
        return res.status(500).send('Event type is not page publish or unpublish.')
    }

    const pathsRequestConfig = {
        headers: {  "Authorization": `bearer ${process.env.STRAPI_TOKEN}` },
        params: {
            "fields[0]": "slug",
            "fields[1]": "locale",
            "locale[0]" : "en",
            "locale[1]" : "tr-TR",
        }
    }
    
    const pathsRequestUrl = `${process.env.STRAPI_URL}/pages`
    
    try {

        const pathsRequest = await axios.get(
            pathsRequestUrl,
            pathsRequestConfig
        )

        const allPaths = await pathsRequest.data.data.map(page => page.attributes)

        const enPaths = allPaths.filter(path => path.locale === "en")
            .map(path => path.slug)
        const trPaths = allPaths.filter(path => path.locale === "tr-TR")
            .map(path => path.slug)
            
        enPaths.forEach(path => {
            res.revalidate(`/en/${path}`)
        });

        trPaths.forEach(path => {
            res.revalidate(`/${path}`)
        });
        
        res.revalidate("/")
        res.revalidate("/en")

        return res.json({ revalidated: true })
      }
      
      catch (err) {
        console.error(err)
        return res.status(500).send('Error revalidating.')
      }
  }