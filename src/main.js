import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import messagePlugin from "@/utils/messagePlugin";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAK6IL2iW6hyt43ST5CtEFDpDjTgW950EM",
  authDomain: "vue-crm-3abcc.firebaseapp.com",
  projectId: "vue-crm-3abcc",
  storageBucket: "vue-crm-3abcc.appspot.com",
  messagingSenderId: "1060555092993",
  appId: "1:1060555092993:web:09b47339f4347d0cee3c00",
  measurementId: "G-KDR11WH324",
};

initializeApp(firebaseConfig);

const auth = getAuth();
let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .mount("#app");
  }
});
