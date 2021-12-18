import { ethers, Wallet, Contract } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { waffle } from 'hardhat';

import { expandTo18Decimals } from './utilities'

import BuffetFactory from '@buffet-dex/buffetswap-core/artifacts/contracts/BuffetFactory.sol/BuffetFactory.json'
import IBuffetPair from '@buffet-dex/buffetswap-core/artifacts/contracts/interfaces/IBuffetPair.sol/IBuffetPair.json'

import ERC20 from '../../artifacts/contracts/test/ERC20.sol/ERC20.json'
import WETH9 from '../../artifacts/contracts/test/WETH9.sol/WETH9.json'
import BuffetRouter from '../../artifacts/contracts/BuffetRouter.sol/BuffetRouter.json'
import RouterEventEmitter from '../../artifacts/contracts/test/RouterEventEmitter.sol/RouterEventEmitter.json'

const { deployContract } = waffle;
const overrides = {
  gasLimit: 9999999
}

interface V2Fixture {
  token0: Contract
  token1: Contract
  WETH: Contract
  WETHPartner: Contract
  factoryV2: Contract
  routerEventEmitter: Contract
  router: Contract
  pair: Contract
  WETHPair: Contract
}

export async function v2Fixture([wallet]: Wallet[], provider: Web3Provider): Promise<V2Fixture> {
  // deploy tokens
  const tokenA = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)])
  const tokenB = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)])
  const WETH = await deployContract(wallet, WETH9)
  const WETHPartner = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)])

  // deploy V2
  const factoryV2 = await deployContract(wallet, BuffetFactory, [wallet.address])

  // deploy routers
  const router = await deployContract(wallet, BuffetRouter, [factoryV2.address, WETH.address], overrides)

  // event emitter for testing
  const routerEventEmitter = await deployContract(wallet, RouterEventEmitter, [])

  // initialize V2
  await factoryV2.createPair(tokenA.address, tokenB.address)
  const pairAddress = await factoryV2.getPair(tokenA.address, tokenB.address)
  const pair = new Contract(pairAddress, JSON.stringify(IBuffetPair.abi), provider).connect(wallet)

  const token0Address = await pair.token0()
  const token0 = tokenA.address === token0Address ? tokenA : tokenB
  const token1 = tokenA.address === token0Address ? tokenB : tokenA

  await factoryV2.createPair(WETH.address, WETHPartner.address)
  const WETHPairAddress = await factoryV2.getPair(WETH.address, WETHPartner.address)
  const WETHPair = new Contract(WETHPairAddress, JSON.stringify(IBuffetPair.abi), provider).connect(wallet)

  return {
    token0,
    token1,
    WETH,
    WETHPartner,
    factoryV2,
    router,
    routerEventEmitter,
    pair,
    WETHPair
  }
}
