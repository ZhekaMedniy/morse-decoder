const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};

function decode(expr) {

    const pattern = new RegExp(".{1," + 10 + "}", "ig");
    let arr = expr.match(pattern).map(item => item.padEnd(10, "."));

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '**********') arr[i] = ' '
        else {
            let a = arr[i]

            String.prototype.replaceAt = function (index, replacement) {
                return this.substr(0, index) +
                    replacement + this.substr(index + replacement.length);
            }
            for (let j = 0; j < arr[i].length - 1; j += 2) {
                if (a[j] === '0' && a[j + 1] === '0') {
                    a = a.replaceAt(j, '  ')
                }
                if (a[j] === '1' && a[j + 1] === '0') {
                    a = a.replaceAt(j, ' .')
                }
                if (a[j] === '1' && a[j + 1] === '1') {
                    a = a.replaceAt(j, ' -')
                }
            }
            arr[i] = a.replace(/ /g, '')
        }
    }

    let res = ''
    arr.forEach((el) => {
        if (el !== ' ') res = res + MORSE_TABLE[el]
        if (el === ' ') res = res + ' '
    })
    return res
}

module.exports = {
    decode
}