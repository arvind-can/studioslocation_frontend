import LocationFilter from '@/components/search/filters/LocationFilter.jsx'
import MinMaxFilter from '@/components/search/filters/MinMaxFilter.jsx'
import { Armchair, CookingPot, Euro, Toilet } from 'lucide-react'
import CaracteristicsFilters from '@/components/search/filters/CaracteristicsFilters.jsx'

export default function SearchForm() {
  const caracteristics = [
    {
      value: 'Meublé',
      logo: <Armchair />
    },
    {
      value: 'WC privé',
      logo: <Toilet />
    },
    {
      value: 'Cuisine privée',
      logo: <CookingPot />
    }
  ]
  return (
    <>
      <LocationFilter />
      <MinMaxFilter name={'Loyer'} symbol={<Euro />} />
      <MinMaxFilter name={'Surface Habitable'} symbol={<span>m²</span>} />
      <CaracteristicsFilters caracteristics={caracteristics} />
    </>
  )
}
