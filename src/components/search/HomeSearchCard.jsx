import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.jsx'
import SearchQuestion from '@/components/search/SearchQuestion.jsx'
import SearchForm from '@/components/search/SearchForm.jsx'
import { Button } from '@/components/ui/button.jsx'

export default function HomeSearchCard() {
  return (
    <Card className={'lg:w-1/2 sm:w-3/4'}>
      <CardHeader>
        <SearchQuestion />
      </CardHeader>
      <CardContent>
        <SearchForm />
      </CardContent>
      <CardFooter>
        <Button type='submit' className='w-full'>
          Rechercher
        </Button>
      </CardFooter>
    </Card>
  )
}
