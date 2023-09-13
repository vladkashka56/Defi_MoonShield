import React from 'react'
import styled from 'styled-components'

const Reflection: React.FC = () => {
  return (
    <>
      <SectionPanel className="bg-secondary feature-section carbon-bg-gray">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  data-aos="fade"
                  data-aos-duration="1250"
                  className="img-fluid feature-img"
                  src="assets/img/money-fly-7.svg"
                  alt=""
                ></img>
              </div>
            </div>
            <div
              className="col-lg-6 order-lg-1 feature-body carbon-bg-light"
              data-aos="slide-left"
              data-aos-duration="800"
            >
              <div className="p-5">
                <h2 className="display-4 tx-bg-fx tx-bg-no-fx border-dot">
                  Reflection
                </h2>
                <p className="tx-bg-fx">
                  2% of every buy/sell or transfer transaction is redistributed
                  to all $MSHLD holders. The burn address is also a holder, thus
                  each transaction helps to deflate the supply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionPanel>
    </>
  )
}

const SectionPanel = styled.div`
    border-bottom: 5px solid #fff;
    width: 100%;
  }
`

export default Reflection
