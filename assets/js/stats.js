import { dataApi } from "./data.js";

const contentFirstRow = document.getElementById("firstTable");
const contentSecondRow = document.getElementById("secondTable");
const contentThreeRow = document.getElementById("threeTable");
let uniqueEvents = getUniqueEvents(dataApi);

function getUniqueEvents(info, past) {
  let uniqueEvents = [];

  info.events.forEach((event) => {
    if (past) {
      if (info.currentDate > event.date) {
        if (!uniqueEvents.includes(event.category)) {
          uniqueEvents.push(event.category);
        }
      }
    } else {
      if (info.currentDate < event.date) {
        if (!uniqueEvents.includes(event.category)) {
          uniqueEvents.push(event.category);
        }
      }
    }
  });
  return uniqueEvents;
}

// Logica primer tabla
function setFirstTableRow(info) {
  contentFirstRow.innerHTML = "";
  info.forEach((element, index) => {
    let row = document.createElement("td");
    if (index + 1 == info.length) {
      row.innerHTML = `<td>${element.event} - ${element.capacity}</td>`;
    } else {
      row.innerHTML = `<td>${element.event} - ${element.percentage}%</td>`;
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

  results.push(porcentajes[0]);
  return results;
}

let infoForFirstData = getDataFirstTable(dataApi);
setFirstTableRow(infoForFirstData);

// Logica Segunda tabla
function setSecondTableRow(info) {
  contentSecondRow.innerHTML = "";
  info.forEach((element) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${element.category}</td>
    <td>${element.revenues}</td>
    <td>${element.percentage}%</td>
    `;
    contentSecondRow.appendChild(row);
  });
}

function updateEventSecond(element, result) {
  let updateResult = result;
  for (let i of result) {
    if (element.category == i.category) {
      i.capacity += element.capacity;
      i.estimate += element.estimate;
      i.price = element.price;
    }
  }
  return updateResult;
}

function getDataSecondTable(info) {
  let result = [];
  let reduceEvents = [];
  let uniqueEvents = getUniqueEvents(info, false);

  for (let i in uniqueEvents) {
    reduceEvents.push({
      category: uniqueEvents[i],
      capacity: 0,
      estimate: 0,
      price: 0,
    });
  }

  info.events.forEach((element) => {
    if (element.date > info.currentDate) {
      reduceEvents = updateEventSecond(element, reduceEvents);
    }
  });

  for (let event of reduceEvents) {
    let revenuesCount = event.price * event.estimate;
    let percentageCount = (event.estimate * 100) / event.capacity;
    result.push({
      category: event.category,
      revenues: revenuesCount,
      percentage: percentageCount,
    });
  }

  return result;
}

let infoForSecondData = getDataSecondTable(dataApi);
setSecondTableRow(infoForSecondData);

// Logica Tercer tabla
function setThreeTableRow(info) {
  contentThreeRow.innerHTML = "";
  info.forEach((element) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${element.category}</td>
    <td>${element.revenues}</td>
    <td>${element.percentage}%</td>
    `;
    contentThreeRow.appendChild(row);
  });
}

function updateEventThree(element, result) {
  let updateResult = result;
  for (let i of result) {
    if (element.category == i.category) {
      i.capacity += element.capacity;
      i.assistance += element.assistance;
      i.price = element.price;
    }
  }
  return updateResult;
}

function getDataThreeTable(info) {
  let result = [];
  let reduceEvents = [];
  let uniqueEvents = getUniqueEvents(info, true);

  for (let i in uniqueEvents) {
    reduceEvents.push({
      category: uniqueEvents[i],
      capacity: 0,
      assistance: 0,
      price: 0,
    });
  }

  info.events.forEach((element) => {
    if (element.date < info.currentDate) {
      reduceEvents = updateEventThree(element, reduceEvents);
    }
  });

  for (let event of reduceEvents) {
    let revenuesCount = event.price * event.assistance;
    let percentageCount = (event.assistance * 100) / event.capacity;
    result.push({
      category: event.category,
      revenues: revenuesCount,
      percentage: percentageCount,
    });
  }
  return result;
}

let infoForThreeData = getDataThreeTable(dataApi);
setThreeTableRow(infoForThreeData);
