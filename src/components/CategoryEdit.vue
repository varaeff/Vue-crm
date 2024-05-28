<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{
              invalid: v$.name.$errors.length,
            }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.name.$errors.length"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{
              invalid: v$.limit.$errors.length,
            }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="v$.limit.$errors.length"
            >Минимальный бюджет категории - 100 рублей</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "category-edit",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    select: null,
    name: "",
    limit: 100,
    current: null,
  }),
  created() {
    const { id, name, limit } = this.categories[0];
    this.current = id;
    this.name = name;
    this.limit = limit;
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  watch: {
    current(value) {
      const { name, limit } = this.categories.find((cat) => cat.id === value);
      this.name = name;
      this.limit = limit;
    },
  },
  validations() {
    return {
      name: { required, minLength: minLength(1) },
      limit: { required, minValue: minValue(100) },
    };
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const categoryData = {
        id: this.current,
        name: this.name,
        limit: this.limit,
      };
      try {
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория обновлена");
        this.$emit("updated", categoryData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  unmounted() {
    if (this.select && this.select.destroy) this.select.destroy();
  },
};
</script>
