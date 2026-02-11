import LocationFilter from '@/components/search/filters/LocationFilter.jsx'
import { Armchair, CookingPot, Euro, Toilet } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useForm } from 'react-hook-form'
import MinMaxFilter from '@/components/search/filters/MinMaxFilter.jsx'
import ToggleFilters from '@/components/search/filters/ToggleFilters.jsx'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function SearchForm() {
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(searchSchema),
    mode: 'onBlur'
  })

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

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-y-5'>
      <div>
        <LocationFilter registerKey='location' registerFn={register} />
        {errors.location && <div className={'searchError'}> {errors.location.message}</div>}
      </div>
      <div>
        <MinMaxFilter
          name='Loyer'
          symbol={<Euro />}
          registerKey='rent'
          registerFn={register}
          registerKeys={{ min: 'minRent', max: 'maxRent' }}
        />
        {errors.minRent ? (
          <div className={'searchError'}>{errors.minRent.message}</div>
        ) : (
          errors.maxRent && <div className={'searchError'}>{errors.maxRent.message}</div>
        )}
      </div>
      <div>
        <MinMaxFilter
          name='Surface Habitable'
          symbol={<span>m²</span>}
          registerFn={register}
          registerKeys={{ min: 'minSurface', max: 'maxSurface' }}
        />
        {errors.minSurface ? (
          <div>{errors.minSurface.message}</div>
        ) : (
          errors.maxSurface && <div>{errors.maxSurface.message}</div>
        )}
      </div>

      <ToggleFilters name='Caractéristiques' registerKey='features' registerFn={control} filters={featureFilters} />

      <Button type='submit' className='w-full'>
        Rechercher
      </Button>
    </form>
  )
}
