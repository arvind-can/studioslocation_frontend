import { ItemGroup } from '@/components/ui/item.jsx'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ResultItem from '@/components/results/ResultItem.jsx'
import { useSearchParams } from 'react-router'

export default function ResultsList() {
  let [searchParams] = useSearchParams()

  const studiosResults = async () => {
    const searchParamsObject = Object.fromEntries(searchParams)
    const studiosRep = await axios.get('http://localhost:8080/listings', { param: searchParamsObject })
    return studiosRep.data.map((studio) => ({
      id: studio.id,
      name: studio.title,
      price: studio.price,
      surface: studio.surface,
      image: 'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop'
    }))
  }

  const { data: studios } = useQuery({
    queryKey: ['listings'],
    queryFn: studiosResults
  })

  return (
    <ItemGroup className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {studios?.map((item) => (
        <ResultItem key={item.id} {...item} />
      ))}
    </ItemGroup>
  )
}
