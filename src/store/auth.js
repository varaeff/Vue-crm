import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async register({ commit }, { email, password, name }) {
      try {
        const auth = getAuth();
        const database = getDatabase();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = auth.currentUser.uid;
        await set(ref(database, `users/${uid}/info`), {
          bill: 10000,
          name,
        });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async logout() {
      const auth = getAuth();
      await signOut(auth);
    },
  },
};
