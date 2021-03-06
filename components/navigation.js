import Link from 'next/link'
import React, { useState} from 'react'
import {useTheme} from 'next-themes'
export default function Navigation() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
  
    React.useEffect(() => setMounted(true), [])
  return (
    <header>
    <Link href="/">
      <a>
       <h1 className="text-6xl font-bold text-center">Berke Kılıç</h1>
      </a>
      
    </Link>
      <nav className="my-4">
          <ul className="flex flex-row justify-center space-x-4 items-center">
            <li>
              <Link href="/about">
                <a>Hakkımda</a> 
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>Blog</a> 
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>Arşiv</a> 
              </Link>
            </li>
            <li>
            <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="focus:outline-none px-3 h-12 w-12 order-2 md:order-3 absolute left-2/4 transform -translate-x-2/4 md:relative "
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
            </li>
          </ul>
      </nav>
    </header>
  );
}
