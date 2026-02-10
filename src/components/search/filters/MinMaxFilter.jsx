import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group.jsx'

export default function MinMaxFilter({
  name,
  symbol,
  placeHolderMin = 'min',
  placeHolderMax = 'max',
  inputType = 'number'
}) {
  return (
    <div className={'mt-5 flex flex-col justify-between content-center gap-y-2'}>
      <p className={'text-sm pl-1'}>{name}</p>
      <div className={'flex flex-row justify-center content-center gap-x-2'}>
        {/*Filtre Prix Min*/}
        <InputGroup>
          <InputGroupAddon align={'inline-end'}>{symbol}</InputGroupAddon>
          <InputGroupInput type={inputType} placeholder={placeHolderMin} />
        </InputGroup>
        <div> _ </div>

        {/*Filtre Prix Max*/}
        <InputGroup>
          <InputGroupAddon align={'inline-end'}>{symbol}</InputGroupAddon>
          <InputGroupInput type={inputType} placeholder={placeHolderMax} />
        </InputGroup>
      </div>
    </div>
  )
}
