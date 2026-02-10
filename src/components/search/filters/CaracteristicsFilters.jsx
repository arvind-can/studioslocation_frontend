import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx'

export default function CaracteristicsFilters({ title = 'Caractéristiques', caracteristics }) {
  return (
    <>
      <div className={'mt-5 flex flex-col justify-between content-center gap-y-2'}>
        <p className={'text-sm pl-1'}>{title}</p>
        <ToggleGroup className={'flex flex-row flex-wrap'} type='multiple' spacing={2}>
          {caracteristics.map((item) => (
            <ToggleGroupItem value={item.value} variant={'outline'}>
              {item.logo} {item.value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  )
}
