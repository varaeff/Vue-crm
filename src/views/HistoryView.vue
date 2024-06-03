<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">Записей не найдено</p>

    <section v-else>
      <historyTable :records="items" :prevRecords="(page - 1) * pageSize" />
      <paginate
        class="center"
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'Назад'"
        :nextText="'Вперед'"
        :containerClass="'pagination'"
        :page-class="'waves-effect'"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable.vue";
import { Chart } from "chart.js/auto";

export default {
  name: "history-view",
  mixins: [paginationMixin],
  components: { HistoryTable },
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    const categories = await this.$store.dispatch("fetchCathegories");
    this.records = await this.$store.dispatch("fetchRecords");

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((rec) => {
          return {
            ...rec,
            categoryName: categories.find((cat) => cat.id === rec.categoryId)
              .name,
            typeClacc: rec.type === "income" ? "green" : "red",
            typeName: rec.type === "income" ? "Доход" : "Расход",
          };
        })
      );
      new Chart(this.$refs.canvas, {
        type: "pie",
        data: {
          labels: categories.map((cat) => cat.name),
          datasets: [
            {
              label: "Расходы по категориям",
              data: categories.map((cat) => {
                return this.records.reduce((total, rec) => {
                  if (rec.categoryId === cat.id && rec.type === "outcome")
                    total += +rec.amount;
                  return total;
                }, 0);
              }),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
};
</script>
