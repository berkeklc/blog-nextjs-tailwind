import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import { Auth0Provider } from "@auth0/auth0-react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={process.env.NEXT_PUBLIC_URL}
  >
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
    </Auth0Provider>
  )
}

export default MyApp
