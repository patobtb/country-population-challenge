const p = require("bluebird");
// import * as p from "bluebird";

// function getCountryPopulation(country) {
//   return new Promise((resolve, reject) => {
//     const url = `https://countriesnow.space/api/v0.1/countries/population`;
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ country }),
//     };
//     fetch(url, options)
//       .then((res) => res.json())
//       .then((json) => {
//         if (json?.data?.populationCounts)
//           resolve(json.data.populationCounts.at(-1).value);
//         else reject(new Error(`My Error: no data for ${country}`)); //app logic error message
//       })
//       .catch((err) => reject(err)); // network error - server is down for example...
//     // .catch(reject)  // same same, only shorter...
//   });
// }
async function getCountryPopulation(country) {
try{
  const url = `https://countriesnow.space/api/v0.1/countries/population`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country }),
    };
    const res = await fetch(url, options);
    const json = await res.json();
  
    
      if (json?.data?.populationCounts)
        return json.data.populationCounts.at(-1).value;
      else throw new Error(`My Error: no data for ${country}`); //app logic error message
} catch(err){
  console.error("Error!!")
}
 
  
}

//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------

async function manual() {
  try{
    let population = await getCountryPopulation("France")
    console.log(`population of France is ${population}`);
    population = await getCountryPopulation("Germany");
    console.log(`population of Germany is ${population}`)
    
  }
  catch(err){
    console.log("Error in manual: ", err.message);
  }
}
// manual()

//------------------------------
//   Sequential processing
//------------------------------
const countries = [
  "France",
  "Russia",
  "Germany",
  "United Kingdom",
  "Portugal",
  "Spain",
  "Netherlands",
  "Sweden",
  "Greece",
  "Czechia",
  "Romania",
  "Israel",
];

async function sequence() {
  try{
    for(let country of countries){
      let population = await getCountryPopulation(country)
      console.log(`The population of ${country} is ${population}`);
    }
    console.log("All done");
  }catch(err){
    console.log("Error in sequence: ", err.message);
  };
};

// sequence();




//--------------------------------------------------------
//  Parallel processing
//--------------------------------------------------------

async function parallel() {
  try{
    let newCountries = [];

    for(let country of countries){
      let population = await getCountryPopulation(country);
      newCountries.push(`The population of ${country} is ${population}`)
    }
    console.log(newCountries);
    console.log("All done");

  }
  catch(err){
    console.log("Error in parallel: ", err.message)
  };
}
parallel();