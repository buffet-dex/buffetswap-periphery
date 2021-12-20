import { ethers } from 'hardhat'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  const Router = await ethers.getContractFactory('BuffetRouter')
  const router = await Router.deploy(process.env.FACTORY_ADDRESS, process.env.WETH_ADDRESS)
  console.log('BuffetRouter deployed to:', router.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
