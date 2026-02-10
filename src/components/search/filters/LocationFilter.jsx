import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group.jsx'
import { MapPin } from 'lucide-react'

export default function LocationFilter() {
  return (
    <InputGroup>
      <InputGroupAddon align={'inline-start'}>
        <MapPin />
      </InputGroupAddon>
      <InputGroupInput placeholder={'Saisir le code postal ou la ville'} />
    </InputGroup>
  )
}
