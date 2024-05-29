<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">Не найдено категорий</p>

    <form v-else id="form" class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select id="select" ref="select" v-model="category">
          <option v-for="cat of categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <label for="select">Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid: v$.amount.$errors.length,
          }"
        />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="v$.amount.$errors.length"
          >Минимальная сумма - 100 рублей</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: v$.description.$errors.length,
          }"
        />
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="v$.description.$errors.length"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";

export default {
  name: "record-view",
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: "outcome",
    amount: 100,
    description: "",
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCathegiries");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select);
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },
  validations() {
    return {
      description: { required, minLength: minLength(1) },
      amount: { required, minValue: minValue(100) },
    };
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") return true;
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Добавлена новая запись");
          this.v$.$reset();
          this.amount = 100;
          this.description = "";
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.info.bill - this.amount}₽)`
        );
      }
    },
  },
  unmounted() {
    if (this.select && this.select.destroy) this.select.destroy();
  },
};
</script>
