import Head from 'next/head'
import {format, parseISO, add} from 'date-fns'
import Navigation from '../../components/navigation';
import { getMdxNode, getMdxPaths } from "next-mdx/server"
import { useHydrate } from "next-mdx/client"
import { mdxComponents } from "../../components/mdx-components"
const turkishLocale = require('date-fns/locale/tr');

export default function BlogPage({ post }) {
  const content = useHydrate(post, {
    components: mdxComponents,
  })
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

