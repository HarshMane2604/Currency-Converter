const baseURL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for (let select of dropdown) {
  for (let currCode in countryList) {
    // console.log(code, countryList[code]);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected"
    }
    if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected"
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    if (amt) { // Check if the element exists
        let amtValue = amt.value.trim(); // Use trim to remove leading/trailing spaces
        if(amtValue === "" || amtValue < 1){
            amtValue = 1;
            amt.value = "1"; 
        }
        console.log(amtValue || "Input is empty"); // Handle empty input
    } else {
        console.error("Input element not found");
    }
const fromCurr = document.querySelector(".from select").value;
    const URL = `${baseURL}/${fromCurr}.json`
    console.log(URL);
});

// const toCurr = document.querySelector(".to select").value;
// const amount = document.querySelector(".amount input").value;

// fetch(`${baseURL}/${fromCurr}`)
//     .then(response => response.json())
//     .then(data => {
//         const rate = data.rates[toCurr];
//         const convertedAmount = (amount * rate).toFixed(2);
//         document.querySelector(".result").innerText = `${amount} ${fromCurr} = ${convertedAmount} ${toCurr}`;
//     })
//     .catch(error => console.error("Error fetching data:", error));