import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item.jsx'

export default function ResultItem({ name, price, surface, image }) {
  return (
    <Item variant={'outline'}>
      <ItemHeader>
        <img src={image} alt={name} className='w-full aspect-square rounded-sm object-cover' />
      </ItemHeader>
      <ItemContent className={'w-full'}>
        <ItemTitle className={'w-full'}>
          <span className={'truncate'}>{name}</span>
        </ItemTitle>
        <ItemDescription>
          {price} {surface}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
