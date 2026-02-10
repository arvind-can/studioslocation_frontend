import ConnectButton from '@/components/menubar/buttons/ConnectButton.jsx'
import RegisterButton from '@/components/menubar/buttons/RegisterButton.jsx'
import { useState } from 'react'
import FavoritesButton from '@/components/menubar/buttons/FavoritesButton.jsx'
import AccountButton from '@/components/menubar/buttons/AccountButton.jsx'

export default function ActionButtons() {
  const [userConnected, setUserConnected] = useState(true)

  return (
    <div className={'flex justify-center content-center gap-x-2'}>
      {userConnected ? (
        <>
          <FavoritesButton /> <AccountButton />
        </>
      ) : (
        <>
          <ConnectButton />
          <RegisterButton />
        </>
      )}
    </div>
  )
}
