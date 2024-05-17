<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: v$.name.$errors.length,
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-show="v$.name.$errors.length"
          v-for="(error, index) of v$.name.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "register-view",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(2) },
      agree: { checked: (v) => v },
    };
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
        name: this.name,
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
