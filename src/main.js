import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import messagePlugin from "@/utils/messagePlugin";
import localize from "@/utils/localize";
import LoaderComponent from "./components/app/LoaderComponent.vue";
import Paginate from "vuejs-paginate-next";
import { createMetaManager } from "vue-meta";

import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import tooltipDirective from "@/directives/tooltip.directive";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
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
      .use(createMetaManager())
      .component("Loader", LoaderComponent)
      .component("Paginate", Paginate)
      .directive("tooltip", tooltipDirective);

    app.config.globalProperties.$localize = localize;
    app.mount("#app");
  }
});
