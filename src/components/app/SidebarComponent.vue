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
  data: () => ({
    links: [
      {
        title: "Счет",
        url: "/",
        exact: true,
      },
      {
        title: "История",
        url: "/history",
      },
      {
        title: "Планирование",
        url: "/planning",
      },
      {
        title: "Новая запись",
        url: "/record",
      },
      {
        title: "Категории",
        url: "/categories",
      },
    ],
  }),
};
</script>
