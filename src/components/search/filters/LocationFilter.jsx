import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group.jsx'
import { MapPin } from 'lucide-react'

//As a part of a form, this component uses react hook form & yup and its register function for data passing and validation
export default function LocationFilter({ registerKey, registerFn }) {
  return (
    <InputGroup>
      <InputGroupAddon align={'inline-start'}>
        <MapPin />
      </InputGroupAddon>
      <InputGroupInput placeholder={'Saisir le code postal ou la ville'} {...registerFn(registerKey)} />
    </InputGroup>
  )
}
