"use strict";
exports.__esModule = true;
var fs = require('fs');
exports.numberToPhrase = function (num) {
    var adjectives = fs.readFileSync('./data/adjectives.txt').toString().split('\n');
    var nouns = fs.readFileSync('./data/nouns.txt').toString().split('\n');
    var subjects = fs.readFileSync('./data/subjects.txt').toString().split('\n');
    var verbs = fs.readFileSync('./data/verbs.txt').toString().split('\n');
    var bucket = [subjects, verbs, adjectives, nouns];
    var nums = [];
    for (var i = 0, j = 0; i < num.length; i += 3, j++) {
        var word = bucket[j % 4][parseInt(num.substring(i, i + 3), 10)];
        nums.push(word.trim().toLowerCase());
    }
    return nums.join(' ');
};
exports.phraseToNumber = function (phrase) {
    var adjectives = fs.readFileSync('./data/adjectives.txt').toString().split('\n');
    var nouns = fs.readFileSync('./data/nouns.txt').toString().split('\n');
    var subjects = fs.readFileSync('./data/subjects.txt').toString().split('\n');
    var verbs = fs.readFileSync('./data/verbs.txt').toString().split('\n');
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
exports.randomizeTables = function () {
    var adjectives = fs.readFileSync('./data/adjectives.txt', 'utf8').toString().split('\n');
    var nouns = fs.readFileSync('./data/nouns.txt', 'utf8').toString().split('\n');
    var subjects = fs.readFileSync('./data/subjects.txt', 'utf8').toString().split('\n');
    var verbs = fs.readFileSync('./data/verbs.txt', 'utf8').toString().split('\n');
    adjectives = adjectives.sort(function (a, b) { return Math.random() * 2 ? 1 : -1; }).join('\n');
    nouns = nouns.sort(function (a, b) { return Math.random() * 2 ? 1 : -1; }).join('\n');
    subjects = subjects.sort(function (a, b) { return Math.random() * 2 ? 1 : -1; }).join('\n');
    verbs = verbs.sort(function (a, b) { return Math.random() * 2 ? 1 : -1; }).join('\n');
    fs.writeFileSync('./data/adjectives.txt', adjectives);
    fs.writeFileSync('./data/nouns.txt', nouns);
    fs.writeFileSync('./data/subjects.txt', subjects);
    fs.writeFileSync('./data/verbs.txt', verbs);
    return true;
};
var NumberToPhrase = /** @class */ (function () {
    function NumberToPhrase() {
    }
    NumberToPhrase.numberToPhrase = function (num) { return exports.numberToPhrase(num); };
    NumberToPhrase.phraseToNumber = function (phrase) { return exports.phraseToNumber(phrase); };
    NumberToPhrase.randomizeTables = function () { return exports.randomizeTables(); };
    return NumberToPhrase;
}());
exports.NumberToPhrase = NumberToPhrase;
console.log(exports.numberToPhrase('5555555555'));
exports["default"] = NumberToPhrase;
