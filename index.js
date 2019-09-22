require("dotenv").config({ path: "./.env" });

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URL_BC));

const getHex = async (contractAddress, index) => {
  return await web3.eth.getStorageAt(contractAddress, index);
};

const printIndex = (index, hex) => {
  console.log(
    `\n*******************************************************************************************`
  );
  console.log(`Index : ${index} for storage : ${hex}`);
};

const readNumber = hex => {
  console.log("Number :" + web3.utils.hexToNumber(hex));
};

const readString = hex => {
  console.log("String:" + web3.utils.toAscii(hex));
};

const readStruct = async (_contractAddress, index, key) => {
  let newKey = web3.utils.sha3(key + index, { encoding: "hex" });
  let hex = await web3.eth.getStorageAt(_contractAddress, newKey);
  console.log(`Struct : ${web3.toAscii(hex)}`);
};

const reader = async _contractAddress => {
  for (var i = 0; i < 10; i++) {
    //const i = 2;
    const hex = await getHex(_contractAddress, i);
    printIndex(i, hex);

    try {
      readNumber(hex);
      readString(hex);
      await readStruct(
        _contractAddress,
        i,
        "00000000000000000000000xbccc714d56bc0da0fd33d96d2a87b680dd6d0df6"
      );
    } catch (e) {
      try {
        readString(hex);
      } catch (e2) {}
    }
  }
};

const contractAddress = "0xf1f5896aCE3A78c347Eb7EAB503450Bc93Bd0c3b";
reader(contractAddress);
