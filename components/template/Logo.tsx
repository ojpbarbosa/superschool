import Link from 'next/link'

export default function Logo() {
  return (
    <Link href={'/'} passHref>
      <h2 className="font-ibm-plex-serif font-bold text-3xl text-black hover:cursor-pointer">
        SuperSchool
      </h2>
    </Link>
  )
}
