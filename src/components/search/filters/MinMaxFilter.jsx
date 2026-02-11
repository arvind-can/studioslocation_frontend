import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group.jsx'

//As a part of a form, this component uses react hook form & yup and its register function for data passing and validation
export default function MinMaxFilter({
  name,
  symbol,
  registerKeys = { min: 'min' + name, max: 'max' + name },
  registerFn,
  placeHolderMin = 'min',
  placeHolderMax = 'max',
  inputType = 'number'
}) {
  return (
    <div className={'flex flex-col justify-between content-center gap-y-2'}>
      <p className={'text-sm pl-0.5'}>{name}</p>
      <div className={'flex flex-row justify-center content-center gap-x-2'}>
        {/*Filtre Prix Min*/}
        <InputGroup>
          <InputGroupAddon align={'inline-end'}>{symbol}</InputGroupAddon>
          <InputGroupInput type={inputType} placeholder={placeHolderMin} {...registerFn(registerKeys.min)} />
        </InputGroup>
        <div> _ </div>

        {/*Filtre Prix Max*/}
        <InputGroup>
          <InputGroupAddon align={'inline-end'}>{symbol}</InputGroupAddon>
          <InputGroupInput type={inputType} placeholder={placeHolderMax} {...registerFn(registerKeys.max)} />
        </InputGroup>
      </div>
    </div>
  )
}
