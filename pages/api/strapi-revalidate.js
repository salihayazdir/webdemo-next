export default async function strapiRevalidate(req, res) {
    
    console.log(req)

    if (req.headers.secret !== process.env.REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid token.' })
    }

    if((req.body.event !== "entry.update" || "entry.unpublish") && req.body.model !== "page") {
        return res.status(500).send('Event type is not page update or unpublish.')
    }

    const slug = req.body.entry.slug
    if(!slug) return res.status(500).send('Page not found.')

    try {
        await res.revalidate(`/${slug}`)
        return res.json({ revalidated: true })
      } catch (err) {
        return res.status(500).send('Error revalidating.')
      }
  }