import axios from "axios";

export default async function FetchFromCms({url, params}) {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    
        const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`, {
          params: { ...params }
        });

        return res.data
    
      } catch (err) {
        console.error(err);
        return { error: err }
      }
}

FetchFromCms.defaultProps = {
    url: "",
    params: { populate: '*' }
}