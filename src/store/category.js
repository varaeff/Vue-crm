import { getDatabase, ref, push, child, update, get } from "firebase/database";

export default {
  actions: {
    async fetchCathegiries({ commit, dispatch }) {
      try {
        const database = getDatabase();
        const uid = await dispatch("getUserId");
        const categories =
          (await get(child(ref(database), `users/${uid}/categories`))).val() ||
          {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { name, limit }) {
      try {
        const database = getDatabase();
        const uid = await dispatch("getUserId");
        const categoryKey = push(
          child(ref(database), `users/${uid}/categories`)
        ).key;
        const updates = {};
        updates[`users/${uid}/categories/${categoryKey}`] = {
          name,
          limit,
        };
        update(ref(database), updates);

        return { name, limit, id: categoryKey };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { id, name, limit }) {
      try {
        const database = getDatabase();
        const uid = await dispatch("getUserId");
        // child(ref(database), `users/${uid}/categories`)
        const updates = {};
        updates[`users/${uid}/categories/${id}`] = {
          name,
          limit,
        };
        update(ref(database), updates);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
