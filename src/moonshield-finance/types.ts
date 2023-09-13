export enum ChainId {
  MAINNET = 56,
  BSCTESTNET = 97,
}

export type ContractName = string

export interface DashboardInfo {
  totalBNB: string
  totalBNBValue: number
  BNBPrice: number
  currentBalance: number
  maxtransvalue: string
  realvalue: string
  realtotalliquidity: string
}
