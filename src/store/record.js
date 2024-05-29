import { getDatabase, ref, push, child, update } from "firebase/database";

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
  },
};
