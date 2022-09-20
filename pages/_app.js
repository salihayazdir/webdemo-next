import '../styles/globals.css'
import { NavProvider } from '../lib/NavContext'
import Layout from '../components/layout/Layout'

function MyApp({ Component, pageProps }) {
  
  return (
  <NavProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </NavProvider>
  )
}

export default MyApp
