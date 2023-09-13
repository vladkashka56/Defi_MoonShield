import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Button from '../../../components/Button'
import useDisruptiveTransfer from '../../../hooks/useDisruptiveTransfer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenInput from './../../../components/TokenInput'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useMoonShieldFinance from '../../../hooks/useMoonShieldFinance'

const TransferClaim: React.FC = () => {
  const [currentBalance, setCurrencyBalance] = useState(0)
  const [sendAddress, setAddressVal] = useState('')
  const [val, setVal] = useState('')
  const { onDisruptiveTransfer } = useDisruptiveTransfer()
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const moonShieldFinance = useMoonShieldFinance()

  // ---------- CURRENT WALLET MSHLD HOLDINGS -------------  //
  const getCurrentMSHLDBalance = async () => {
    if (account) {
      const balance = await moonShieldFinance.getTokenBalance(
        'MoonShield',
        account,
      )
      setCurrencyBalance(balance.div(1e9).toNumber())
    }
  }

  getCurrentMSHLDBalance()
  const fullBalance =
    currentBalance === 0
      ? '0'
      : currentBalance.toLocaleString('en-US', {
          minimumFractionDigits: 3,
        })

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      let valu = e.currentTarget.value

      if (!Number(valu)) {
        if (valu == '') {
          setVal(e.currentTarget.value)
          return
        }
        return
      }
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleAddressChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAddressVal(e.currentTarget.value)
    },
    [setAddressVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <>
      <div
        className="container mb-5 container-fluid"
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
      >
        <StyledClaim className="row d-flex flex-wrap flex-column mt-5 m-0">
          <StyledContainer className="row d-flex flex-wrap flex-grow-1 flex-column mt-5 m-0">
            <div className="col p-3">
              <section className="features-blue m-0 p-0 border-dot dapp-block">
                <StyledTitle className="intro mb-0">
                  <p className="d-flex flex-grow-1 text-white">
                    Disruptive transfer between 2 wallets
                  </p>
                  <p className="d-flex flex-grow-1 text-white">
                    Balance: {currentBalance} $MSHLD
                  </p>
                </StyledTitle>
              </section>
            </div>
            <div className="col">
              <section className="features-blue m-0 p-3 border-dot dapp-block mb-3">
                <form className="m-0 p-0">
                  <div className="row">
                    <div className="col col-lg-12">
                      <div className="row w-100 d-flex flex-column flex-wrap flex-grow-1">
                        <div className="col text-start m-2">
                          <label className="form-label">
                            Recipient (address)
                          </label>
                          <input
                            className="form-control form-dark"
                            type="text"
                            onChange={handleAddressChange}
                          ></input>
                        </div>
                        <div className="col text-start m-2">
                          <label className="form-label">Amount ($MSHLD)</label>
                          <TokenInput
                            value={val}
                            onSelectMax={handleSelectMax}
                            onChange={handleChange}
                            max={currentBalance}
                            symbol="MSHLD"
                          />
                        </div>
                        <div className="row text-start m-2">
                          <div
                            className="btn col-md-3 col-sml-6"
                            style={{
                              textAlign: 'center',
                              color: '#fff',
                              width: '100%',
                            }}
                            data-bs-toggle="tooltip" /* onClick={onCollect} disabled={!BNBNum || mynextclaimdate.toNumber() > nowdate.toNumber()} */
                            data-bss-tooltip=""
                            title=" A transfer (between 2 wallets) that is more than 0.05% of the total supply will be charged for 2 BNB."
                          >
                            <Button
                              onClick={async () => {
                                setPendingTx(true)
                                await onDisruptiveTransfer(
                                  sendAddress,
                                  Number(val),
                                )
                                setPendingTx(false)
                              }}
                              disabled={
                                pendingTx ||
                                !val ||
                                val === '0' ||
                                sendAddress === ''
                              }
                            >
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="mr-1"
                                style={{ color: '#fff' }}
                              />
                              <div
                                style={{
                                  textAlign: 'center',
                                  color: '#fff',
                                  margin: '0px auto',
                                }}
                              >
                                Send
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </StyledContainer>
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

const StyledContainer = styled.div`
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.67) 0%,
    rgba(42, 45, 52, 0.49) 75%
  );
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid var(--moonshield);
  border-radius: 0 0 15px 15px;
`

const StyledTitle = styled.div`
  z-index: 3;
  float: left;
  position: relative;
  top: 10px;
`

export default TransferClaim
