<template>
  <form id="form" class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: v$.email.$errors.length,
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-show="v$.email.$errors.length"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          autocomplete="on"
          v-model.trim="password"
          :class="{
            invalid: v$.password.$errors.length,
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-show="v$.password.$errors.length"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import messages from "@/utils/messages";

export default {
  name: "login-view",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
    };
  },
  mounted() {
    if (messages[this.$route.query.message])
      this.$message(messages[this.$route.query.message]);
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
