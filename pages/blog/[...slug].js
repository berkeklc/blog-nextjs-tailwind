import Head from 'next/head'
import {format, parseISO, add} from 'date-fns'
import Navigation from '../../components/navigation';
import { getMdxNode, getMdxPaths } from "next-mdx/server"
import { useHydrate } from "next-mdx/client"
import { mdxComponents } from "../../components/mdx-components"
import { useAuth0 } from "@auth0/auth0-react";
const turkishLocale = require('date-fns/locale/tr');

export default function BlogPage({ post }) {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
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

      <div className="mx-auto prose  lg:prose-xl">
        <form  className="mt-10">
        <textarea rows="2" className="border w-full block px-2 py-1" />
        <div className="">
        {isAuthenticated ? 
            (
            <div>
             <div className=" flex items-center space-x-2">
               <button className="btn1">Gönder</button>
                <img src={user.picture} width={30} className="rounded-full" />
                <span>{user.name}</span>
                <button typeof="button" className="btn1" onClick={() => logout({returnTo: process.env.NEXT_PUBLIC_URL + '/blog'})}>Çıkış Yap</button> 
              </div>
            </div>
            )
            :
            (<button typeof="button" className="btn1" onClick={() => loginWithRedirect()}>Giriş Yap</button> )}
        </div>
       </form>
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

