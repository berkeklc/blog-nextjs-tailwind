import { getAllNodes } from "next-mdx/server"
import Head from 'next/head'
import {format, parseISO, add} from 'date-fns'
import Navigation from '../../components/navigation';
import Link from 'next/link'
const turkishLocale = require('date-fns/locale/tr');
 function Blog({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main>
        <h1>
        Blog 
        </h1>
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
      </main>

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

  export default Blog