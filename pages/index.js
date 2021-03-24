import React, { useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {format, parseISO, add} from 'date-fns'
import { blogPosts } from '../lib/data'
import {useTheme} from 'next-themes'
const turkishLocale = require('date-fns/locale/tr');
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])
  return (
    <div>
      <Head>
        <title>Berke Kılıç</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-3 h-12 w-12 order-2 md:order-3 absolute left-2/4 transform -translate-x-2/4 md:relative md:left-0"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
            >
              {theme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
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