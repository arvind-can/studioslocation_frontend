import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item.jsx'
import { Pencil } from 'lucide-react'
import { useSearchParams } from 'react-router'

function capitalizeFirstLetter(val) {
  return String(val).trim().charAt(0).toUpperCase() + String(val).trim().slice(1)
}

export default function FiltersRecapCard() {
  let [searchParams] = useSearchParams()

  let resultString = ''

  const filtersToDisplay = []
  const city = searchParams.get('city')
  const postalCode = searchParams.get('postalCode')
  const minRent = searchParams.get('minRent')
  const maxRent = searchParams.get('maxRent')
  const minSurface = searchParams.get('minSurface')
  const maxSurface = searchParams.get('maxSurface')

  if (city) filtersToDisplay.push(capitalizeFirstLetter(city))
  if (postalCode) filtersToDisplay.push(`(${postalCode})`)
  if (minRent && maxRent) {
    filtersToDisplay.push(`${minRent} € - ${maxRent} €`)
  } else if (minRent) {
    filtersToDisplay.push(`${minRent} € min`)
  } else if (maxRent) {
    filtersToDisplay.push(`${maxRent} € max`)
  }
  if (minSurface && maxSurface) {
    filtersToDisplay.push(`${minSurface} m² - ${maxSurface} m²`)
  } else if (minSurface) {
    filtersToDisplay.push(`${minSurface} m² min`)
  } else if (maxSurface) {
    filtersToDisplay.push(`${maxSurface} m² max`)
  }

  for (let cpt = 0; cpt <= filtersToDisplay.length - 1; cpt++) {
    resultString += filtersToDisplay[cpt]
    if (cpt < filtersToDisplay.length - 1) resultString += ' · '
  }
  if (resultString.trim().length == 0) resultString = 'Aucun filtre appliqué'
  return (
    <Item className={'h-full max-w-sm w-full mx-auto p-2'} variant='outline' size='sm' asChild>
      <a href='#'>
        <ItemContent>
          <ItemTitle>{resultString}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Pencil className='size-4' />
        </ItemActions>
      </a>
    </Item>
  )
}
