const fs = require("fs")
const path = require("path")

const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    fs.writeFileSync('abi.json', JSON.stringify(abi));

    return abi
  } catch (e) {
    console.log(`e`, e)
  }
}

getTheAbi();