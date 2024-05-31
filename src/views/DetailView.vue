<template>
  <Loader v-if="loading" />
  <div v-else-if="record.description">
    <div class="breadcrumb-wrap">
      <RouterLink to="/history" class="breadcrumb">История</RouterLink>
      <a @click.prevent class="breadcrumb">
        {{ record.type === "outcome" ? "Расход" : "Доход" }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="record.type === 'outcome' ? 'red' : 'green'">
          <div class="card-content white-text">
            <p>Описание: {{ record.description }}</p>
            <p>Сумма: {{ record.amount }}₽</p>
            <p>Категория: {{ category.name }}</p>

            <small>{{ record.date.split("T")[0] }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>
    Записи с id <b>{{ record.id }}</b> не существует
  </p>
</template>

<script>
export default {
  name: "detail-view",
  data: () => ({
    record: null,
    category: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    this.record = await this.$store.dispatch("fetchRecordById", id);
    this.category = await this.$store.dispatch(
      "fetchCathegoryById",
      this.record.categoryId
    );
    this.loading = false;
  },
};
</script>
