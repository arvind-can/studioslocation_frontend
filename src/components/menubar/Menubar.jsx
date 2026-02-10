import Logo from '@/components/shared/logo.jsx'
import ActionButtons from '@/components/menubar/ActionButtons.jsx'

export default function Menubar() {
  return (
    <header>
      <div className={'flex justify-between content-center p-5 border-b-2 sm:px-6 lg:px-8'}>
        <Logo />
        <ActionButtons />
      </div>
    </header>
  )
}
