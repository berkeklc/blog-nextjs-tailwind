import Head from 'next/head'
import {format, parseISO, add} from 'date-fns'
import { blogPosts } from '../../lib/data';
const turkishLocale = require('date-fns/locale/tr');

export default function BlogPage({ title, date, content}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <div className="border-b-2 border-gray-200 pb-2 mb-4">
        <h2 className="text-3xl font-bold mb-2">
         {title}
        </h2>
        <div className="text-gray-600 text-xs">{format(parseISO(date), 'MMMM do, uuu', { locale: turkishLocale })}</div>
      </div>
        <div>{content}</div>
      </main>

    </div>
  );
}
export async function getStaticProps(context) {
    console.log('hi!', context);
    const { params } = context;
    return {
      props: blogPosts.find(item => item.slug === params.slug),
    };
  }

  export async function getStaticPaths() {
    return {
      paths: blogPosts.map((item) => ({
          params: {
              slug: item.slug,
          },
      })), 
      fallback:false,
    };
  }