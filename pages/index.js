
import Head from 'next/head'
import Link from 'next/link'
import {format, parseISO, add} from 'date-fns'
import { getAllNodes } from "next-mdx/server"
import Navigation from '../components/navigation'
const turkishLocale = require('date-fns/locale/tr');
export default function Home({ posts }) {
 
  return (
    <div>
      <Head>
        <title>Berke Kılıç</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navigation />
     
      <div className="space-y-4">
      {posts.map(post=>{
            return <article key={post.url}>
                <h2 className="text-xl font-bold">
                  <Link href={post.url}>
                    <a>{post.frontMatter.title}</a>
                  </Link>
                </h2>
                <p>
                  {post.frontMatter.excerpt}
                </p>
                <div className="text-gray-400">
                <span className="text-gray-600 text-xs">{format(parseISO(post.frontMatter.date), 'MMMM do, uuu', { locale: turkishLocale })}</span>
                </div>
            </article>
        })}
      </div>

    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}