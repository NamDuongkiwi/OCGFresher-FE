import { createStore } from "vuex";

import products from "./modules/products";
import user from "./modules/user";

const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  strict: debug,
  modules: {

    products,
    user,
  },
});

export default store;