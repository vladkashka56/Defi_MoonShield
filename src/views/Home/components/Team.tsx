import React from 'react'
import styled from 'styled-components'

const Team: React.FC = () => {
  return (
    <>
      <section
        id="team"
        className="team-clean feature-section pb-0"
        style={{ width: '100%' }}
      >
        <TeamContainer className="container">
          <div className="intro">
            <h2 className="text-center">Team </h2>
            <p className="text-center">Meet the $MSHLD squad</p>
          </div>
          <div className="row people d-flex flex-wrap flex-row justify-content-evenly align-items-center flex-grow-1">
            <div
              className="col-md-6 col-lg-4 item d-flex flex-wrap flex-column justify-content-center align-items-center"
              data-aos="fade"
              data-aos-duration="1350"
            >
              <h3 className="name">Clayton</h3>
              <p className="title" style={{ color: 'var(--bs-yellow)' }}>
                MEDIA RELATIONS MANAGER
              </p>
              <p className="description">
                I am the Media Relations Manager. I reach out to form
                partnerships to expand the visibility of Moonshield.
                <br />
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 item d-flex flex-wrap flex-column justify-content-center align-items-center"
              data-aos="fade"
              data-aos-duration="1350"
            >
              <h3 className="name">Jason (Hold4Life)</h3>
              <p className="title" style={{ color: 'var(--bs-yellow)' }}>
                COMMUNITY MANAGER
              </p>
              <p className="description">
                I am the community manager and the connective tissue behind the
                scenes at MoonShield. I have a ton of experience in the crypto
                space.
                <br />
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 item d-flex flex-wrap flex-column justify-content-center align-items-center"
              data-aos="fade"
              data-aos-duration="1350"
            >
              <h3 className="name">Burnie420</h3>
              <p className="title" style={{ color: 'var(--bs-yellow)' }}>
                SOCIAL MEDIA MANAGER
              </p>
              <p className="description">
                I am the social media manager. I oversee all social media
                platforms for Moonshield.
                <br />
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 item d-flex flex-wrap flex-column justify-content-center align-items-center"
              data-aos="fade"
              data-aos-duration="1300"
            >
              <h3 className="name">Butler</h3>
              <p className="title" style={{ color: 'var(--bs-yellow)' }}>
                Founder
              </p>
              <p className="description">
                I am the CEO and founder of Moonshield.
                <br />
              </p>
            </div>
          </div>
        </TeamContainer>
      </section>
    </>
  )
}

const TeamContainer = styled.div`
    background: linear-gradient( 0deg , rgb(0,0,0) 33%, rgba(50,50,50,0.79) 75%);padding: 3rem;
    border: 3px solid rgba(255,255,255,0.3);
    z-index: 3;
    position: relative;top: 3px;border-bottom: none;
  }
`
export default Team
