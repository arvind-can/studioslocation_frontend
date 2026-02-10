import Menubar from '@/components/menubar/Menubar.jsx'
import HomeSearchCard from '@/components/search/HomeSearchCard.jsx'

export default function HomePage() {
  return (
    <>
      <Menubar />
      <div className={'m-12'}>
        <HomeSearchCard />
      </div>
    </>
  )
}
