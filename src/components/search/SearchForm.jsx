import LocationFilter from '@/components/search/filters/LocationFilter.jsx'
import { Armchair, CookingPot, Euro, Toilet } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useForm } from 'react-hook-form'
import MinMaxFilter from '@/components/search/filters/MinMaxFilter.jsx'
import ToggleFilters from '@/components/search/filters/ToggleFilters.jsx'

export default function SearchForm() {
  const featureFilters = [
    {
      name: 'Meublé',
      registerKey: 'furniture',
      symbol: <Armchair />
    },
    {
      name: 'WC privé',
      registerKey: 'attachedToilet',
      symbol: <Toilet />
    },
    {
      name: 'Cuisine privée',
      registerKey: 'attachedKitchen',
      symbol: <CookingPot />
    }
  ]

  const { register, control, handleSubmit } = useForm()

  const onSubmitHandler = (data) => {
    console.log(data)
    console.log('lol')
  }
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-y-5'>
      <LocationFilter registerFn={register} />
      <MinMaxFilter name='Loyer' symbol={<Euro />} registerFn={register} />
      <MinMaxFilter
        name='Surface Habitable'
        symbol={<span>m²</span>}
        registerFn={register}
        registerKeys={{ min: 'minSurface', max: 'maxSurface' }}
      />
      <ToggleFilters name='Caractéristiques' registerKey='features' control={control} filters={featureFilters} />
      <Button type='submit' className='w-full'>
        Rechercher
      </Button>
    </form>
  )
}
