function telephoneCheck(str) {
    const regex = /^1? ?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    return regex.test(str); 
  }
  
  telephoneCheck("(555)468-5555");