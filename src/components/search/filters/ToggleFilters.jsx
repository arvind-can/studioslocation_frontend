import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx'
import { useController } from 'react-hook-form'

//As a part of a form, this component uses react hook form.
// This is a component controlled by useController.
export default function ToggleFilters({ name, registerKey, control, filters }) {
  const { field } = useController({ name: registerKey, control })

  return (
    <>
      <div className={'flex flex-col justify-between content-center gap-y-2'}>
        <p className={'text-sm pl-0.5'}>{name}</p>
        <ToggleGroup
          className={'flex flex-row flex-wrap'}
          type='multiple'
          spacing={2}
          value={field.value ?? []}
          onValueChange={field.onChange}
        >
          {filters.map((filter) => (
            <ToggleGroupItem key={filter.registerKey} value={filter.registerKey} variant={'outline'}>
              {filter.symbol} {filter.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  )
}
