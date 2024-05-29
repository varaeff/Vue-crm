import { getDatabase, ref, push, child, update, get } from "firebase/database";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const database = getDatabase();
        const uid = await dispatch("getUserId");
        const recordKey = push(
          child(ref(database), `users/${uid}/records`)
        ).key;
        const updates = {};
        updates[`users/${uid}/records/${recordKey}`] = record;
        update(ref(database), updates);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const database = getDatabase();
        const uid = await dispatch("getUserId");
        const records =
          (await get(child(ref(database), `users/${uid}/records`))).val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
