const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionaireButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");

const mainElement = document.querySelector("#main");
const totalWealthElem = document.querySelector("#total-wealth");
console.log(totalWealthElem)

let data = [];

const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    netWorth: Math.floor(Math.random() * 1000000.00),
  };

  addData(newUser);
};

//map method returns a new array

const doubleMoney = () => {
    data = data.map((user) => {
       return {...user,  netWorth : user.netWorth * 2};
   });

   updateUsers();
}

// sort returns a new array and makes use of a compare function
const sortWealth = () => {
    data = data.sort((a, b) => {
        return b.netWorth - a.netWorth;
    })
    updateUsers();
}

// filter returns a new array 

const showMillionaires = () => {
    data = data.filter((user) => {
        return user.netWorth >= 1000000 && user.netWorth <= 999000000;
    })
    updateUsers();
}

//calculate total wealth
const calculateTotalWealth = () => {
    
    let totalWealth = data.reduce((acc, user) => (
        acc += user.netWorth), 0);
        totalWealthElem.innerHTML = `Total Wealth &equals; ${formatMoneyAsDollar(totalWealth)}</div>`;
}

const addData = (obj) => {
  data.push(obj);
  updateUsers();
};

//update DOM
const updateUsers = () => {
  mainElement.innerHTML = "<h2>Person <span>Wealth</span></h2>";

  data.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `<h2>${user.name} <span>${formatMoneyAsDollar(
      user.netWorth
    )}</span></h2>`;
    mainElement.appendChild(userDiv);
  });
};

const formatMoneyAsDollar = (number) => {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return "$" + dollarUSLocale.format(number);
};

// to get 3 random users to start with
getRandomUser();
getRandomUser();
getRandomUser();



//Evebt Listeners
addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener('click', doubleMoney);
sortButton.addEventListener('click', sortWealth);
showMillionaireButton.addEventListener('click', showMillionaires);
calculateWealthButton.addEventListener('click', calculateTotalWealth);
