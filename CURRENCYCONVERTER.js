const Base_URL = "https://v6.exchangerate-api.com/v6/4b7c60ee7daef5e44634fc14/latest"
const dropdown = document.querySelectorAll(".dropdown select")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

const btn = document.querySelector("form button")
for(let select of dropdown){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode
        newOption.value = currcode
        if(select.name==="from"&&currcode==="USD"){
            newOption.selected = "selected"
        }
        else if(select.name==="To"&&currcode==="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)

}
select.addEventListener("change",(evt) =>{
    updateFlag(evt.target)
})
}
const updateExchangeRate =  async ()=>{
    let amount = document.querySelector(".amount input")
    let amtval = amount.value
    if(amtval === ""|| amtval <1){
        amtval = 1;
        amount.value = 1
    }

    
  
      const URL = `${Base_URL}/${fromCurr.value}`;
      let response = await fetch(URL);
      let data = await response.json();

      let rate = data.conversion_rates[toCurr.value];
      console.log(`1 ${fromCurr.value} = ${rate} ${toCurr.value}`);

      let finalAmount = amtval * rate;

      msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag = (element)=>{
    let currcode = element.value
    let countryCode = countryList[currcode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img")
   img.src = newSrc
}

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    

})
window.addEventListener("load",()=>{
    updateExchangeRate()
})

