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

function getDataSecondTable(info) {
  let result = [];

  info.events.forEach((element) => {
    if (element.date > info.currentDate) {
      // reduceEvents = updateEventSecond(element, reduceEvents);
      let revenuesCount = element.price * element.estimate;
      let percentageCount = (element.estimate * 100) / element.capacity;
      result.push({
        category: element.category,
        capacity: element.capacity,
        estimate: element.estimate,
        price: element.price,
        revenues: revenuesCount,
        percentage: percentageCount,
      });
    }
  });

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

function getDataThreeTable(info) {
  let result = [];
  let categories = getUniqueEvents(info, true);
  console.log(categories);

  categories.forEach((categorie) => {
    result.push({
      // Instanciar todo en cero
    });
    // categorie.reduce((acc, act) => {
    //   acc.categorie = categorie.categorie
    //   acc.revenue += categorie.price * categorie.assistance
    // }, {
    //   category: "",
    //   revenue: 0,
    //   percetage: 0
    // })
  });

  // agarrar las categorias, generar un array de las categorias con todo vacio e ir rellenando con informacion en cada vuelta del foreach de abajo

  info.events.forEach((element) => {
    if (element.date < info.currentDate) {
      let revenuesCount = element.price * element.assistance;
      let percentageCount = (element.assistance * 100) / element.capacity;
      // Hacer un foreach de result y ver si coincide con la categoria y rellenar de informacion
      result.push({
        category: element.category,
        revenues: revenuesCount,
        capacity: element.capacity,
        assistance: element.assistance,
        price: element.price,
        percentage: percentageCount,
      });
    }
  });

  return result;
}

let infoForThreeData = getDataThreeTable(dataApi);
setThreeTableRow(infoForThreeData);
