
function fillRegister() {
  let lookup = [[0.01], [0.05], [0.1], [0.25], [1], [5], [10], [20], [100]];
  const entries = document.querySelectorAll(".num");
  // Change red background of input and info paragraph back to default
  entries.forEach(elem => elem.classList.remove("num-bad"));
  document.querySelector(".num-bad-info").classList.remove("active");
  //Cash-in-drawer array
  let cid = [];
  for (let i = 0; i < lookup.length; i++) {
    // Check if entered numbers are correct
    if (((entries[i].value * 100) % (lookup[i][0] * 100)).toFixed(2) == 0 && entries[i].value != "") {
      // fill the cash-in-drawer array
      let temp = [];
      temp.push(entries[i].labels[0].textContent);
      temp.push(entries[i].value);
      cid.push(temp);
    }
    // If not correct values of numbers, show info and red background of input
    else {
      document.querySelector(".num-bad-info").textContent = "Incorrect number. " + entries[i].getAttribute("placeholder") + " must be entered. Please try again.";
      document.querySelector(".num-bad-info").classList.add("active");
      entries[i].classList.add("num-bad");
      return
    }  
  }
  return cid
}


function checkCashRegister(cid) {
  // Remove all change info present in document
  document.getElementById("change").replaceChildren();
  const price = document.getElementById("price").value;
  const cash = document.getElementById("cash").value;
  const output = [];
  let toChange = cash - price;
  let lookup = [[0.01], [0.05], [0.1], [0.25], [1], [5], [10], [20], [100]];
  // Add current cash amount to lookup array
  for (let i = 0; i < lookup.length; i++) {
    lookup[i].push(cid[i][1]);
  }
  // Calculate coins to change
  for (let i = lookup.length - 1; i >= 0; i--) {
    let unitAmount = 0;
    while (toChange >= lookup[i][0] && lookup[i][1] > 0) {
      unitAmount++;
      toChange = (toChange - lookup[i][0]).toFixed(2);
      lookup[i][1] = (lookup[i][1] - lookup[i][0]).toFixed(2);
    };
    if (unitAmount > 0) {
      output.push([cid[i][0], lookup[i][0] * unitAmount]);
    };
  }

  // Calculate available funds
  let funds = 0;
  for (let i = 0; i < lookup.length; i++) {
    funds += parseFloat(lookup[i][1]);
    console.log(funds)
  }
  console.log(funds)
  console.log(toChange)

  // Check status of the cash register
  if (funds == toChange) {
    console.log({ status: "CLOSED", change: cid })
    return { status: "CLOSED", change: cid };
  }
  else if (toChange > 0) {
    console.log({ status: "INSUFFICIENT_FUNDS", change: [] })

    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  console.log({ status: "OPEN", change: output })

  return { status: "OPEN", change: output }
}


document.getElementById("submit").addEventListener("click", () => {
  cid = fillRegister();
  // Move cid and transaction forms
  if (cid) { 
    document.getElementById("cid").classList.add("left-move");
    document.getElementById("transaction").classList.add("top-move");
  }
});

document.getElementById("submit-transaction").addEventListener("click", () => {
  document.getElementById("status").textContent = checkCashRegister(cid).status;
  const change = checkCashRegister(cid).change;
  // Check if there is anything to change
  if (change.length < 1) {
    const para = document.createElement("p");
    para.innerText = "Nothing to change";
    document.getElementById("change").appendChild(para);
  }
  // Display cash amount to change
  else {
    for (let i = 0; i < change.length; i++) {
      if (change[i][1] > 0) {
        const changeInner = document.createElement("div");
        changeInner.classList.add("change-inner");
        for (let j = 0; j < change[i].length; j++) {
          const para = document.createElement("p");
          para.innerText = change[i][j];
          changeInner.appendChild(para);
          document.getElementById("change").appendChild(changeInner);
        }
      }
    }
  } 
})
