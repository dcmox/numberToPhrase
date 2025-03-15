"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberToPhrase = exports.randomizeTables = exports.phraseToNumber = exports.numberToPhrase = exports.generateMnemonic = void 0;
var fs = require('fs');
var crypto = require('crypto');
var ethers = require('ethers').ethers;
var bip39 = require('bip39');
var ADJ_LEN = 1000;
var NOUN_LEN = 1435;
var SUB_LEN = 1997;
var VERB_LEN = 1041;
var generateMnemonic = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mnemonic, wallet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bip39.generateMnemonic()];
            case 1:
                mnemonic = _a.sent();
                wallet = ethers.Wallet.fromPhrase(mnemonic);
                return [2 /*return*/, [mnemonic, wallet.address, wallet.privateKey]];
        }
    });
}); };
exports.generateMnemonic = generateMnemonic;
var numberToPhrase = function (num) {
    num = num.replace(/[^0-9]/g, '');
    var adjectives = fs.readFileSync('./data/adjectives.txt').toString().replace(/\r/g, '').split('\n');
    var nouns = fs.readFileSync('./data/nouns.txt').toString().replace(/\r/g, '').split('\n');
    var subjects = fs.readFileSync('./data/subjects.txt').toString().replace(/\r/g, '').split('\n');
    var verbs = fs.readFileSync('./data/verbs.txt').toString().replace(/\r/g, '').split('\n');
    if (fs.existsSync('./data/bin/key.dat')) {
        console.log('key exists');
        var zlib = require('zlib');
        // Read the base64-encoded compressed data from the file
        var base64Data = fs.readFileSync('./data/bin/key.dat', 'utf8');
        // Convert the base64-encoded string back to a Buffer
        var compressedData = Buffer.from(base64Data, 'base64');
        // Decompress the data
        var originalData = zlib.inflateSync(compressedData);
        // Convert the Buffer back to a string (assuming the original data was a string)
        var inflated = originalData.toString('utf8');
        var _a = inflated.split("\r\n"), adjectivesBin_1 = _a[0], nounsBin_1 = _a[1], subjectsBin_1 = _a[2], verbsBin_1 = _a[3];
        var aIndex_1 = 0, nIndex_1 = 0, sIndex_1 = 0, vIndex_1 = 0;
        adjectives.sort(function (a, b) { return adjectivesBin_1[aIndex_1++] === '1' ? 1 : -1; });
        nouns.sort(function (a, b) { return nounsBin_1[nIndex_1++] === '1' ? 1 : -1; });
        subjects.sort(function (a, b) { return subjectsBin_1[sIndex_1++] === '1' ? 1 : -1; });
        verbs.sort(function (a, b) { return verbsBin_1[vIndex_1++] === '1' ? 1 : -1; });
    }
    var bucket = [subjects, verbs, adjectives, nouns];
    var nums = [];
    for (var i = 0, j = 0; i < num.length; i += 3, j++) {
        var word = bucket[j % 4][parseInt(num.substring(i, i + 3), 10)];
        nums.push(word.trim().toLowerCase());
    }
    return nums.join(' ');
};
exports.numberToPhrase = numberToPhrase;
var phraseToNumber = function (phrase) {
    var adjectives = fs.readFileSync('./data/adjectives.txt').toString().replace(/\r/g, '').split('\n');
    var nouns = fs.readFileSync('./data/nouns.txt').toString().replace(/\r/g, '').split('\n');
    var subjects = fs.readFileSync('./data/subjects.txt').toString().replace(/\r/g, '').split('\n');
    var verbs = fs.readFileSync('./data/verbs.txt').toString().replace(/\r/g, '').split('\n');
    if (fs.existsSync('./data/bin/key.dat')) {
        var zlib = require('zlib');
        // Read the base64-encoded compressed data from the file
        var base64Data = fs.readFileSync('./data/bin/key.dat', 'utf8');
        // Convert the base64-encoded string back to a Buffer
        var compressedData = Buffer.from(base64Data, 'base64');
        // Decompress the data
        var originalData = zlib.inflateSync(compressedData);
        // Convert the Buffer back to a string (assuming the original data was a string)
        var inflated = originalData.toString('utf8');
        var _a = inflated.split("\r\n"), adjectivesBin_2 = _a[0], nounsBin_2 = _a[1], subjectsBin_2 = _a[2], verbsBin_2 = _a[3];
        var aIndex_2 = 0, nIndex_2 = 0, sIndex_2 = 0, vIndex_2 = 0;
        adjectives.sort(function (a, b) { return adjectivesBin_2[aIndex_2++] === '1' ? 1 : -1; });
        nouns.sort(function (a, b) { return nounsBin_2[nIndex_2++] === '1' ? 1 : -1; });
        subjects.sort(function (a, b) { return subjectsBin_2[sIndex_2++] === '1' ? 1 : -1; });
        verbs.sort(function (a, b) { return verbsBin_2[vIndex_2++] === '1' ? 1 : -1; });
    }
    var bucket = [subjects, verbs, adjectives, nouns];
    var nums = [];
    var words = phrase.split(' ');
    var _loop_1 = function (i) {
        var word = bucket[i % 4].findIndex(function (word) { return word.toLowerCase() === words[i]; });
        nums.push(word);
    };
    for (var i = 0; i < words.length; i++) {
        _loop_1(i);
    }
    return nums.join('');
};
exports.phraseToNumber = phraseToNumber;
var randomizeTables = function () {
    var zlib = require('zlib');
    var adjectives = fs.readFileSync('./data/adjectives.txt', 'utf8').replace(/\r/g, '').toString().split('\n');
    var nouns = fs.readFileSync('./data/nouns.txt', 'utf8').replace(/\r/g, '').toString().split('\n');
    var subjects = fs.readFileSync('./data/subjects.txt', 'utf8').replace(/\r/g, '').toString().split('\n');
    var verbs = fs.readFileSync('./data/verbs.txt', 'utf8').replace(/\r/g, '').toString().split('\n');
    if (fs.existsSync('./data/bin/key.dat')) {
        console.log('Existing key detected...');
        var zlib_1 = require('zlib');
        // Read the base64-encoded compressed data from the file
        var base64Data = fs.readFileSync('./data/bin/key.dat', 'utf8');
        // Convert the base64-encoded string back to a Buffer
        var compressedData = Buffer.from(base64Data, 'base64');
        // Decompress the data
        var originalData = zlib_1.inflateSync(compressedData);
        // Convert the Buffer back to a string (assuming the original data was a string)
        var inflated = originalData.toString('utf8');
        // Generate backup in case of OOPSIE
        fs.writeFileSync('./data/bin/key.dat.bak', zlib_1.deflateSync(inflated).toString('base64'));
        var _a = inflated.split("\r\n"), adjectivesBin_3 = _a[0], nounsBin_3 = _a[1], subjectsBin_3 = _a[2], verbsBin_3 = _a[3];
        var aIndex_3 = 0, nIndex_3 = 0, sIndex_3 = 0, vIndex_3 = 0;
        adjectives.sort(function (a, b) { return adjectivesBin_3[aIndex_3++] === '1' ? 1 : -1; });
        nouns.sort(function (a, b) { return nounsBin_3[nIndex_3++] === '1' ? 1 : -1; });
        subjects.sort(function (a, b) { return subjectsBin_3[sIndex_3++] === '1' ? 1 : -1; });
        verbs.sort(function (a, b) { return verbsBin_3[vIndex_3++] === '1' ? 1 : -1; });
    }
    else {
        console.log('Generating new key...');
    }
    var adjectivesBin = [];
    var nouncesBin = [];
    var subjectsBin = [];
    var verbsBin = [];
    adjectives.sort(function (a, b) {
        var v = crypto.randomInt(1, 3) === 1 ? 1 : -1;
        adjectivesBin.push(Number(v === 1));
        return v;
    }).join('\n');
    nouns.sort(function (a, b) {
        var v = crypto.randomInt(1, 3) === 1 ? 1 : -1;
        nouncesBin.push(Number(v === 1));
        return v;
    }).join('\n');
    subjects.sort(function (a, b) {
        var v = crypto.randomInt(1, 3) === 1 ? 1 : -1;
        subjectsBin.push(Number(v === 1));
        return v;
    }).join('\n');
    verbs.sort(function (a, b) {
        var v = crypto.randomInt(1, 3) === 1 ? 1 : -1;
        verbsBin.push(Number(v === 1));
        return v;
    }).join('\n');
    var bin = adjectivesBin.join('') + '\r\n' + nouncesBin.join('') + '\r\n' + subjectsBin.join('') + '\r\n' + verbsBin.join('');
    console.log('Creating randomization key...');
    fs.writeFileSync('./data/bin/key.dat', zlib.deflateSync(bin).toString('base64'));
    return true;
};
exports.randomizeTables = randomizeTables;
var NumberToPhrase = /** @class */ (function () {
    function NumberToPhrase() {
    }
    NumberToPhrase.numberToPhrase = function (num) { return (0, exports.numberToPhrase)(num); };
    NumberToPhrase.phraseToNumber = function (phrase) { return (0, exports.phraseToNumber)(phrase); };
    NumberToPhrase.randomizeTables = function () { return (0, exports.randomizeTables)(); };
    NumberToPhrase.generateMnemonic = function () { return (0, exports.generateMnemonic)(); };
    return NumberToPhrase;
}());
exports.NumberToPhrase = NumberToPhrase;
exports.default = NumberToPhrase;
