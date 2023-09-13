// import { Fetcher, Route, Token } from '@pancakeswap/sdk';
import { Configuration } from './config'
import { BigNumber, Contract, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import ERC20 from './ERC20'
import { getDefaultProvider } from '../utils/provider'
import IPancakeSwapV2PairABI from './IPancakeSwapV2Pair.abi.json'
import { DashboardInfo } from './types'

/**
 * An API module of MoonShield Finance contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class MoonShieldFinance {
  myAccount: string
  provider: ethers.providers.Web3Provider
  signer?: ethers.Signer
  config: Configuration
  contracts: { [name: string]: Contract }
  externalTokens: { [name: string]: ERC20 }

  WBNBMoonShield_LP: Contract
  TbusToken: ERC20
  MoonShield: ERC20

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg
    const provider = getDefaultProvider()

    // loads contracts from deployments
    this.contracts = {}
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(
        deployment.address,
        deployment.abi,
        provider,
      )
    }
    this.externalTokens = {}
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(
        address,
        provider,
        symbol,
        decimal,
      )
    }
    this.MoonShield = new ERC20(
      deployments.MoonShield.address,
      provider,
      'MoonShield',
    )
    this.TbusToken = new ERC20(
      deployments.TbusToken.address,
      provider,
      'TbusToken',
    )

    // PancakeSwap V2 Pair
    this.WBNBMoonShield_LP = new Contract(
      externalTokens['WBNB_MoonShield_LP'][0],
      IPancakeSwapV2PairABI,
      provider,
    )

    this.config = cfg
    this.provider = provider
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    this.signer = provider.getSigner(0)
    this.myAccount = account
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer)
    }
    const tokens = [
      this.TbusToken,
      this.MoonShield,
      ...Object.values(this.externalTokens),
    ]
    for (const token of tokens) {
      token.connect(this.signer)
    }
    this.WBNBMoonShield_LP = this.WBNBMoonShield_LP.connect(this.signer)
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`)
  }

  get isUnlocked(): boolean {
    return !!this.myAccount
  }

  async claimBNBReward(): Promise<TransactionResponse> {
    const { MoonShield } = this.contracts
    return await MoonShield.claimBNBReward()
  }

  async disruptiveTransfer(
    recepientAddress: string,
    tokenAmount: number,
  ): Promise<TransactionResponse> {
    const { MoonShield } = this.contracts
    const amount = BigNumber.from(tokenAmount).mul(1e9).toString()
    return await MoonShield.disruptiveTransfer(recepientAddress, amount)
  }

  async getBurnAmount(): Promise<BigNumber> {
    const { MoonShield } = this.contracts
    return await MoonShield.balanceOf(
      '0x000000000000000000000000000000000000dead',
    )
  }

  async getLpMshieldBalance(): Promise<BigNumber> {
    const { PancakePair } = this.contracts
    const { /*_reserve0,*/ _reserve1 } = await PancakePair.getReserves()
    return _reserve1
  }

  async getLpBnbBalance(): Promise<BigNumber> {
    const { _reserve0 /*, _reserve1*/ } =
      await this.WBNBMoonShield_LP.getReserves()
    return _reserve0
  }

  async getTotalLiquidty(tokenAddress: string): Promise<string> {
    const { MultiCall } = this.contracts
    return await MultiCall.getEthBalance(tokenAddress)
  }

  async getMoonShieldTotalSupply(): Promise<BigNumber> {
    return await this.MoonShield.totalSupply()
  }

  async getTokenBalance(
    tokenName: string,
    userAddress: string,
  ): Promise<BigNumber> {
    const tokenContract = this.externalTokens[tokenName]
    return await tokenContract.balanceOf(userAddress)
  }

  async getNextClaimDate(userAddress: string): Promise<BigNumber> {
    const { MoonShield } = this.contracts
    return await MoonShield.nextAvailableClaimDate(userAddress)
  }

  async getMoonBalance(userAddress: string): Promise<BigNumber> {
    const { MoonShield } = this.contracts
    return await MoonShield.calculateBNBReward(userAddress)
  }

  async getSlotBalance(userAddress: string): Promise<BigNumber> {
    const { Slot } = this.contracts
    return await Slot.balanceOf(userAddress)
  }

  async getMaxTransactionAmount(): Promise<BigNumber> {
    const { MoonShield } = this.contracts
    return await MoonShield._maxTxAmount()
  }

  async getBNBRewardAmount(userAddress: string): Promise<BigNumber> {
    const { MoonShield } = this.contracts
    return await MoonShield.calculateBNBReward(userAddress)
  }

  async getRewardPoolBalance(tokenName: string): Promise<BigNumber> {
    const provider = this.provider
    const tokenContract = this.contracts[tokenName]
    return await provider.getBalance(tokenContract.address)
  }

  async getBNBPrice(): Promise<number> {
    const prices = await fetch(
      'https://api3.binance.com/api/v3/ticker/price',
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    return prices[98].price
  }

  async getDashBoardInfo(userAddress: string): Promise<DashboardInfo> {
    const BNBPrice = await this.getBNBPrice()
    const { WBNB, MoonShield, WBNB_MoonShield_LP } = this.externalTokens
    const totalliquidity = await this.getTotalLiquidty(MoonShield.address)
    const realtotalliquidity =
      Number(
        Number(totalliquidity) === 0
          ? '0'
          : BigNumber.from(totalliquidity).div(BigNumber.from(1e9)).toString(),
      ) / 1e9
    const realvalue =
      Number(
        Number(BNBPrice) === 0
          ? '0'
          : BigNumber.from(totalliquidity)
              .mul(BigNumber.from(Number(BNBPrice).toFixed(0)))
              .div(BigNumber.from(1e9))
              .toNumber(),
      ) / 1e9
    const lptotalliquidity = Number(await this.getLpBnbBalance())
    const LpMshield = await this.getLpMshieldBalance()
    const LpMshieldValue = Number(LpMshield)
    const LpRatio = lptotalliquidity / LpMshieldValue
    // ---------------  MAX TRANSACTION -------------------  //
    const maxtransvalue = ((LpRatio * 500000000000) / 1000000000).toFixed(3)
    // const maxTransactionAmount = await this.getMaxTransactionAmount()
    // const maxTransaction =
    //   '$MSHLD ' + maxTransactionAmount.div(BigNumber.from(1e9)).toString()
    // ------------  BNB in Liquidity Pool ---------------- //
    const totalBNBInLiquidityPool = await WBNB.balanceOf(
      this.WBNBMoonShield_LP.address,
    )
    const totalBNBValue = Number(totalBNBInLiquidityPool)
    const totalBNB = ethers.utils.formatEther(totalBNBInLiquidityPool) + ' BNB'
    // ---------------  MoonShield Price ------------------  //

    const totalMSHLDInLiquidityPool = await MoonShield.balanceOf(
      WBNB_MoonShield_LP.address,
    )
    // const price = totalBNBInLiquidityPool
    //   .div(totalMSHLDInLiquidityPool)
    //   .toNumber()
    // const MSHLDPrice = price / 1000000000
    // const currenyPrice = (price / 1000000000).toString() + ' BNB'

    // ---------- CURRENT WALLET MSHLD HOLDINGS ------------- //
    let currentBalance: number = 0
    if (userAddress) {
      const balance = await MoonShield.balanceOf(userAddress)
      currentBalance = balance.div(BigNumber.from(1e9)).toNumber()
    }
    // -------- CURRENT WALLET BNB REWARD BALANCE -----------  //
    // const BNBRewardPool = ethers.utils.formatEther(
    //   await this.getRewardPoolBalance('MoonShield'),
    // )
    return {
      totalBNB: totalBNB,
      totalBNBValue: totalBNBValue,
      BNBPrice: Number(BNBPrice),
      currentBalance: currentBalance,
      maxtransvalue: maxtransvalue,
      realvalue: realvalue.toFixed(3),
      realtotalliquidity: realtotalliquidity.toFixed(5),
    }
  }
}
