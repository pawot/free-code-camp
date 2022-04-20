function convertToRoman(num) {
    const symbols = {
      1: "I",
      4: "IV",
      5: "V",
      9: "IX",
      10: "X",
      40: "XL",
      50: "L",
      90: "XC",
      100: "C",
      400: "CD",
      500: "D",
      900: "CM",
      1000: "M"
    };
    let numbers = Object.keys(symbols);
    let tempArr = [];
    function calcFunc(x) {
      for (let i = 0; i < numbers.length; i++) {
        if (x == 0) { 
          return tempArr.join("");
        }
        else if (x >= numbers[i] && (x < numbers[i + 1] || i == numbers.length - 1)) {
          tempArr.push(symbols[numbers[i]]);
          x = x - numbers[i];
          return calcFunc(x);
        }
      }
    }
    return calcFunc(num);
  }
  
  convertToRoman(3);