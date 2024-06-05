<template>
  <div>
    <div class="page-title">
      <h3>{{ $localize("AccountTitle") }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div class="row" v-else>
      <home-bill :rates="currency.usd" />
      <home-currency :rates="currency.usd" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";
import { useMeta } from "vue-meta";

export default {
  name: "home-view",
  setup() {
    useMeta({ title: "Home" });
  },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
  components: { HomeCurrency, HomeBill },
};
</script>
HomeBill
