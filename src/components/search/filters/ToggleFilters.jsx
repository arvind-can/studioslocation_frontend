import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx'

//As a part of a form, this component uses react hook form & yup and its register function for data passing and validation
export default function CaracteristicsFilters({ name = 'Caractéristiques', caracteristics }) {
  return (
    <>
      <div className={'flex flex-col justify-between content-center gap-y-2'}>
        <p className={'text-sm pl-0.5'}>{name}</p>
        <ToggleGroup className={'flex flex-row flex-wrap'} type='multiple' spacing={2}>
          {caracteristics.map((item) => (
            <ToggleGroupItem value={item.name} variant={'outline'}>
              {item.logo} {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  )
}
