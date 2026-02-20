import { ItemGroup } from '@/components/ui/item.jsx'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ResultItem from '@/components/results/ResultItem.jsx'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'

import { useEffect } from 'react'
import PaginationBar from '@/components/results/PaginationBar.jsx'

export default function ResultsList() {
  let [searchParams] = useSearchParams()

  /**
   * Query Function definition - Get listings with filters from url parameters
   * @returns {Promise<*>} If query successful, return an object with data about listing results and pagination
   */
  const studiosResults = async () => {
    const searchParamsObject = Object.fromEntries(searchParams)
    const studiosRep = await axios.get('http://localhost:8080/listings', { params: searchParamsObject })

    //Build result object with relevant fields of found listings and pagination info
    const resultObject = {}
    resultObject.listings = studiosRep.data.results.map((studio) => ({
      id: studio.id,
      name: studio.title,
      rent: studio.rent,
      surface: studio.surface,
      image: 'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop'
    }))

    resultObject.pagination = {
      currentPage: studiosRep.data.pagination.page,
      totalPages: studiosRep.data.pagination.totalPages
    }
    return resultObject
  }

  //Send query on first page load
  const {
    data: studios,
    isError,
    error
  } = useQuery({
    queryKey: ['listings', searchParams.toString()],
    queryFn: studiosResults,
    retry: false
  })

  //Send the global toaster, the error signal
  useEffect(() => {
    if (isError) {
      const errorMessage =
        //Bonus : Send user validation message from the backend if he manipulated the params
        error.status === 400
          ? 'Erreur lors de la soumission du formulaire.\n Détails : ' + JSON.stringify(error.response.data)
          : error.message
      toast.error(errorMessage)
    }
  }, [isError, error])

  return (
    <>
      <ItemGroup className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {studios?.listings.map((item) => (
          <ResultItem key={item.id} {...item} />
        ))}
      </ItemGroup>
      {studios && (
        <PaginationBar currentPageNo={studios.pagination.currentPage} totalPageNo={studios.pagination.totalPages} />
      )}
    </>
  )
}
