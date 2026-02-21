import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox.jsx'
import { useController, useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'
import axios from 'axios'

//As a part of a form, this component uses react hook form and its register/keys for data passing
//Display a combobox for user city selection by quereing Geo Api Gouv
export default function LocationFilter({ name, registerKey }) {
  const {
    register,
    watch,
    control,
    formState: { errors }
  } = useFormContext()
  const { field } = useController({ name: registerKey, control: control })
  const [locationInput] = useDebounce(watch(registerKey), 200)

  const fetchCities = async (location) => {
    const searchByCityUrl = `https://geo.api.gouv.fr/communes?nom=${location.trim()}&boost=population&limit=10&fields=nom,codesPostaux`
    const searchByPostalCodeUrl = `https://geo.api.gouv.fr/communes?codePostal=${location.trim()}&boost=population&limit=10&fields=nom,codesPostaux`
    const searchByDepartementUrl = `https://geo.api.gouv.fr/departements/${location.trim()}/communes`

    //Select search url based on user input (string, 2 digit integer (for departements), other integer (for city)
    let searchUrl = ''
    if (isNaN(location)) {
      searchUrl = searchByCityUrl
    } else {
      searchUrl = location.trim().length === 2 ? searchByDepartementUrl : searchByPostalCodeUrl
    }

    const res = await axios.get(searchUrl)
    return res.data
  }

  //Query API
  const { data } = useQuery({
    queryKey: ['cities', locationInput],
    queryFn: () => fetchCities(locationInput),
    enabled: locationInput?.trim().length >= 1
  })

  //Format cities with city and postal code.
  //Note : Multiple postal code for the same city produce entry
  const formatedCities = () => {
    const results = []
    data?.forEach((cityEntry) => {
      if (cityEntry.codesPostaux.length > 1) results.push(`${cityEntry.nom} (toute la ville)`)
      results.push(...cityEntry.codesPostaux.map((codePostal) => `${cityEntry.nom} (${codePostal})`))
    })
    return results
  }

  //Dynamic list of cities based on user input
  return (
    <div className={'flex flex-col justify-between content-center gap-y-2'}>
      <p className={'text-sm pl-0.5'}>{name}</p>
      <Combobox value={field.value} onValueChange={field.onChange} items={formatedCities()} filter={null}>
        <ComboboxInput
          placeholder={'Saisir le code postal ou la ville'}
          value={field?.value}
          onChange={field?.onChange}
        />
        <ComboboxContent>
          <ComboboxEmpty>Aucune ville trouvée</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item} keywords={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {errors[registerKey] && <div className={'searchError'}>Erreur lors du chargement des villes</div>}
    </div>
  )
}
