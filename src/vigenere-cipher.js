const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    let index = 0;
    let messageArray = message.toUpperCase().split('');
    let keyArray = key.toUpperCase().split('');
    
    let result = messageArray.map((char) => {
      if (this.alphabet.includes(char)){
        if (index > keyArray.length - 1) {index = 0}
        console.log(index, char, keyArray[index]);
        let keyChar = keyArray[index];
        index += 1;
        let encrypted = this.alphabet[(this.alphabet.indexOf(char) + this.alphabet.indexOf(keyChar)) % 26];
        return encrypted;
      }
      return char; 
    });

    if (!this.isDirect) {
      let reverse = '';
      for (let i = result.length - 1; i >= 0; i -= 1){
        reverse += result[i];
      }
      return reverse;
    }
    return result.join('');
  }

  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
    let messageArray = message.toUpperCase().split('');
    let keyArray = key.toUpperCase().split('');
    let index = 0;
    let result = messageArray.map((char) => {
      if (this.alphabet.includes(char)){
        if (index > keyArray.length - 1) {index = 0}
        console.log(index, char, keyArray[index]);
        let keyChar = keyArray[index];
        index += 1;
        let encrypted = this.alphabet[(this.alphabet.indexOf(char) - this.alphabet.indexOf(keyChar) + 26) % 26];
        return encrypted;
      }
      return char; 
    });
    if (!this.isDirect) {
      let reverse = '';
      for (let i = result.length - 1; i >= 0; i -= 1){
        reverse += result[i];
      }
      return reverse;
    }
    return result.join('');
  }
}


module.exports = {
  VigenereCipheringMachine
};
