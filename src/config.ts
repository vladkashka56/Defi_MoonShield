// import { ChainId } from '@pancakeswap-libs/sdk';
import { Configuration } from './moonshield-finance/config'
import { ChainId } from './moonshield-finance/types'
// import { ChainId } from '@usedapp/core'

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.MAINNET,
    networkName: 'BSC Mainnet',
    bscscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed1.defibit.io/',
    deployments: require('./moonshield-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      MoonShield: ['0xF565aaf0b8EB813a1c8C956D2C59F1ce27FD2366', 9],
      TbusToken: ['0x392406443CC8955688050E11FbaFe1F96278D1EA', 18],
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      WBNB_MoonShield_LP: ['0xC2a48A6c2003077432eE3A8980fE5F893498FeAe', 18],
    },
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'BSC Mainnet',
    bscscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed1.defibit.io/',
    deployments: require('./moonshield-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      MoonShield: ['0xF565aaf0b8EB813a1c8C956D2C59F1ce27FD2366', 9],
      TbusToken: ['0x392406443CC8955688050E11FbaFe1F96278D1EA', 18],
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      WBNB_MoonShield_LP: ['0xC2a48A6c2003077432eE3A8980fE5F893498FeAe', 18],
    },
    refreshInterval: 10000,
  },
}

export default configurations[process.env.NODE_ENV || 'development']
