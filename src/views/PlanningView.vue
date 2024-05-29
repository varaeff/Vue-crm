<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }}₽</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">Не найдено категорий</p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.name }}</strong>
          {{ cat.spend }}₽ из {{ cat.limit }}₽
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "planning-view",
  data: () => ({
    loading: true,
    categories: [],
  }),
  async mounted() {
    const categories = await this.$store.dispatch("fetchCathegiries");
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((rec) => rec.categoryId === cat.id)
        .filter((rec) => rec.type === "outcome")
        .reduce((acc, curr) => acc + +curr.amount, 0);
      const percent = (spend * 100) / +cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на" : "Осталось"
      } ${Math.abs(tooltipValue)}₽`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
  computed: {
    ...mapGetters(["info"]),
  },
};
</script>
