var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var numbersAndLetters = numbers.concat(letters);


exports.getLetterArr = function(length) {
    return generate(letters, length);
};

exports.getNumberArr = function(length) {
    return generate(numbers, length);
};

exports.getLetterAndNumberArr = function(length) {
    return generate(numbersAndLetters, length);
};

function generate(arr, length) {
    var result = [];

    function iterator(temp, length) {
        for (var i = 0; i < arr.length; i++) {
            if (length > 1) {
                iterator(temp + arr[i], length - 1);
            } else {
                result.push(temp + arr[i]);
            }
        }
    }
    iterator('', length);
    return result;
}
