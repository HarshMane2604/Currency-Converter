const baseURL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
  for (let currCode in countryList) {
    // console.log(code, countryList[code]);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector(".amount input");
  let amtValue = amt.value.trim();

  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amt.value = "1";
  }
  //console.log(fromCurr.value, toCurr.value);

  let fromCountry = fromCurr.value.toLowerCase();
  let toCountry = toCurr.value.toLowerCase();

  const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCountry][toCountry];
  console.log(rate);
  let finalAmt = amtValue * rate;
  console.log(finalAmt);
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  // console.log(data[toCountry]);
});
