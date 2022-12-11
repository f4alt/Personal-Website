import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {

  return (
    <Layout className="fill-screen">
      <Component {...pageProps}/>
    </Layout>
  );
}

export default MyApp
