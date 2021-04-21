import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto my-8 w-9/12 antialiased ">
   
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
      <footer className="text-center mt-4">
        <Link href="https://github.com/berkeklc/blog-nextjs-tailwind" >
          <a className="btn1" target="_blank">
           GitHub
          </a>
        </Link>
      </footer>
    </div>
  )
}

export default MyApp
