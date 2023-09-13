import React, { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import {
  useNextClaimDate,
  useCalculatedBNBReward,
} from '../../../hooks/useSlotBalance'
import useClaimBNBReward from '../../../hooks/useClaimBNBReward'
import { useGetTime } from '../../../hooks/useGetTime'
import { toLocaleString } from '../../../utils/translateTextHelpers'
import CollectButton from '../../../components/CollectButton'

const WriteClaim: React.FC = () => {
  const [calculatedReward, setCalculatedReward] = useState(0)
  const [nextclaimdateLocale, setNextclaimdateLocale] = useState('')
  const [mynextclaimdate, setMynextclaimdate] = useState(BigNumber.from(0))
  const [nowdate, setNowdate] = useState(BigNumber.from(0))
  const { account } = useWeb3React()
  const { onClaimBNBReward } = useClaimBNBReward()
  const reward = useCalculatedBNBReward()
  const now = useGetTime()
  const claimDate = useNextClaimDate(account)

  const handleClaimClick = () => {
    onClaimBNBReward()
  }

  useEffect(() => {
    try {
      const realReward = reward.div(BigNumber.from(1e9))
      setCalculatedReward(realReward.toNumber() / 1e9)
      setMynextclaimdate(claimDate)
      setNowdate(now)
      const dateLocale =
        mynextclaimdate.toNumber() === 0
          ? 'Not available'
          : toLocaleString(new Date(mynextclaimdate.toNumber() * 1000))
      setNextclaimdateLocale(dateLocale)
    } catch (error) {
      console.log('WriteClaim', error)
    }
  }, [mynextclaimdate, now, claimDate, account, reward])

  return (
    <>
      <div
        className="container mb-5 container-fluid"
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
      >
        <StyledClaim className="row d-flex flex-wrap flex-column mt-5 m-0">
          <div className="col p-3">
            <section className="features-blue m-0 p-0 border-dot dapp-block">
              <StyledCollection className="intro mb-0">
                <p className="d-flex flex-grow-1 text-white">
                  My collectible BNB: {calculatedReward} BNB
                </p>
                <p className="d-flex flex-grow-1">
                  <a
                    href="https://docs.moonshield.finance/innovation/a-new-way-to-earn-bnb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    *pool is always changing based on buys, sells, and collects
                    by others, learn more here
                  </a>
                </p>
              </StyledCollection>
            </section>
          </div>
          <div className="col">
            <section className="features-blue m-0 border-dot dapp-block mb-3 px-0 ps-0 p-5">
              <h1 className="text-center">
                You can collect your BNB at: {nextclaimdateLocale}
              </h1>
              <div className="row features p-1 m-sm-15">
                <div className="col col-12 justify-content-center align-items-center d-flex flex-column flex-wrap">
                  <CollectButton
                    style={{ color: '#fff' }}
                    onClick={handleClaimClick}
                    disabled={
                      !calculatedReward ||
                      mynextclaimdate.toNumber() > nowdate.toNumber()
                    }
                  >
                    Collect my BNB
                  </CollectButton>
                </div>
              </div>
            </section>
          </div>
        </StyledClaim>
      </div>
    </>
  )
}

const StyledClaim = styled.div`
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.67) 0%,
    rgba(42, 45, 52, 0.49) 75%
  );
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid var(--moonshield);
  border-radius: 0 0 15px 15px;
`

const StyledCollection = styled.div`
  z-index: 3;
  float: left;
  position: relative;
  top: 10px;
`

export default WriteClaim
