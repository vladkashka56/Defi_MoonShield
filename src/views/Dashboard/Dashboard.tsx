import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import WriteClaim from './components/WriteClaim'
import AccountButton from '../../components/TopBar/components/AccountButton'
import TopBar from '../../components/TopBar'
import Hero from '../../../src/components/Hero'
import DappInfo from '../../../src/components/DappInfoCard'

import TransferClaim from './components/TransferClaim'
import { useWeb3React } from '@web3-react/core'
import useMoonShieldFinance from '../../hooks/useMoonShieldFinance'
import { DashboardInfo } from '../../moonshield-finance/types'

const Home: React.FC = () => {
  const { account } = useWeb3React()
  const moonshieldFinance = useMoonShieldFinance()
  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo>({
    totalBNB: '0 BNB',
    totalBNBValue: 0,
    BNBPrice: 0,
    currentBalance: 0,
    maxtransvalue: '0',
    realvalue: '0',
    realtotalliquidity: '0 BNB',
  })

  useEffect(() => {
    const fetchDashInfo = async () => {
      try {
        setDashboardInfo(await moonshieldFinance.getDashBoardInfo(account))
      } catch (error) {
        console.log(error)
      }
    }
    if (account) {
      fetchDashInfo()
    }
  }, [account, moonshieldFinance])

  return (
    <div style={{ marginTop: '-1100px' }}>
      <Page>
        <Hero />
        {!account ? (
          <div className="container container-fluid w-full md:w-10/12 mx-auto p-4 shadow-2xl mt-10 rounded-xl divide-y-4 border-yellow-300 border border-solid">
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-yellow-600 text-center">
                Your wallet is not connected or you are not using Binance Smart
                Chain network
              </h1>
            </div>
            <div className="text-center mt-5">
              <h2 className="text-2xl text-white">
                To use the app, please make sure:
              </h2>
              <h2 className="text-2xl text-yellow-600 w-full sm:max-w-xl mx-auto"></h2>
              <div className="row align-items-center justify-content-center">
                <div className="text-xl col-md-6 col-sml-12 align-items-center justify-content-center">
                  <ol>
                    <li>
                      You have the{' '}
                      <b className="font-bold">Binance Smart Chain</b> network
                      selected in your wallet.
                    </li>
                    <li>
                      You may also need to connect your wallet in order to
                      continue
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <h2 className="text-2xl text-white">
                Please switch to BSC Network if you use:
              </h2>
              <div className="text-2xl text-green-400 w-full sm:max-w-xl mx-auto">
                <StyledAccountButton>
                  <AccountButton />
                </StyledAccountButton>
              </div>
            </div>
          </div>
        ) : (
          <>
            <DappInfo
              maxTransaction={dashboardInfo.maxtransvalue}
              totolLP={(
                (dashboardInfo.totalBNBValue * dashboardInfo.BNBPrice) /
                1000000000000000000
              ).toLocaleString('en-US', { maximumFractionDigits: 3 })}
              totalReward={dashboardInfo.realvalue}
              BNBinLp={
                parseFloat(dashboardInfo.totalBNB).toLocaleString('en-US', {
                  maximumFractionDigits: 10,
                }) + ' BNB'
              }
              BNBinRewardPool={dashboardInfo.realtotalliquidity}
              MSHLDBalance={dashboardInfo.currentBalance.toLocaleString(
                'en-US',
                {
                  maximumFractionDigits: 3,
                },
              )}
            />
            <StyledRowArea>
              <StyledArea>
                <WriteClaim />
                <TransferClaim />
              </StyledArea>
            </StyledRowArea>
          </>
        )}
        <TopBar />
      </Page>
    </div>
  )
}

const StyledRowArea = styled.div`
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`

const StyledArea = styled.div`
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 10px;
  margin-top: 30px;
`

const StyledAccountButton = styled.div`
  margin-top: 20px;
  align-items: center;
  width: auto;
  @media (max-width: 767px) {
    justify-content: center;
    width: auto;
  }
`

export default Home
