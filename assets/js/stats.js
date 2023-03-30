import { dataApi } from './data.js';

const { createApp } = Vue

const app = createApp({
  data() {
    return {
      statsFirstTable: [],
      statsSecondTable: [],
      statsThreeTable: [],
    }
  },
  created() {
    this.getData()
    console.log(this.statsFirstTable)
  },
  mounted() {

  },
  methods: {
    getData() {
      this.getDataFirstTable(dataApi)
      // this.getDataSecondTable(dataApi)
      // this.getDataThirdTable(dataApi)
    },
    
    getDataFirstTable(data) {
      let porcentajes = [];

      data.events.forEach((element) => {
        let count = 0;

        if (element.date < data.currentDate) {
          let assistance = element.assistance;
          count = (assistance * 100) / element.capacity;
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

      this.statsFirstTable.push(porcentajes[porcentajes.length - 1]);
      this.statsFirstTable.push(porcentajes[0]);

      porcentajes = porcentajes.sort((a, b) => {
        if (a.capacity == b.capacity) {
          return 0;
        }
        if (a.capacity > b.capacity) {
          return -1;
        }
        return 1;
      });

      this.statsFirstTable.push(porcentajes[0]);
    },
  },
  computed: {

  },
}).mount('#app')


// const contentFirstRow = document.getElementById("firstTable");
// const contentSecondRow = document.getElementById("secondTable");
// const contentThreeRow = document.getElementById("threeTable");

// function getUniqueEvents(info, past) {
//   let uniqueEvents = [];

//   info.events.forEach((event) => {
//     if (past) {
//       if (info.currentDate > event.date) {
//         if (!uniqueEvents.includes(event.category)) {
//           uniqueEvents.push(event.category);
//         }
//       }
//     } else {
//       if (info.currentDate < event.date) {
//         if (!uniqueEvents.includes(event.category)) {
//           uniqueEvents.push(event.category);
//         }
//       }
//     }
//   });
//   return uniqueEvents;
// }

// // Logica primer tabla
// function setFirstTableRow(info) {
//   contentFirstRow.innerHTML = "";
//   info.forEach((element, index) => {
//     let row = document.createElement("td");
//     if (index + 1 == info.length) {
//       row.innerHTML = `<td>${element.event} - ${element.capacity}</td>`;
//     } else {
//       row.innerHTML = `<td>${element.event} - ${element.percentage}%</td>`;
//     }
//     contentFirstRow.appendChild(row);
//   });
// }

// function getDataFirstTable(info) {
//   // console.log(dataApi)
//   let porcentajes = [];
//   let results = [];

//   info.events.forEach((element) => {
//     let capacity = element.capacity;
//     let count = 0;

//     if (element.date < info.currentDate) {
//       let assistance = element.assistance;
//       count = (assistance * 100) / capacity;
//       porcentajes.push({
//         event: element.name,
//         percentage: count,
//         capacity: element.capacity,
//       });
//     }
//   });

//   porcentajes = porcentajes.sort((a, b) => {
//     if (a.percentage == b.percentage) {
//       return 0;
//     }
//     if (a.percentage < b.percentage) {
//       return -1;
//     }
//     return 1;
//   });

//   results.push(porcentajes[porcentajes.length - 1]);
//   results.push(porcentajes[0]);

//   porcentajes = porcentajes.sort((a, b) => {
//     if (a.capacity == b.capacity) {
//       return 0;
//     }
//     if (a.capacity > b.capacity) {
//       return -1;
//     }
//     return 1;
//   });

//   results.push(porcentajes[0]);
//   return results;
// }

// let infoForFirstData = getDataFirstTable(dataApi);
// setFirstTableRow(infoForFirstData);

// // Logica Segunda tabla
// function setSecondTableRow(info) {
//   contentSecondRow.innerHTML = "";
//   info.forEach((element) => {
//     let row = document.createElement("tr");
//     row.innerHTML = `
//     <td>${element.category}</td>
//     <td>${element.revenues}</td>
//     <td>${element.percentage}%</td>
//     `;
//     contentSecondRow.appendChild(row);
//   });
// }

// function getDataSecondTable(info) {
//   let result = [];
//   let categories = getUniqueEvents(info, false);

//   categories.forEach((categorie) => {
//     result.push({
//       category: categorie,
//       revenues: 0,
//       percentage: 0,
//       cantCategory: 0,
//     });
//   });

//   info.events.forEach((element) => {
//     if (element.date > info.currentDate) {
//       // reduceEvents = updateEventSecond(element, reduceEvents);
//       let revenuesCount = element.price * element.estimate;
//       let percentageCount = (element.estimate * 100) / element.capacity;
//       result.forEach((item) => {
//         if (element.category == item.category) {
//           item.revenues += revenuesCount;
//           item.percentage += percentageCount;
//           item.cantCategory += 1;
//         }
//       });
//     }
//   });

//   result.forEach((item) => {
//     item.percentage = (item.percentage / item.cantCategory).toFixed(2);
//   });

//   return result;
// }

// let infoForSecondData = getDataSecondTable(dataApi);
// setSecondTableRow(infoForSecondData);

// // Logica Tercer tabla
// function setThreeTableRow(info) {
//   contentThreeRow.innerHTML = "";
//   info.forEach((element) => {
//     let row = document.createElement("tr");
//     row.innerHTML = `
//     <td>${element.category}</td>
//     <td>${element.revenues}</td>
//     <td>${element.percentage}%</td>
//     `;
//     contentThreeRow.appendChild(row);
//   });
// }

// function getDataThreeTable(info) {
//   let result = [];
//   let categories = getUniqueEvents(info, true);

//   categories.forEach((categorie) => {
//     result.push({
//       category: categorie,
//       revenues: 0,
//       percentage: 0,
//       cantCategory: 0,
//     });
//   });

//   info.events.forEach((element) => {
//     if (element.date < info.currentDate) {
//       let revenuesCount = element.price * element.assistance;
//       let percentageCount = (element.assistance * 100) / element.capacity;

//       result.forEach((item) => {
//         if (element.category == item.category) {
//           item.revenues += revenuesCount;
//           item.percentage += percentageCount;
//           item.cantCategory += 1;
//         }
//       });
//     }
//   });

//   result.forEach((item) => {
//     item.percentage = (item.percentage / item.cantCategory).toFixed(2);
//   });

//   return result;
// }

// let infoForThreeData = getDataThreeTable(dataApi);
// setThreeTableRow(infoForThreeData);
