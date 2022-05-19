import Header from '../components/template/Header'
import Main from '../components/template/Main'
import Footer from '../components/template/Footer'

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Header />
      <Main message={'Welcome!'} />
      <Footer />
    </div>
  )
}
