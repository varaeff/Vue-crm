import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import fetchCurrency from "@/utils/fetchCurrency";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    fetchCurrency,
  },
  modules: {
    auth,
    info,
    category,
  },
});
