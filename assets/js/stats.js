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
    console.log(this.statsSecondTable)
  },
  mounted() {

  },
  methods: {
    getData() {
      this.getDataFirstTable(dataApi)
      this.getDataSecondTable(dataApi)
      this.getDataThirdTable(dataApi)
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

    getDataSecondTable(data) {
      let categories = []
      data.events.forEach(element => {
        if (element.date > data.currentDate) {
          if (!categories.includes(element.category)) {
            categories.push(element.category)
          }
        }
      })

      console.log(categories)

      categories.forEach((categorie) => {
        this.statsSecondTable.push({
          category: categorie,
          revenues: 0,
          percentage: 0,
          cantCategory: 0,
        });
      });

      data.events.forEach((element) => {
        if (element.date > data.currentDate) {
          // reduceEvents = updateEventSecond(element, reduceEvents);
          let revenuesCount = element.price * element.estimate;
          let percentageCount = (element.estimate * 100) / element.capacity;
          this.statsSecondTable.forEach((item) => {
            if (element.category == item.category) {
              item.revenues += revenuesCount;
              item.percentage += percentageCount;
              item.cantCategory += 1;
            }
          });
        }
      });

      this.statsSecondTable.forEach((item) => {
        item.percentage = (item.percentage / item.cantCategory).toFixed(2);
      });
    },

    getDataThirdTable(data) {
      let categories = []
      data.events.forEach(element => {
        if (element.date < data.currentDate) {
          if (!categories.includes(element.category)) {
            categories.push(element.category)
          }
        }
      })

      categories.forEach((categorie) => {
        this.statsThreeTable.push({
          category: categorie,
          revenues: 0,
          percentage: 0,
          cantCategory: 0,
        });
      });

      data.events.forEach((element) => {
        if (element.date < data.currentDate) {
          let revenuesCount = element.price * element.assistance;
          let percentageCount = (element.assistance * 100) / element.capacity;

          this.statsThreeTable.forEach((item) => {
            if (element.category == item.category) {
              item.revenues += revenuesCount;
              item.percentage += percentageCount;
              item.cantCategory += 1;
            }
          });
        }
      });

      this.statsThreeTable.forEach((item) => {
        item.percentage = (item.percentage / item.cantCategory).toFixed(2);
      });

    },
    computed: {

    },
  }
}).mount('#app')

