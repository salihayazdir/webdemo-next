import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw"
import rehypeSanitize from 'rehype-sanitize'
import Image from "next/image"

function RenderMarkdown({content, styles, slug}) {
    
    const imageSizes = () => {
        if(slug === ("yonetici-kadromuz" || "management-staff")) {
            return {width: "500", height: "800"}
        }
    }
  
    return (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
            img: ({node, ...props}) => (
            <Image width={imageSizes().width} height={imageSizes().height} layout="intrinsic" objectFit="cover" {...props} />
            )
        }}
        className={`prose prose-stone max-w-none
        prose-h1:text-3xl prose-h1:mt-4 prose-h1:font-bold
        prose-h2:mb-2 prose-h2:mt-4 prose-h2:text-2xl
        prose-h5:text-lg prose-h5:font-medium
        prose-img:min-w-[200px] prose-img:rounded-md prose-img:mt-4 prose-img:mb-0
        prose-thead:hidden
        prose-tr:py-0
        prose-td:align-top prose-td:px-6
        prose-td:-md:flex prose-td:-md:flex-col  prose-td:-md:p-2
        ${styles}
        `} >
            {content}
    </ReactMarkdown>
  )
}

export default RenderMarkdown