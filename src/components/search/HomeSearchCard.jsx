import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import SearchQuestion from '@/components/search/SearchQuestion.jsx'
import { SearchForm } from '@/components/search/SearchForm.jsx'

export default function HomeSearchCard() {
  return (
    <Card className={'lg:w-1/2 md:2/3 sm:w-3/4'}>
      <CardHeader>
        <SearchQuestion />
      </CardHeader>
      <CardContent>
        <SearchForm />
      </CardContent>
    </Card>
  )
}
