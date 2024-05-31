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
      <historyTable :records="items" :prevRecords="(page - 1) * pageSize" />
      <paginate
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
    this.loading = false;
  },
};
</script>
