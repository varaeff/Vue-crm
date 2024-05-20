<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span>{{ curFormat(getCurrency(cur), cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data: () => ({
    currencies: ["rub", "gel", "eur", "usd", "gbp"],
  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["rub"] / this.rates["usd"])
      );
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
    curFormat(amount, currency) {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency,
      }).format(amount);
    },
  },
};
</script>
