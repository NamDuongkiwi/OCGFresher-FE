<template>
  <div class="leftbar p-r-20 p-r-0-sm">
    <!--  -->
    <h4 class="m-text14 p-b-7">Categories</h4>

    <ul class="p-b-54 categories">
      <li class="p-t-4">
        <a
          href="#"
          @click="filterProductsByCategory($event, {})"
          class="s-text13"
          :class="{ active: !category.id }"
          >All</a
        >
      </li>
      <li class="p-t-4" v-for="cat in categories" :key="cat.id">
        <a
          href="#"
          
          class="s-text13"
          :class="{ active: cat.id === category.id }"
          @click="filterProductsByCategory($event, cat)"
          >{{ cat.category_name }}</a
        >
      </li>
    </ul>

    <h4 class="m-text14 p-b-32">Filters</h4>

    <div class="filter-price p-t-22 p-b-50 bo3">
      <div class="m-text15 p-b-17">Price</div>

      <div class="wra-filter-bar">
        <VueSlider
          v-model="priceRange"
          :min="50"
          :max="200"
          tooltip="none"
          :dotOptions="{
            style: {
              backgroundColor: '#999999',
              boxShadow: 'none',
            },
            focusStyle: {
              backgroundColor: '#999999',
              boxShadow: 'none',
            },
          }"
          :railStyle="{ backgroundColor: '#e1e1e1' }"
          :processStyle="{ backgroundColor: '#c5c5c5' }"
        />
      </div>

      <div class="flex-sb-m flex-w p-t-16">
        <div class="w-size11">
          <!-- Button -->
          <button class="flex-c-m size4 bg7 bo-rad-15 hov1 s-text14 trans-0-4">
            Filter
          </button>
        </div>

        <div class="s-text3 p-t-10 p-b-10">Range: {{ priceRangeDisplay }}</div>
      </div>
    </div>

    <div class="filter-color p-t-22 p-b-50 bo3">
      <Select2
                    :options="[
                      { value: 'id-desc', label: 'Default Sorting' },
                      { value: 'price-asc', label: 'Price: low to high' },
                      { value: 'price-desc', label: 'Price: high to low' },
                    ]"
                    :value="sortDropdownValue"
                    @change="sortProducts"
                  />
    </div>

    <div class="search-product pos-relative bo4 of-hidden">
      <input
        class="s-text7 size6 p-l-23 p-r-50"
        type="text"
        placeholder="Search Products..."
        v-model="searchKeyword"
        @keypress.enter="searchProducts"
      />

      <button
        class="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4"
        @click="searchProducts"
      >
        <i class="fs-12 fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueSlider from "vue-slider-component";
import Select2 from "@/components/Select2.vue";
import "vue-slider-component/theme/default.css";

export default {
  name: "LeftBar",
  components: {
    VueSlider,
    Select2
  },
  data() {
    return {
      priceRange: [50, 200],
      searchKeyword: "",
    };
  },
  computed: {
    priceRangeDisplay() {
      const prices = this.priceRange;
      return `$${prices[0]} - $${prices[1]}`;
    },
    ...mapState("products", ["search", "categories", "category"]),
  },
  created() {
    this.searchKeyword = this.search;
    this.$store.dispatch("products/getCategories");
  },
  methods: {
    filterProductsByCategory(event, category) {
      event.preventDefault();
      //console.log(category)
      this.$store.dispatch("products/getProducts", {
        pageIndex: 1,
        category,
      });
    },
    searchProducts() {
      this.$store.dispatch("products/getProducts", {
        pageIndex: 1,
        search: this.searchKeyword,
      });
    },
  },
};
</script>

<style scoped>
.categories .active {
  color: #e65540;
}
.wra-filter-bar {
  margin: 0 6px;
}
</style>