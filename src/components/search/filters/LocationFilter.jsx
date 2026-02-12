import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox.jsx'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

//As a part of a form, this component uses react hook form and its register/keys for data passing
//Display a combobox for user city selection by quereing Geo Api Gouv
export default function LocationFilter({ name, registerKey }) {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()
  const locationInput = watch(registerKey)

  //Query API
  const { data } = useQuery({
    queryKey: ['cities', locationInput],
    queryFn: () => fetchCities(locationInput),
    enabled: locationInput?.trim().length >= 1
  })

  const fetchCities = async (location) => {
    const url = `https://geo.api.gouv.fr/communes?nom=${location.trim()}&boost=population&limit=10&fields=nom,codesPostaux`
    const res = await axios.get(url)
    return res.data
  }

  //Format cities with city and postal code.
  //Note : Multiple postal code for the same city produce entry
  const formatedCities = () => {
    const results = []
    data?.forEach((cityEntry) => {
      results.push(...cityEntry.codesPostaux.map((codePostal) => `${cityEntry.nom} (${codePostal})`))
    })
    return results
  }

  //Dynamic list of cities based on user input
  return (
    <div className={'flex flex-col justify-between content-center gap-y-2'}>
      <p className={'text-sm pl-0.5'}>{name}</p>
      <Combobox items={formatedCities()}>
        <ComboboxInput placeholder={'Saisir le code postal ou la ville'} {...register(registerKey)}></ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>Aucune ville trouvée</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {errors[registerKey] && <div className={'searchError'}>{errors[registerKey].message}</div>}
    </div>
  )
}
