<template>
  <ul class="sidenav app-sidenav">
    <router-link
      v-for="link in links"
      :key="link.title"
      :to="link.url"
      :exact="link.exact"
      v-slot="{ href, isActive }"
    >
      <li :class="{ active: isActive }">
        <a :href="href" class="waves-effect waves-orange pointer">{{
          link.title
        }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: this.$localize("AccountTitle"),
          url: "/",
          exact: true,
        },
        {
          title: this.$localize("HistoryTitle"),
          url: "/history",
        },
        {
          title: this.$localize("PlanningTitle"),
          url: "/planning",
        },
        {
          title: this.$localize("NewRecordTitle"),
          url: "/record",
        },
        {
          title: this.$localize("CategoriesTitle"),
          url: "/categories",
        },
      ],
    };
  },
};
</script>
