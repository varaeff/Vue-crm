import { getDatabase, ref, child, get } from "firebase/database";

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
        console.log(e);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
