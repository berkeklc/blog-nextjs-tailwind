import Head from 'next/head'
import {format, parseISO, add} from 'date-fns'
import Navigation from '../../components/navigation';
import Comments from '../../components/comments';
import Form from '../../components/form';
import { getMdxNode, getMdxPaths } from "next-mdx/server"
import { useHydrate } from "next-mdx/client"
import { mdxComponents } from "../../components/mdx-components"
import { useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from "react"
const turkishLocale = require('date-fns/locale/tr');

export default function BlogPage({ post }) {
  const { getAccessTokenSilently } = useAuth0();
  const [text, textSet] = useState("")
  const [url, urlSet] = useState(null)
  const [comments, commentsSet] = useState([])

  const fetchComment = async () => {
    const query = new URLSearchParams({ url })
    const newUrl = `/api/comment?${query.toString()}`
    const response = await  fetch(newUrl, {
      method: 'GET',
     })
     const data = await response.json()
     commentsSet(data)
  }
  useEffect(() =>{
    if(!url) return
     fetchComment()
  }, [url])

  useEffect(() => {
const url = window.location.origin + window.location.pathname
urlSet(url)

  }, [])
  const content = useHydrate(post, {
    components: mdxComponents,
  })
  const onSubmit = async (e) => {
    e.preventDefault()
const userToken = await getAccessTokenSilently()
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ text, userToken, url }),
      headers:  {
        "Content-Type": 'application/json'
      }
    }) 
    const data = await response.json()
    fetchComment()
    textSet('')

  }
  return ( 
    <div>
      <Head>
        <title>{post.frontMatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <article className="prose lg:prose-xl mx-auto">
      <div className="border-b-2 border-gray-200 pb-2 mb-4">
        <h2 className="text-3xl font-bold mb-2">
         {post.frontMatter.title}
        </h2>
        <div className="text-gray-600 text-xs">{format(parseISO(post.frontMatter.date), 'MMMM do, uuu', { locale: turkishLocale })}</div>
      </div>
        <div>{content}</div>
      </article>

      <div className="mx-auto prose  lg:prose-xl">
        <Form onSubmit={onSubmit} textSet={textSet} text={text} />
        <Comments comments={comments} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}
export async function getStaticProps(context) {
    const post = await getMdxNode("post", context)
   
    if (!post) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        post,
      }
    }
  }

