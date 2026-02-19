import LocationFilter from '@/components/search/filters/LocationFilter.jsx'
import { Armchair, CookingPot, Euro, Toilet } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import MinMaxFilter from '@/components/search/filters/MinMaxFilter.jsx'
import ToggleFilters from '@/components/search/filters/ToggleFilters.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

export function SearchForm() {
  //Validation schema of the form data
  const searchSchema = yup.object().shape({
    location: yup.string().optional(),
    minRent: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif')
      .optional(),
    maxRent: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif')
      .when('minRent', {
        is: (rent) => rent !== undefined,
        then: (schema) => schema.min(yup.ref('minRent'), 'Le loyer maximal est inférieur au minimal')
      })
      .optional(),
    minSurface: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif')
      .optional(),
    maxSurface: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .positive('Saisissez un entier positif')
      .integer('Saisissez un entier positif')
      .when('minSurface', {
        is: (surface) => surface !== undefined,
        then: (schema) => schema.min(yup.ref('minSurface'), 'La surface maximale est inférieure à la minimale')
      })
      .optional()
  })

  //Form Provider, Form definition to handle Form data (FP helps passing useForm methods (register, watch...) in children)
  //Connect schema with the form for validation
  const methods = useForm({ resolver: yupResolver(searchSchema), mode: 'onBlur' })
  const { handleSubmit } = methods

  //Build search parameters based on form data
  const navigate = useNavigate()
  const onSubmitHandler = (data) => {
    const cleanedFormData = Object.assign(data)

    //Remove empty entries from the form
    Object.keys(cleanedFormData).forEach((key) => {
      if (cleanedFormData[key] === undefined || cleanedFormData[key].length === 0) delete cleanedFormData[key]
    })

    //Parse location into city and codePostal
    //Note : Last space and integer is postalCode, the rest is City
    if (cleanedFormData['location'] !== undefined) {
      const [_, city, postalCode] = cleanedFormData['location'].match(/^(.*)\s*\((\d+)\)$/)
      cleanedFormData['city'] = city.trim()
      cleanedFormData['postalCode'] = postalCode
      delete cleanedFormData['location']
    }

    //Navigate to the results url with its params
    const listingsSearchParams = new URLSearchParams(cleanedFormData)
    navigate(`/results?${listingsSearchParams.toString()}`)
  }

  const featureFilters = [
    {
      name: 'Meublé',
      value: 'hasFurniture',
      symbol: <Armchair />
    },
    {
      name: 'WC privé',
      value: 'hasAttachedToilet',
      symbol: <Toilet />
    },
    {
      name: 'Cuisine privée',
      value: 'hasAttachedKitchen',
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
