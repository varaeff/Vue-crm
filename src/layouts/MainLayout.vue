<template>
  <div class="app-main-layout">
    <NavbarComponent @hide="isOpen = !isOpen" />
    <SidebarComponent :class="{ open: isOpen }" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/app/NavbarComponent.vue";
import SidebarComponent from "@/components/app/SidebarComponent.vue";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
  }),
  components: { NavbarComponent, SidebarComponent },
};
</script>
