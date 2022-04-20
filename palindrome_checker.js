function palindrome(str) {
    const newStr = str.replace(/[^a-zA-Z\d]/g, "").toLowerCase();
    let newStrBackward = "";
    let tempArr = newStr.split("");
    let tempArrBackward = [];
    for (let i = tempArr.length - 1; i >= 0; i--) {
      tempArrBackward.push(tempArr[i]);
    }
    newStrBackward = tempArrBackward.join("");
    
    if (newStrBackward == newStr) {
      return true
    }
    return false
  }
  
  palindrome("1 eye for of 1 eye.");