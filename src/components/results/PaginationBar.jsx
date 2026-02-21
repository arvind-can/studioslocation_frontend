import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router'

/**
 * @param currentPageNo current page number (First page starting at 0)
 * @param totalPageNo last page number (First page starting at 0)
 * @returns {React.JSX.Element} a Pagination bar with previous next button and ellipsis handling for long pages
 */
export default function PaginationBar({ currentPageNo, totalPageNo }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams)
    params.set('pageNo', page)
    navigate(`/results?${params.toString()}`)
  }

  const delta = 2
  let start = Math.max(currentPageNo - delta, 0)
  let end = Math.min(currentPageNo + delta, totalPageNo - 1)

  const paginationItems = []

  //Première page + ellipsis début
  if (start > 0) {
    paginationItems.push(
      <PaginationItem key={0}>
        <PaginationLink isActive={currentPageNo === 0} onClick={() => changePage(0)}>
          1
        </PaginationLink>
      </PaginationItem>
    )

    if (start > 1) {
      paginationItems.push(
        <PaginationItem key='start-ellipsis'>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }
  }

  //Pages centrales
  for (let cpt = start; cpt <= end; cpt++) {
    paginationItems.push(
      <PaginationItem key={cpt}>
        <PaginationLink isActive={cpt === currentPageNo} onClick={() => changePage(cpt)}>
          {cpt + 1}
        </PaginationLink>
      </PaginationItem>
    )
  }

  //Dernière page + ellipsis fin
  if (end < totalPageNo - 1) {
    if (end < totalPageNo - 2) {
      paginationItems.push(
        <PaginationItem key='end-ellipsis'>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    paginationItems.push(
      <PaginationItem key={totalPageNo - 1}>
        <PaginationLink isActive={currentPageNo === totalPageNo - 1} onClick={() => changePage(totalPageNo - 1)}>
          {totalPageNo}
        </PaginationLink>
      </PaginationItem>
    )
  }

  return (
    <Pagination className={'mt-5'}>
      <PaginationContent>
        <PaginationItem>
          {currentPageNo > 0 && <PaginationPrevious onClick={() => changePage(currentPageNo - 1)} />}
        </PaginationItem>

        {paginationItems}

        <PaginationItem>
          {currentPageNo < totalPageNo - 1 && <PaginationNext onClick={() => changePage(currentPageNo + 1)} />}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
