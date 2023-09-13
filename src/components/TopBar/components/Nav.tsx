import React, { /*useEffect,*/ useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import accountImg from '../../../assets/img/logoletras.svg'
import AccountButton from '../../../components/TopBar/components/AccountButton'

const Nav: React.FC = () => {
  const [blnShowConnect, setConnectBool] = useState('')
  const [blnShowNav, setShowNav] = useState('')

  const setConnectbutton = async () => {
    if (blnShowConnect.length < 1) {
      if (window.location.pathname.indexOf('dashboard') > 0) {
        setConnectBool('flex')
      } else {
        setConnectBool('none')
      }
    }
  }

  const setNavlinks = async () => {
    if (blnShowNav.length < 1) {
      if (window.location.pathname.indexOf('dashboard') > 0) {
        setShowNav('none')
      } else {
        setShowNav('flex')
      }
    }
  }

  setConnectbutton()
  setNavlinks()

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark navbar-custom">
        <div
          className="container container-responsive"
          style={{ paddingLeft: '0px', paddingRight: '0px' }}
        >
          <div className="col" style={{ textAlign: 'left' }}>
            {/* <StyledLink target="_blank" href="https://moonshield.finance"> */}
            <StyledLogo to="/">
              <img
                src={accountImg}
                alt="logo"
                style={{ marginTop: 0, width: 250, marginLeft: 0 }}
                className="d-none d-md-inline"
                loading="lazy"
              />
              <img
                className="d-sm-inline d-md-none"
                src="assets/img/MoonShield%20Logo.png"
                loading="lazy"
                style={{ width: '45px' }}
              ></img>
            </StyledLogo>
            {/* </StyledLink> */}
          </div>
          <div style={{ display: '' + blnShowNav + '' }}>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#features">
                    FEATURES
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#tokenomics">
                    TOKENOMICS
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#buy">
                    HOW TO BUY
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#team">
                    TEAM
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    LAUNCH DAPP
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ display: '' + blnShowConnect + '' }}>
            <AccountButton />
          </div>
        </div>
      </nav>
    </>
  )
}

const StyledLogo = styled(NavLink)`
  align-items: start;
  display: flex;
  justify-content: left;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

export default Nav
