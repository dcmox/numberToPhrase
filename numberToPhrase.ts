const fs = require('fs')

export const numberToPhrase = (num: string): string => {
    num = num.replace(/[0-9]/g, '')
    const adjectives = fs.readFileSync('./data/adjectives.txt').toString().split('\n')
    const nouns = fs.readFileSync('./data/nouns.txt').toString().split('\n')
    const subjects = fs.readFileSync('./data/subjects.txt').toString().split('\n')
    const verbs = fs.readFileSync('./data/verbs.txt').toString().split('\n')

    const bucket = [subjects, verbs, adjectives, nouns]

    const nums: string[] = []
    for (let i = 0, j = 0; i < num.length; i += 3, j++) {
        const word = bucket[j % 4][parseInt(num.substring(i, i + 3), 10)]
        nums.push(word.trim().toLowerCase())
    }

    return nums.join(' ')
}

export const phraseToNumber = (phrase: string): string => {
    const adjectives = fs.readFileSync('./data/adjectives.txt').toString().split('\n')
    const nouns = fs.readFileSync('./data/nouns.txt').toString().split('\n')
    const subjects = fs.readFileSync('./data/subjects.txt').toString().split('\n')
    const verbs = fs.readFileSync('./data/verbs.txt').toString().split('\n')

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
    let adjectives = fs.readFileSync('./data/adjectives.txt', 'utf8').toString().split('\n')
    let nouns = fs.readFileSync('./data/nouns.txt', 'utf8').toString().split('\n')
    let subjects = fs.readFileSync('./data/subjects.txt', 'utf8').toString().split('\n')
    let verbs = fs.readFileSync('./data/verbs.txt', 'utf8').toString().split('\n')

    adjectives = adjectives.sort((a: string, b: string) => Math.random() * 2 ? 1 : -1).join('\n')
    nouns = nouns.sort((a: string, b: string) => Math.random() * 2 ? 1 : -1).join('\n')
    subjects = subjects.sort((a: string, b: string) => Math.random() * 2 ? 1 : -1).join('\n')
    verbs = verbs.sort((a: string, b: string) => Math.random() * 2 ? 1 : -1).join('\n')

    fs.writeFileSync('./data/adjectives.txt', adjectives)
    fs.writeFileSync('./data/nouns.txt', nouns)
    fs.writeFileSync('./data/subjects.txt', subjects)
    fs.writeFileSync('./data/verbs.txt', verbs)

    return true
}

export class NumberToPhrase {
    public static numberToPhrase = (num: string): string => numberToPhrase(num)
    public static phraseToNumber = (phrase: string): string => phraseToNumber(phrase)
    public static randomizeTables = (): boolean => randomizeTables()
}

export default NumberToPhrase
