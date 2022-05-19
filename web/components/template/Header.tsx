import HeaderLink from '../HeaderLink'
import Logo from './Logo'

export default function Header() {
  return (
    <div className="w-full h-16 flex items-center justify-center">
      <div className="w-3/5 h-full flex items-center justify-between">
        <Logo />
        <div className="w-72 h-full flex items-center justify-between">
          <HeaderLink href={'/alumni'} text={'Alumni'} />
          <HeaderLink href={'/courses'} text={'Courses'} />
          <HeaderLink href={'/pricing'} text={'Pricing'} />
        </div>
      </div>
    </div>
  )
}
