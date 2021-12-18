/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import '@nomiclabs/hardhat-waffle'

export default {
  solidity: {
    version: '0.6.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
}
