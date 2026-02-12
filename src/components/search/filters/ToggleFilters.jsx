import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx'
import { useController, useFormContext } from 'react-hook-form'

//As a part of a form, this component uses react hook form and its control/keys for data passing
//This is a component controlled by a Controller
export default function ToggleFilters({ name, registerKey, filters }) {
  const { control } = useFormContext()
  const { field } = useController({ name: registerKey, control: control, defaultValue: [] })

  return (
    <div className={'flex flex-col justify-between content-center gap-y-2'}>
      <p className={'text-sm pl-0.5'}>{name}</p>
      <ToggleGroup
        className={'flex flex-row flex-wrap'}
        type='multiple'
        spacing={2}
        value={field.value}
        onValueChange={field.onChange}
      >
        {filters.map((filter) => (
          <ToggleGroupItem key={filter.value} value={filter.value} variant={'outline'}>
            {filter.symbol} {filter.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
