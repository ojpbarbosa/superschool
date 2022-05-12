import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Main({ message }) {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-3/5 h-full flex items-center justify-center">
        <div className="w-3/5 h-full flex flex-col items-center justify-center">
          <h1 className="w-full font-inter text-5xl text-left text-black">
            {message}
          </h1>
          <div className="w-full h-24 flex items-center justify-center">
            <span className="w-full text-xl text-black font-inter">
              A SuperSchool&apos;s alumni, courses and pricing register.
            </span>
          </div>
        </div>
        <div className="w-2/5 h-full flex items-center justify-center">
          <Link href={'/alumni'} passHref>
            <div className="w-3/5 h-12 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-150 rounded-md font-ibm-plex-sans cursor-pointer text-xl">
              Get started
              <FontAwesomeIcon icon={faChevronRight} className="ml-4" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
