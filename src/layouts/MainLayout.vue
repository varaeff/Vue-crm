<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <NavbarComponent @hide="isOpen = !isOpen" />
      <SidebarComponent :class="{ open: isOpen }" :key="locale" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip="'Добавить новую запись'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/app/NavbarComponent.vue";
import SidebarComponent from "@/components/app/SidebarComponent.vue";
import messages from "@/utils/messages";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: { NavbarComponent, SidebarComponent },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
};
</script>
