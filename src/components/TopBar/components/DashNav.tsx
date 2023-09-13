import React from 'react'
import AccountButton from '../../../components/TopBar/components/AccountButton'

const DashNav: React.FC = () => {
  return (
    <>
      <header className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark navbar-custom">
        <div
          className="container container-responsive"
          style={{ paddingLeft: '0px', paddingRight: '0px' }}
        >
          <AccountButton />
        </div>
      </header>
    </>
  )
}

export default DashNav
