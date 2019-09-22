<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <v-text-field
          v-model="contractAddress"
          small
          placeholder="contractAddress"
          name="contractAddress"
        ></v-text-field>

        <v-btn @click="reader(contractAddress)">READ</v-btn>
        NUMBER : 
        <ul>
          <li v-for="(number, index) in numbers" :key="`number${index}`"> Index : {{ index }} =  {{ number }}</li>
        </ul>
        STRING : 
        <ul>
          <li v-for="(string, index) in strings" :key="`string${index}`"> Index : {{ index }} =  {{ string }}</li>
        </ul>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import reader from "../mixins/reader";

export default {
  name: "SmartContractReader",
  data() {
    return {
      hexs: [],
      number: "",
      numbers: [],
      string: "",
      strings: [],
      contractAddress: "0xf1f5896aCE3A78c347Eb7EAB503450Bc93Bd0c3b"
    };
  },
  mixins: [reader],
  methods: {
    async reader(_contractAddress) {
      try {
        for(var i = 0 ; i < 10 ; i++) {
        const hex = await this.getHex(_contractAddress, i);
        console.log("hex", hex);
        this.hexs.push(hex);

        this.numbers.push(this.readNumber(hex));
        this.strings.push(this.readString(hex));
        
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
