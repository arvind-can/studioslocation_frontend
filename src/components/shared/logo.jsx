import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to='/' className={'flex-row justify-center content-center text-xl'}>
      <span className={'font-bold '}>Studios </span> Location
    </Link>
  )
}
