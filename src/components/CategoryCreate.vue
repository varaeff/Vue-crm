<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form id="form" @submit.prevent="submitHandler">
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
          Создать
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
  name: "category-create",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      limit: 100,
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(1) },
      limit: { required, minValue: minValue(100) },
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        name: this.name,
        limit: this.limit,
      };
      try {
        const category = await this.$store.dispatch("createCategory", formData);
        this.name = "";
        this.limit = 100;
        this.v$.$reset();
        this.$message("Категория создана");
        this.$emit("created", category);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
