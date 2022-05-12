import Link from 'next/link'

export default function HeaderLink({ href, text }) {
  return (
    <Link href={href} passHref>
      <span className="w-20 flex items-center justify-end font-inter text-lg transition-all duration-75 text-black cursor-pointer hover:font-ibm-plex-sans hover:text-lg">
        {text}
      </span>
    </Link>
  )
}
