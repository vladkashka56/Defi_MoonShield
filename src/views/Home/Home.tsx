import React from 'react'
import Page from '../../components/Page'
import TopBar from '../../components/TopBar'
import Header from './components/Header'
import HeroHowTo from './components/Hero'
import Community from './components/Community'
import LiquidityPool from './components/LiquidityPool'
import EarnBNB from './components/EarnBNB'
import AntiDump from './components/AntiDump'
import Reflection from './components/Reflection'
import MidPanelInfo from '../../components/MidPanel/MidPanelInfo'
import RoadMap from './components/RoadMap'
import Team from './components/Team'
import Footer from '../../components/Footer'

const Home: React.FC = () => {
  return (
    <>
      <div style={{ marginTop: '-1150px' }}>
        <Page>
          <Header />
          <HeroHowTo />
          <Community />
          <LiquidityPool />
          <EarnBNB />
          <AntiDump />
          <Reflection />
          <MidPanelInfo />
          <Team />
          <RoadMap />
          <Footer />
          <TopBar />
        </Page>
      </div>
    </>
  )
}

export default Home
