import LocationFilter from '@/components/search/filters/LocationFilter.jsx'
import { Armchair, CookingPot, Euro, Toilet } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import MinMaxFilter from '@/components/search/filters/MinMaxFilter.jsx'
import ToggleFilters from '@/components/search/filters/ToggleFilters.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function SearchForm() {
  //Validation schema of the form data
  const searchSchema = yup.object().shape({
    location: yup.string(),
    minRent: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif'),
    maxRent: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif')
      .min(yup.ref('minRent'), 'Le loyer maximal est inférieur au minimal'),
    minSurface: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif'),
    maxSurface: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif')
      .min(yup.ref('minSurface'), 'La surface maximale est inférieur à la minimale')
  })

  //Form Provider, Form definition to handle Form data (FP helps passing useForm methods (register, watch...) in children)
  //Connect schema with the form for validation
  const methods = useForm({ resolver: yupResolver(searchSchema), mode: 'onBlur' })
  const { handleSubmit } = methods

  const onSubmitHandler = (data) => {
    console.log(data)
  }

  const featureFilters = [
    {
      name: 'Meublé',
      value: 'furniture',
      symbol: <Armchair />
    },
    {
      name: 'WC privé',
      value: 'attachedToilet',
      symbol: <Toilet />
    },
    {
      name: 'Cuisine privée',
      value: 'attachedKitchen',
      symbol: <CookingPot />
    }
  ]

  //Return a Formprovider with a Form containing multiple filters and their error messages
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-y-5'>
        <LocationFilter name='Localisation' registerKey='location' />
        <MinMaxFilter name='Loyer' symbol={<Euro />} registerKeys={{ min: 'minRent', max: 'maxRent' }} />
        <MinMaxFilter
          name='Surface Habitable'
          symbol={<span>m²</span>}
          registerKeys={{ min: 'minSurface', max: 'maxSurface' }}
        />
        <ToggleFilters name='Caractéristiques' registerKey='features' filters={featureFilters} />
        <Button type='submit' className='w-full'>
          Rechercher
        </Button>
      </form>
    </FormProvider>
  )
}
