# numberToPhrase
Number to phrase generator. You can use this to memorize numbers more easily. You can randomize the table of words used to produce a different result until you are satisfied. The words are saved in a txt file.

## Usage
```javascript
const NumberToPhrase = require('@dcmox/numbertophrase').NumberToPhrase
console.log(NumberToPhrase.numberToPhrase('5555555555')) // outputs 'jax bares easygoing chess'
console.log(NumberToPhrase.phraseToNumber('jax bares easygoing chess')) // outputs 5555555555
NumberToPhrase.randomizeTables() // randomizes the words to produce a new result
```
