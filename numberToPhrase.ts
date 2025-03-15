const fs = require('fs')
const crypto = require('crypto')

const { ethers } = require('ethers');
const bip39 = require('bip39');

const ADJ_LEN   = 1000;
const NOUN_LEN  = 1435;
const SUB_LEN   = 1997;
const VERB_LEN  = 1041;

export const generateMnemonic = async (): Promise<[string, string, string]> => {
    let mnemonic = await bip39.generateMnemonic();
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    return [mnemonic, wallet.address, wallet.privateKey];
}

export const numberToPhrase = (num: string): string => {
    num = num.replace(/[^0-9]/g, '')

    let adjectives = fs.readFileSync('./data/adjectives.txt').toString().replace(/\r/g, '').split('\n')
    let nouns = fs.readFileSync('./data/nouns.txt').toString().replace(/\r/g, '').split('\n')
    let subjects = fs.readFileSync('./data/subjects.txt').toString().replace(/\r/g, '').split('\n')
    let verbs = fs.readFileSync('./data/verbs.txt').toString().replace(/\r/g, '').split('\n')

    if (fs.existsSync('./data/bin/key.dat')) {
        console.log('key exists')
        const zlib = require('zlib');

        // Read the base64-encoded compressed data from the file
        const base64Data = fs.readFileSync('./data/bin/key.dat', 'utf8');

        // Convert the base64-encoded string back to a Buffer
        const compressedData = Buffer.from(base64Data, 'base64');

        // Decompress the data
        const originalData = zlib.inflateSync(compressedData);

        // Convert the Buffer back to a string (assuming the original data was a string)
        const inflated = originalData.toString('utf8');

        let [adjectivesBin, nounsBin, subjectsBin, verbsBin] = inflated.split("\r\n");

        let aIndex = 0, nIndex = 0, sIndex = 0, vIndex = 0;
        adjectives.sort((a: string, b: string) => adjectivesBin[aIndex++] === '1' ? 1 : -1)
        nouns.sort((a: string, b: string) => nounsBin[nIndex++] === '1' ? 1 : -1)
        subjects.sort((a: string, b: string) => subjectsBin[sIndex++] === '1' ? 1 : -1)
        verbs.sort((a: string, b: string) => verbsBin[vIndex++] === '1' ? 1 : -1)
    }
    
    const bucket = [subjects, verbs, adjectives, nouns]

    const nums: string[] = []
    for (let i = 0, j = 0; i < num.length; i += 3, j++) {
        const word = bucket[j % 4][parseInt(num.substring(i, i + 3), 10)]
        nums.push(word.trim().toLowerCase())
    }

    return nums.join(' ')
}

export const phraseToNumber = (phrase: string): string => {
    let adjectives = fs.readFileSync('./data/adjectives.txt').toString().replace(/\r/g, '').split('\n')
    let nouns = fs.readFileSync('./data/nouns.txt').toString().replace(/\r/g, '').split('\n')
    let subjects = fs.readFileSync('./data/subjects.txt').toString().replace(/\r/g, '').split('\n')
    let verbs = fs.readFileSync('./data/verbs.txt').toString().replace(/\r/g, '').split('\n')

    if (fs.existsSync('./data/bin/key.dat')) {
        const zlib = require('zlib');

        // Read the base64-encoded compressed data from the file
        const base64Data = fs.readFileSync('./data/bin/key.dat', 'utf8');

        // Convert the base64-encoded string back to a Buffer
        const compressedData = Buffer.from(base64Data, 'base64');

        // Decompress the data
        const originalData = zlib.inflateSync(compressedData);

        // Convert the Buffer back to a string (assuming the original data was a string)
        const inflated = originalData.toString('utf8');

        let [adjectivesBin, nounsBin, subjectsBin, verbsBin] = inflated.split("\r\n");
        
        let aIndex = 0, nIndex = 0, sIndex = 0, vIndex = 0;
        adjectives.sort((a: string, b: string) => adjectivesBin[aIndex++] === '1' ? 1 : -1)
        nouns.sort((a: string, b: string) => nounsBin[nIndex++] === '1' ? 1 : -1)
        subjects.sort((a: string, b: string) => subjectsBin[sIndex++] === '1' ? 1 : -1)
        verbs.sort((a: string, b: string) => verbsBin[vIndex++] === '1' ? 1 : -1)
    }

    const bucket = [subjects, verbs, adjectives, nouns]

    const nums: string[] = []
    const words = phrase.split(' ')
    for (let i = 0; i < words.length; i++) {
        const word = bucket[i % 4].findIndex((word: string) => word.toLowerCase() === words[i])
        nums.push(word)
    }

    return nums.join('')
}

