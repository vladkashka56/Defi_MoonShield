import { useCallback } from 'react'
import useMoonShieldFinance from './useMoonShieldFinance'

const useDisruptiveTransfer = () => {
  const moonShieldFinance = useMoonShieldFinance()

  const handleDisruptiveTransfer = useCallback(
    async (recepientAddress: string, tokenAmount: number) => {
      try {
        await moonShieldFinance.disruptiveTransfer(
          recepientAddress,
          tokenAmount,
        )
      } catch (error) {
        console.log('useDisruptiveTransfer:', error)
      }
    },
    [moonShieldFinance],
  )
  return { onDisruptiveTransfer: handleDisruptiveTransfer }
}

export default useDisruptiveTransfer
