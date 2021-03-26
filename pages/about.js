import Head from 'next/head'
import Navigation from '../components/navigation';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main>
        <h1>
         About
        </h1>
      </main>

    </div>
  );
}
