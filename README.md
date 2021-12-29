# Buffetswap

Forked from [Uniswap V2][1].

# Local Development

The following assumes the use of `node@>=16`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`

## Deploy

### BSC Testnet

Deployed BuffetRouter: [0x7B40a4F33dAA1e1243d9B8070c8E6b609C1aE094][2]

```sh
# FACTORY_ADDRESS=0x2119E6A0c07c667D2D4777F082b718e8950AFDf1
# WETH_ADDRESS=0x0de8fcae8421fc79b29ade9fff97854a424cad09

yarn hardhat run --network bsc_test scripts/deploy.ts
```

### AVAX Testnet

Deployed BuffetRouter: [0x7B40a4F33dAA1e1243d9B8070c8E6b609C1aE094][3]

```sh
# FACTORY_ADDRESS=0x2119E6A0c07c667D2D4777F082b718e8950AFDf1
# WETH_ADDRESS=0xd00ae08403b9bbb9124bb305c09058e32c39a48c

yarn hardhat run --network avax_test scripts/deploy.ts
```

[1]: https://github.com/Uniswap/v2-periphery
[2]: https://testnet.bscscan.com/address/0x7B40a4F33dAA1e1243d9B8070c8E6b609C1aE094#code
[3]: https://testnet.snowtrace.io/address/0x7B40a4F33dAA1e1243d9B8070c8E6b609C1aE094#code
