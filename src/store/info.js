import { getDatabase, ref, child, get, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");
        const dbRef = ref(getDatabase());
        const info = await get(child(dbRef, `users/${uid}/info`)).then(
          (snapshot) => {
            if (snapshot.exists()) {
              return snapshot.val();
            } else {
              return null;
            }
          }
        );
        commit("setInfo", info);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUserId");
        const dbRef = ref(getDatabase());
        const updateData = { ...getters.info, ...toUpdate };
        const updates = {};
        updates[`users/${uid}/info`] = updateData;
        update(dbRef, updates);
        commit("setInfo", updateData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