export const randomizeTables = (): boolean => {
    const zlib = require('zlib');
    let adjectives = fs.readFileSync('./data/adjectives.txt', 'utf8').replace(/\r/g, '').toString().split('\n')
    let nouns = fs.readFileSync('./data/nouns.txt', 'utf8').replace(/\r/g, '').toString().split('\n')
    let subjects = fs.readFileSync('./data/subjects.txt', 'utf8').replace(/\r/g, '').toString().split('\n')
    let verbs = fs.readFileSync('./data/verbs.txt', 'utf8').replace(/\r/g, '').toString().split('\n')

    if (fs.existsSync('./data/bin/key.dat')) {
        console.log('Existing key detected...')
        const zlib = require('zlib');

        // Read the base64-encoded compressed data from the file
        const base64Data = fs.readFileSync('./data/bin/key.dat', 'utf8');

        // Convert the base64-encoded string back to a Buffer
        const compressedData = Buffer.from(base64Data, 'base64');

        // Decompress the data
        const originalData = zlib.inflateSync(compressedData);

        // Convert the Buffer back to a string (assuming the original data was a string)
        const inflated = originalData.toString('utf8');

        // Generate backup in case of OOPSIE
        fs.writeFileSync('./data/bin/key.dat.bak', zlib.deflateSync(inflated).toString('base64'));

        let [ adjectivesBin, nounsBin, subjectsBin, verbsBin ] = inflated.split("\r\n");
        
        let aIndex = 0, nIndex = 0, sIndex = 0, vIndex = 0;
        adjectives.sort((a: string, b: string) => adjectivesBin[aIndex++] === '1' ? 1 : -1)
        nouns.sort((a: string, b: string) => nounsBin[nIndex++] === '1' ? 1 : -1)
        subjects.sort((a: string, b: string) => subjectsBin[sIndex++] === '1' ? 1 : -1)
        verbs.sort((a: string, b: string) => verbsBin[vIndex++] === '1' ? 1 : -1)
    } else {
        console.log('Generating new key...');
    }

    let adjectivesBin: number[] = [];
    let nouncesBin: number[] = [];
    let subjectsBin: number[] = [];
    let verbsBin: number[] = [];

    adjectives.sort((a: string, b: string) => { 
        let v = crypto.randomInt(1, 3) === 1 ? 1 : -1; 
        adjectivesBin.push(Number(v === 1));
        return v;
    }).join('\n')
    nouns.sort((a: string, b: string) => { 
        let v = crypto.randomInt(1, 3) === 1 ? 1 : -1; 
        nouncesBin.push(Number(v === 1));
        return v;
    }).join('\n')
    subjects.sort((a: string, b: string) => { 
        let v = crypto.randomInt(1, 3) === 1 ? 1 : -1; 
        subjectsBin.push(Number(v === 1));
        return v;
    }).join('\n')
    verbs.sort((a: string, b: string) => { 
        let v = crypto.randomInt(1, 3) === 1 ? 1 : -1; 
        verbsBin.push(Number(v === 1));
        return v;
    }).join('\n')

    const bin = adjectivesBin.join('') + '\r\n' + nouncesBin.join('') + '\r\n' + subjectsBin.join('') + '\r\n' + verbsBin.join('');
    
    console.log('Creating randomization key...')
    fs.writeFileSync('./data/bin/key.dat', zlib.deflateSync(bin).toString('base64'));

    return true
}

export class NumberToPhrase {
    public static numberToPhrase = (num: string, base64: boolean): string => numberToPhrase(num)
    public static phraseToNumber = (phrase: string, base64: boolean): string => phraseToNumber(phrase)
    public static randomizeTables = (): boolean => randomizeTables()
    public static generateMnemonic = (): Promise<[string, string, string]> => generateMnemonic()
}

export default NumberToPhrase
