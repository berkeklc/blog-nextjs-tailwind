import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto my-8 w-9/12 ">
    <header>
    <Link href="/">
      <a>
       <h1 className="text-6xl font-bold text-center">Berke Kılıç</h1>
      </a>
      
    </Link>
      <nav className="my-4">
          <ul className="flex flex-row justify-center space-x-4">
            <li>
              <Link href="/">
                <a>Home</a> 
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a> 
              </Link>
            </li>
            <li>
           
            </li>
          </ul>
      </nav>
    </header>
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
      <footer className="text-center mt-4">
        <Link href="https://github.com/berkeklc/blog-nextjs-tailwind" >
          <a target="_blank">
           GitHub
          </a>
        </Link>
      </footer>
    </div>
  )
}

export default MyApp
