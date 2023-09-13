import React from 'react'
import styled from 'styled-components'

const EarnBNB: React.FC = () => {
  return (
    <>
      <SectionContainer className="feature-section bg-upholstery">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  data-aos="fade"
                  data-aos-duration="1250"
                  className="img-fluid feature-img"
                  src="assets/img/HOLD-1-1.svg"
                  alt=""
                ></img>
              </div>
            </div>
            <div
              className="col-lg-6 order-lg-1 feature-body carbon-bg-moonshield"
              data-aos="slide-left"
              data-aos-duration="900"
            >
              <div className="p-5">
                <h2 className="display-4 tx-bg-fx tx-bg-no-fx border-dot">
                  Earn $BNB just by holding $MSHLD
                </h2>
                <p className="tx-bg-fx">
                  4% of every buy, sell or transfer transaction is allocated to
                  our BNB pool. Once a week $MSHLD holders can claim a
                  percentage of it based on their percentage of the supply. If
                  you hold 1% of the supply and the reward pool is 100 BNB, you
                  would receive 1 BNB. As such, Moonshield can become a great
                  source of passive income!
                </p>
                <p className="tx-bg-fx">
                  Your BNB reward claim date will be 7 days after your initial
                  purchase and weekly thereafter.&nbsp; Users can claim their
                  BNB through theMoonshield DAPP. Our BNB reward mechanism
                  encourages holding instead of selling. This is a very unique
                  feature, differentiating Moonshield from other generic
                  cryptocurrency projects. With Moonshield you can generate
                  passive income without ever selling the asset itself!
                </p>
                <a
                  className="btn btn-primary btn-xl btn-border carbon-bg-gray"
                  role="button"
                  href="http://dapp.moonshield.finance"
                  style={{
                    padding: '15px',
                    margin: '5px',
                    textShadow: '3PX 3PX 0PX #000',
                  }}
                >
                  LAUNCH DAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

const SectionContainer = styled.div`
  width: 100%;
`
export default EarnBNB
