<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">Записей не найдено</p>

    <section v-else>
      <historyTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
export default {
  name: "history-view",
  components: { HistoryTable },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCathegiries");
    const records = await this.$store.dispatch("fetchRecords");

    this.records = records.map((rec) => {
      return {
        ...rec,
        categoryName: this.categories.find((cat) => cat.id === rec.categoryId)
          .name,
        typeClacc: rec.type === "income" ? "green" : "red",
        typeName: rec.type === "income" ? "Доход" : "Расход",
      };
    });
    this.loading = false;
  },
};
</script>
