import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item.jsx'

export default function ResultItem({ name, rent, surface, city, postalCode, image }) {
  return (
    <Item variant={'outline'}>
      <ItemHeader>
        <img src={image} alt={name} className='w-full aspect-square rounded-sm object-cover' />
      </ItemHeader>
      <ItemContent className={'w-full gap-0'}>
        <ItemTitle className={'w-full'}>
          <span className={'truncate text-black font-semibold'}>{name}</span>
        </ItemTitle>
        <ItemDescription className={'mt-0'}>
          <span className={'text-black font-medium'}>
            {rent} € · {surface} m²
          </span>
          <br />
          <span className={'font-light'}>
            {city} ({postalCode})
          </span>
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
