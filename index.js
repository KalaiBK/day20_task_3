let airportCardContainer = document.getElementsByClassName("airportCardContainer");


async function getCountries() {
	let response = await fetch("https://restcountries.com/v3.1/all");
	let results = await response.json();

	for (i = 0; i < results.length; i++) {
		displayCountries(results[i].name.official, i, results[i].cca2);
	}
}

getCountries();

function displayCountries(name, i, code) {
	let countries = document.getElementsByClassName("displayCountries");

	let options = document.createElement("option");
	options.setAttribute("value", code);
	options.innerHTML = name;

	if (i == 0) {
		options.setAttribute("selected", true);
		airportsDetails(code);
	}

	countries[0].onchange = function () {
		let displayAirports = document.getElementsByClassName("displayAirports");
		let length = displayAirports[0].options.length;
		for (j = 0; j < length; j++) {
			displayAirports[0].remove(0);
		}
		airportsDetails(this.value);


		// let airportCardContainer = document.getElementsByClassName("airportCardContainer");
	}

	countries[0].appendChild(options);
}

async function airportsDetails(selected) {

	const url = `https://api.api-ninjas.com/v1/airports?country=${selected}`;
	const options = {
		method: 'GET',
		headers: {
			'X-Api-Key': '9a1LDD9mFwPPu650v15mxA==L4dBlQlCgRwnwScn',
		},
		contentType: 'application/json'
	};
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		
		for (i = 0; i < result.length; i++) {
			getAirport(result[i].name,result[i].icao,i);
		}
	} catch (error) {
		console.error(error);
	}

}

function getAirport(airportName,icao,i) {


	let airportsList = document.createElement("option");
	airportsList.innerHTML = airportName;
	airportsList.setAttribute("value",icao);
	
	let displayAirports = document.getElementsByClassName("displayAirports");
	displayAirports[0].appendChild(airportsList);

	// console.log(displayAirports);
	if( i == 0){
		airportsList.setAttribute("selected", true);
		airportCardDetails(icao);
	}


	displayAirports[0].onchange = function(){
		airportCardDetails(this.value);
	}


}

async function airportCardDetails(code) {
	console.log(code)
	let airportCardContainer = document.getElementsByClassName("airportCardContainer");
	let childNodes = airportCardContainer[0].childNodes;
	console.log(childNodes);
	for (j = 0; j < childNodes.length; j++) {
		airportCardContainer[0].removeChild(childNodes[j])
		// console.log(airportCardContainer[0]);
	}
	let response = await fetch(`https://airportdb.io/api/v1/airport/${code}?apiToken=12812a188d3d95fbf29a9a45bc7cd1ee317e5bb420600fcec6e2f555a6735cbc698967078fe6e87a8a2524bd4ada936c`);
	let fetchResult = await response.json();
	displayCard(fetchResult.name,fetchResult.type,fetchResult.ident,fetchResult.wikipedia_link)

}

function displayCard(name,type,id,wikipedia_link){
let airportCardContainer = document.getElementsByClassName("airportCardContainer");

let airportCard = document.createElement("div");
airportCard.setAttribute("class","card");

let header = document.createElement("div");
header.setAttribute("class","card-header");
header.innerHTML = name;

let body = document.createElement("div");
body.setAttribute("class","card-body");

let airportType = document.createElement("p");
airportType.innerHTML = `Airport type: ${type}`;

let  airportId = document.createElement("p");
airportId.innerHTML = `Ident:${id}`;

let linkAnchor = document.createElement("a");
linkAnchor.setAttribute("href",wikipedia_link);
linkAnchor.setAttribute("target","_blank");
linkAnchor.innerHTML = "HomeLink";

body.appendChild(airportType);
body.appendChild(airportId);
body.appendChild(linkAnchor);

airportCard.appendChild(header);
airportCard.appendChild(body);

airportCardContainer[0].appendChild(airportCard);

}
