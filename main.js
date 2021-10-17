const customer = [
    {
      id: 01,
      name: "Akshita",
      type: " savings",
      account_No: 12345566,
      transaction: [
        [2000, new Date(2000, 11, 12)],
        [-2290, new Date(2000, 10, 2)],
        [2788, new Date(2000, 11, 12)],
        [-2290, new Date(2000, 10, 2)],
      ],
    },
    {
      id: 02,
      name: "Ruchi",
      type: "savings",
      account_No: 45678990,
      transaction: [
        [2000, new Date(2000, 11, 12)],
        [-2290, new Date(2000, 10, 2)],
      ],
    },
    {
      id: 03,
      name: "Nisha",
      type: "savings",
      account_No: 14335464,
      transaction: [
        [2000, new Date(2000, 11, 12)],
        [-2290, new Date(2000, 10, 2)],
      ],
    },
  ];
  
  const inputName = document.querySelector("#name");
  const heading = document.querySelector(".main__heading");
  const cards = document.querySelector(".main__cards");
  const eachCard = document.querySelectorAll(".main__card");
  let acc_name = document.querySelector("#acc_name");
  let acc_no = document.querySelector("#acc_no");
  let acc_type = document.querySelector("#Acc_type");
  let balance = document.querySelector("#Balance");
  let acc_holder_details = document.querySelector(".account__holder_detail");
  let withdrawPalet = document.querySelector(".account_transaction_withdraw");
  let depositPalet = document.querySelector(".account_transaction_deposit");
  
  const depositCards = document.querySelector(".deposit__cards");
  const depositButton = document.querySelector(".deposit__button");
  const depositInput = document.querySelector(".deposit__input");
  const depositSort = document.querySelector(".deposit__sort");
  
  const withdrawCards = document.querySelector(".withdraw__cards");
  const withdrawButton = document.querySelector(".withdraw__button");
  const withdrawInput = document.querySelector(".withdraw__input");
  const withdrawSort = document.querySelector(".withdraw__sort");
  
  const loanInput = document.querySelector(".loan_input");
  const loanButton = document.querySelector(".loan_button");
  const loanOutput = document.querySelector(".loan_output");
  
  let total_balance = 0;
  
  cards.addEventListener("click", (event) => {
    eachCard.forEach((elem) => elem.classList.remove("active__card"));
    const elem = event.target.closest(".main__card");
    elem.classList.add("active__card");
    const htmlArr = [...eachCard];
    const inactiveElems = htmlArr.filter(
      (elem) => elem.classList.contains("active__card") === false
    );
    console.log(inactiveElems);
    const [a, b] = inactiveElems;
    const newElem = [a, elem, b];
    cards.innerHTML = "";
    newElem.forEach((elem) => cards.insertAdjacentElement("beforeend", elem));
  });
  
  const convertToDate = (today) => {
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yy = today.getFullYear();
    today = dd + "/" + mm + "/" + yy;
    return today;
  };
  
  const displayCards = (amount, type, parent, date) => {
    const html = `<div class="main__method-card">
    Rs. ${amount} ${type} Dated : ${convertToDate(date)}
    </div>`;
  
    parent.insertAdjacentHTML("afterbegin", html);
  };
  
  depositButton.addEventListener("click", function () {
    displayCards(depositInput.value, "deposit", depositCards, new Date());
    depositInput.value = "";
  });
  
  withdrawButton.addEventListener("click", function () {
    displayCards(withdrawInput.value, "withdraw", withdrawCards, new Date());
    withdrawInput.value = "";
  });
  
  depositSort.addEventListener("click", function () {
    AccountHolder.deposits.sort();
    displayCards.innerHTML = "";
  });
  
  inputName.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      let user = inputName.value;
      inputName.value = "";
      heading.innerHTML = `Welcome to our Bank ${user} `;
      for(i in customer){
        if(user === customer[i].name){
          var total_balance = calc_bal(transaction[i]);
          acc_name.innerHTML = `Name: ${customer[i].name}`;
          acc_no.innerHTML = `Account No: ${customer[i].account_No}`;
          acc_type.innerHTML = `Type: ${customer[i].type}`;
      }
        else{
        acc_name.innerHTML = "Don't have any account with this name";
        }
    }
    
function calc_bal(transaction_arr){
  var total_balance = 0;
  for(i in transaction_arr.amount){
    total_balance += transaction_arr.amount[i][0];
  }
  return total_balance;
}
      const userdata = customer.filter((elem) => elem.name == user);
      const transferData = userdata[0].transaction;
      console.log(userdata);
      let depositAmount = 0;
      let withdrawlAmount = 0;
      let depositArray = [];
      let withdrawArray = [];
      transferData.forEach((elem) => {
        if (elem[0] > 0) {
          depositAmount += elem[0];
          displayCards(elem[0], "deposit", depositCards, elem[1]);
          depositArray.push(elem);
          total_balance += elem[0];
        } else {
          withdrawlAmount += elem[0] * -1;
          displayCards(elem[0] * -1, "withdraw", withdrawCards, elem[1]);
          withdrawArray.push(elem[0]);
          total_balance += elem[0];
        }
      });
      userdata.withdraws = withdrawArray;
      userdata.deposits = depositArray;
      console.log(userdata);
      AccountHolder = userdata;
      depositPalet.innerHTML = "Rs" + " " + String(depositAmount);
      withdrawPalet.innerHTML = "Rs" + " " + withdrawlAmount;
      balance.innerHTML = `Balance: ${total_balance}`;
    }
  });