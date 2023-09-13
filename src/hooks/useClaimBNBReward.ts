import { useCallback } from 'react'
import useMoonShieldFinance from './useMoonShieldFinance'

const useClaimBNBReward = () => {
  const moonShieldFinance = useMoonShieldFinance()

  const handleClaimBNBReward = useCallback(async () => {
    try {
      await moonShieldFinance.claimBNBReward()
    } catch (error) {
      console.log('useClaimBNBReward:', error)
    }
  }, [moonShieldFinance])
  return { onClaimBNBReward: handleClaimBNBReward }
}

export default useClaimBNBReward
