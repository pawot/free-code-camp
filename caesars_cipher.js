function rot13(str) {

    return str.split("")
              .map(function(item) {
                if (item.match(/[A-M]/)) {
                  return String.fromCharCode(item.charCodeAt() + 13);
                  }
                else if (item.match(/[N-Z]/)) {
                  return String.fromCharCode(item.charCodeAt() - 13);
                  }
                return item
                })
              .join("");
  }
  
  rot13("SERR PBQR PNZC");