<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";

export default {
  name: "categories-view",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCathegories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories[index].name = category.name;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    },
  },
  components: { CategoryCreate, CategoryEdit },
};
</script>
