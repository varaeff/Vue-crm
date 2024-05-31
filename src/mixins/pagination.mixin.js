import _ from "lodash";

export default {
  data: () => ({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    allItems: [],
    items: [],
  }),
  mounted() {
    this.page = +this.$route.query.page || 1;
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    pageChangeHandler(pageNum) {
      this.$router.push(`${this.$route.path}?page=${this.page}`);
      this.items = this.allItems[pageNum - 1] || this.allItems[0];
    },
  },
};
