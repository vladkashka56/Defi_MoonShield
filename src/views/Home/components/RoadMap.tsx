import React from 'react'

const RoadMap: React.FC = () => {
  return (
    <>
      <section
        id="roadmap"
        className="feature-section bg-stars pb-0"
        style={{ width: '100%' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-white">Roadmap</h2>
              <h3 className="section-subheading text-muted">
                Here's what the $MSHLD Squad is working on
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-group timeline">
                <li className="list-group-item">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      data-aos="zoom-in"
                      data-aos-duration="1400"
                      src="assets/img/SATURNO.svg?h=d751934a8caa27f16ebd70dd847e0664"
                      style={{ borderRadius: '0px!important', padding: '5px' }}
                      loading="lazy"
                    />
                  </div>
                  <div
                    data-aos="fade"
                    data-aos-duration="1200"
                    data-aos-delay="400"
                    className="timeline-panel"
                  >
                    <div className="timeline-heading">
                      <h4>August</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Second token in our ecosystem
                        <br />
                        Huge marketing push with a goal of 5000 telegram
                        members.
                        <br />
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item timeline-inverted">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      data-aos="zoom-in"
                      data-aos-duration="1400"
                      src="assets/img/NEPTUNO.svg?h=ae58af1fe674d12074b937a962a0759a"
                      style={{ borderRadius: '0px!important', padding: '5px' }}
                      loading="lazy"
                    />
                  </div>
                  <div
                    data-aos="fade"
                    data-aos-duration="1200"
                    data-aos-delay="400"
                    className="timeline-panel"
                  >
                    <div className="timeline-heading">
                      <h4>
                        <strong>Late 4th Quarter 2021</strong>
                        <br />
                      </h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Add a third token to our ecosystem.
                        <br />
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      data-aos="zoom-in"
                      data-aos-duration="1400"
                      src="assets/img/URANO.svg?h=1de2ac9d2a03e90772407f064e62f5d0"
                      style={{ padding: '35px' }}
                      loading="lazy"
                    />
                  </div>
                  <div
                    data-aos="fade"
                    data-aos-duration="1200"
                    data-aos-delay="400"
                    className="timeline-panel p-lg-4 psm-0"
                  >
                    <div className="timeline-heading">
                      <h4>2022</h4>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Add a fourth token to our ecosystem.
                        <br />+ More to be announced
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RoadMap
