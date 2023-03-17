import { dataApi } from "./data.js";

const contentFirstRow = document.getElementById("firstTable");
let uniqueEvents = getUniqueEvents(dataApi);


function getUniqueEvents(info) {
  let uniqueEvents = [];
  info.events.forEach((event) => {
    if (!uniqueEvents.includes(event.category)) {
      uniqueEvents.push(event.category);
    }
  });
  return uniqueEvents;
}

// Logica primer tabla
function setFirstTableRow(info) {
  contentFirstRow.innerHTML = "";
  info.forEach((element ,index) => {
    let row = document.createElement("td");
    if (index + 1 == info.length){
        row.innerHTML = 
        `<td>${element.event} - ${element.capacity}</td>`;
    } else {
        row.innerHTML = 
        `<td>${element.event} - ${element.percentage}%</td>`;
    }
    contentFirstRow.appendChild(row);
  });
}

function getDataFirstTable(info) {
  // console.log(dataApi)
  let porcentajes = [];
  let results = [];

  info.events.forEach((element) => {
    let capacity = element.capacity;
    let count = 0;

    if (element.date < info.currentDate) {
      let assistance = element.assistance;
      count = (assistance * 100) / capacity;
      porcentajes.push({
        event: element.name,
        percentage: count,
        capacity: element.capacity,
      });
    } else {
      let estimate = element.estimate;
      count = (estimate * 100) / capacity;
      porcentajes.push({
        event: element.name,
        percentage: count,
        capacity: element.capacity,
      });
    }
  });

  porcentajes = porcentajes.sort((a, b) => {
    if (a.percentage == b.percentage) {
      return 0;
    }
    if (a.percentage < b.percentage) {
      return -1;
    }
    return 1;
  });

  results.push(porcentajes[porcentajes.length - 1]);
  results.push(porcentajes[0]);

  porcentajes = porcentajes.sort((a, b) => {
    if (a.capacity == b.capacity) {
      return 0;
    }
    if (a.capacity > b.capacity) {
      return -1;
    }
    return 1;
  });
  
  results.push(porcentajes[0])
  return results
}

let infoForFirstData = getDataFirstTable(dataApi)
setFirstTableRow(infoForFirstData)
// Logica Segunda tabla

