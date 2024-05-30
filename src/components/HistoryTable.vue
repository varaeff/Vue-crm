<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, index) of records" :key="rec.id">
        <td>{{ index + 1 }}</td>
        <td>{{ rec.amount }}₽</td>
        <td>{{ rec.date.split("T")[0] }}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[rec.typeClacc]">{{
            rec.typeName
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn"
            @click="$router.push(`/detail/${rec.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "history-table",
  props: {
    records: {
      requred: true,
      type: Array,
    },
  },
};
</script>
