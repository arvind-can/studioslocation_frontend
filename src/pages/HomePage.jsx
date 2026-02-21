import Menubar from '@/components/menubar/Menubar.jsx'
import SearchCard from '@/components/search/SearchCard.jsx'

export default function HomePage() {
  return (
    <>
      <Menubar />
      <div className={'m-12'}>
        <SearchCard />
      </div>
    </>
  )
}
