<template>
  <div>
    <div class="page-title">
      <h3>{{ $localize("ProfileTitle") }}</h3>
    </div>

    <form id="form" class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: v$.name.$errors.length,
          }"
        />
        <label for="description">{{ $localize("name") }}</label>
        <span
          class="helper-text invalid"
          v-show="v$.name.$errors.length"
          v-for="(error, index) of v$.name.$errors"
          :key="index"
          >{{ error.$message }}</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $localize("update") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    name: "",
    isRuLocale: true,
  }),
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-RU";
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });
  },
  validations() {
    return {
      name: { required, minLength: minLength(6) },
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        name: this.name,
        locale: this.isRuLocale ? "ru-RU" : "en-US",
      };
      try {
        await this.$store.dispatch("updateInfo", formData);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
