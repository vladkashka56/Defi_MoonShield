import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'

import useRefresh from './useRefresh'
import useMoonShieldFinance from './useMoonShieldFinance'

export const useSlotBalance = (userAddress: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setBalance(await moonShieldFinance.getSlotBalance(userAddress))
      } catch (error) {
        console.log(error)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, userAddress, moonShieldFinance, slowRefresh])
  return balance
}

export const useMoonBalance = (userAddress: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setBalance(await moonShieldFinance.getMoonBalance(userAddress))
      } catch (error) {
        console.log(error)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, userAddress, moonShieldFinance, slowRefresh])
  return balance
}

export const useNextClaimDate = (userAddress: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      setBalance(await moonShieldFinance.getNextClaimDate(userAddress))
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, moonShieldFinance, slowRefresh, userAddress])
  return balance
}

export const useTotalLiquidity = () => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await moonShieldFinance.getTotalLiquidty(
          '0xF565aaf0b8EB813a1c8C956D2C59F1ce27FD2366',
        )
        setBalance(BigNumber.from(res))
      } catch (err) {
        console.error(err)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, moonShieldFinance, slowRefresh])
  return balance
}

export const useLPTotalLiquidity = () => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await moonShieldFinance.getTotalLiquidty(
          '0x241059E222F675D9Ce4FbDc1505F6FD61Fb770Db',
        )
        setBalance(BigNumber.from(res))
      } catch (err) {
        console.error(err)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, moonShieldFinance, slowRefresh])
  return balance
}

export const useLPBnbamount = () => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await moonShieldFinance.getLpBnbBalance()
        setBalance(BigNumber.from(res))
      } catch (error) {
        console.log(error)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, moonShieldFinance, slowRefresh])

  return balance
}

export const useLPMshieldamount = () => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setBalance(await moonShieldFinance.getLpMshieldBalance())
      } catch (error) {
        console.log(error)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, moonShieldFinance, slowRefresh])
}

export const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const moonShieldFinance = useMoonShieldFinance()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    async function fetchTotalSupply() {
      try {
        setTotalSupply(await moonShieldFinance.getMoonShieldTotalSupply())
      } catch (error) {
        console.log(error)
      }
    }
    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useCalculatedBNBReward = () => {
  const [reward, setReward] = useState<BigNumber>(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const { slowRefresh } = useRefresh()
  const isUnlocked = moonShieldFinance?.isUnlocked
  useEffect(() => {
    async function fetchReward() {
      try {
        setReward(
          await moonShieldFinance.getBNBRewardAmount(
            moonShieldFinance.myAccount,
          ),
        )
      } catch (error) {
        console.log(error)
      }
    }
    if (isUnlocked) {
      fetchReward()
    }
  }, [slowRefresh, isUnlocked])

  return reward
}

export const useBurnedBalance = (tokenName: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const moonShieldFinance = useMoonShieldFinance()
  const isUnlocked = moonShieldFinance?.isUnlocked
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setBalance(
          await moonShieldFinance.getTokenBalance(
            tokenName,
            '0x000000000000000000000000000000000000dEaD',
          ),
        )
      } catch (error) {
        console.log(error)
      }
    }
    if (isUnlocked) {
      fetchBalance()
    }
  }, [isUnlocked, tokenName, slowRefresh])
  return balance
}

export default useSlotBalance
