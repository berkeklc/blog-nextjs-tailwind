import Head from 'next/head'
import Link from 'next/link'
import {format, parseISO, add} from 'date-fns'
import { blogPosts } from '../lib/data'
const turkishLocale = require('date-fns/locale/tr');
export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className="space-y-4">
        {blogPosts.map((item) => (
         <BlogListItem key={item.slug} {... item} />
        ))}
      </div>

    </div>
  );
}

function BlogListItem ({ slug, title, date, content}) {
  return (
    <div className="border border-blue-300 shadow hover:shadow-md hover:border-blue-800 rounded-md p-4 transition duration-300 ease-in-out">
    <div>
      <Link href={`/blog/${slug}`}>
        <a className="text-lg font-bold ">{title}</a>
      </Link>
    </div>
    <div className="text-gray-600 text-xs">{format(parseISO(date), 'MMMM do, uuu', { locale: turkishLocale })}</div>
    <div>{content}</div>
  </div>
  );
}