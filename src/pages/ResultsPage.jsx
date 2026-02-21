import ResultsList from '@/components/results/ResultsList.jsx'
import Menubar from '@/components/menubar/Menubar.jsx'
import { Separator } from '@/components/ui/separator.jsx'

export default function ResultsPage() {
  return (
    <>
      <Menubar withFilters={true} />
      <div className='max-w-5xl mx-auto px-4 py-6'>
        <span className='text-2xl font-bold'>Logements trouvés</span>
        <Separator className={'mt-3 mb-5'} />
        <ResultsList />
      </div>
    </>
  )
}
