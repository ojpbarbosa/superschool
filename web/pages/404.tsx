import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function FourOFour() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="w-3/5 h-full flex items-center justify-center">
        <div className="w-3/5 h-full flex flex-col items-center justify-center">
          <div>
            <h1 className="w-full font-inter text-5xl text-left text-black">
              Oops!
            </h1>
            <div className="w-full h-24 flex items-center justify-center">
              <span className="w-full text-xl text-black font-inter">
                404. Are you lost?
              </span>
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full flex items-center justify-center">
          <Link href={'/'} passHref>
            <div className="w-3/5 h-12 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-150 rounded-md font-ibm-plex-sans cursor-pointer text-xl">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-4" />
              Go home
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
