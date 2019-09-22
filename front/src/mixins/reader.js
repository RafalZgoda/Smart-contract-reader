import Web3 from "web3";
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/5e9d1228863146be83da76a1275c43db"
  )
);

export default {
  methods: {
    async getHex(contractAddress, index) {
      return await web3.eth.getStorageAt(contractAddress, index);
    },

    readNumber(hex) {
      try {
        return web3.utils.hexToNumber(hex);
      } catch (e) {
           console.log(`Cannot convert ${hex} to Number`)
        }
    },
    readString(hex) {
        try {
          return web3.utils.toAscii(hex);
        } catch (e) {
             console.log(`Cannot convert ${hex} to String`)
          }
      }
  }
};
