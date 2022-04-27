import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="app-wrapper py-4 px-3">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
