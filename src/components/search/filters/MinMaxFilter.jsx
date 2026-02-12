import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group.jsx'
import { useFormContext } from 'react-hook-form'

//As a part of a form, this component uses react hook form and its register/keys for data passing
export default function MinMaxFilter({
  name,
  symbol,
  registerKeys = { min: 'min' + name, max: 'max' + name },
  placeHolderMin = 'min',
  placeHolderMax = 'max',
  inputType = 'number'
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  //Function that render error message without duplication between min and max errors
  const ErrorMessage = () => {
    const error = errors[registerKeys.min] || errors[registerKeys.max]
    return !error ? null : <div className={'searchError'}>{error.message}</div>
  }

  return (
    <div className={'flex flex-col justify-between content-center gap-y-2'}>
      <p className={'text-sm pl-0.5'}>{name}</p>
      <div className={'flex flex-row justify-center content-center gap-x-2'}>
        {/*Filtre Prix Min*/}
        <InputGroup>
          <InputGroupAddon align={'inline-end'}>{symbol}</InputGroupAddon>
          <InputGroupInput type={inputType} placeholder={placeHolderMin} {...register(registerKeys.min)} />
        </InputGroup>
        <div> _ </div>

        {/*Filtre Prix Max*/}
        <InputGroup>
          <InputGroupAddon align={'inline-end'}>{symbol}</InputGroupAddon>
          <InputGroupInput type={inputType} placeholder={placeHolderMax} {...register(registerKeys.max)} />
        </InputGroup>
      </div>
      <ErrorMessage />
    </div>
  )
}
