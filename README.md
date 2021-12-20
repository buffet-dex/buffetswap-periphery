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
yarn hardhat run --network bsc_test scripts/deploy.ts
```

[1]: https://github.com/Uniswap/v2-periphery
[2]: https://testnet.bscscan.com/address/0x7B40a4F33dAA1e1243d9B8070c8E6b609C1aE094#code
