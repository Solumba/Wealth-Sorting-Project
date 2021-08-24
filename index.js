const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionaireButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");

const nameHolder = document.querySelector("#main h2");
const netWorthHolder = document.querySelector("#main span");
const mainElement = document.querySelector("#main");

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

const doubleMoney = () => {
    data = data.map((user) => {
       return {...user,  netWorth : user.netWorth * 2};
   });

   updateUsers();
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

getRandomUser();
getRandomUser();
getRandomUser();



//Evebt Listeners
addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener('click', doubleMoney);
