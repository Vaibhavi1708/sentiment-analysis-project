<template>
  <div class="mt-5 ml-0">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3" class="mycontent-left">
          <div>
            <h1 class="text-left mt-2">Filters</h1>

            <hr />
            <h5 class="mt-3 font-weight-bold text-left">Brands :</h5>

            <b-form-group v-slot="{ ariaDescribedby }" class="mt-3 text-left">
              <b-form-checkbox-group
                v-model="selected_brands"
                :options="brandName"
                value-field="id"
                text-field="name"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>

            <hr />

            <h5 class="mt-3 font-weight-bold text-left">Price:</h5>

            <b-form-group class="mt-3 text-left" v-slot="{ ariaDescribedby }">
              <b-form-radio
                v-model="selectedPrice"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="1"
                >Under 10,000</b-form-radio
              >
              <b-form-radio
                v-model="selectedPrice"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="2"
                >10,000 - 20,000</b-form-radio
              >
              <b-form-radio
                v-model="selectedPrice"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="3"
                >20,000 - 30,000</b-form-radio
              >
              <b-form-radio
                v-model="selectedPrice"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="4"
                >30,000 - 40,000</b-form-radio
              >
              <b-form-radio
                v-model="selectedPrice"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="5"
                >Over 40,000</b-form-radio
              >
            </b-form-group>
            <hr />
            <label
              for="rating-md-no-border"
              class="mt-2 font-weight-bold text-left"
              >Avg. Customer reviews
            </label>
            <b-form-rating
              id="rating-md-no-border"
              v-model="value"
              variant="warning"
              no-border
            ></b-form-rating>

            <hr />
            <b-button href="#" variant="primary"
              >Apply Filter</b-button
            >
          </div>
        </b-col>

        <b-col>
          <b-row>
            <b-col
              cols="12"
              sm="4"
              class="my-1"
              :key="index"
              v-for="(product, index) in paginatedItems"
            >
              <b-card
                :name="product.name"
                :brand_name="product.brand_name"
                :price="product.price"
                :overall_rating="product.overall_rating"
                :key="index"
                :title="product.name"
                :img-src="require('../images/mobile.jpeg')"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
              >
                <b-card-text>
                  <b-row class=" text-left">
                    <b-col class="font-weight-bold">Brand: </b-col>
                    <b-col>{{ product.brand_name }}</b-col>
                  </b-row>
                  <b-row v-if="product.overall_rating" class=" text-left">
                    <b-col class="font-weight-bold">Rating: </b-col>
                    <b-col> {{ product.overall_rating }}</b-col>
                  </b-row>
                  <b-row class=" text-left">
                    <b-col class="font-weight-bold">Price: </b-col>
                    <b-col> {{ product.price }}</b-col>
                  </b-row>
                </b-card-text>

                <b-button
                  href="#"
                  variant="primary"
                  @click="showDetails(product.id)"
                  >Details</b-button
                >
              </b-card>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-col md="6" class="my-1">
              <b-pagination
                @change="onPageChanged"
                :total-rows="rows"
                :per-page="perPage"
                v-model="currentPage"
                class="my-0"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import {
  getAllProducts,
  getAllBrands,
} from "../services/productService";

export default {
  data() {
    return {
      products: [],
      value: null,
      paginatedItems: this.products,
      currentPage: 1,
      perPage: 6,
      selectedPrice: "",
      selected_brands: [],
      brandName: []
    };
  },
  computed: {
    rows() {
      return this.products.length;
    }
  },

  methods: {
    paginate(page_size, page_number) {
      let itemsToParse = this.products;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },

    async getAllProducts() {
      const response = await getAllProducts();
      this.products = response.data;
    },
    async getAllBrands() {
      const response = await getAllBrands();
      this.brandName = response.data;
    },

    showDetails(prod_id) {
      this.$router.push({
        name: "ProductDetails",
        params: { prod_id }
      });
    }
  },

  name: "ProductList",
  components: {},
  async mounted() {
    await this.getAllProducts();
    await this.getAllBrands();
    await this.paginate(this.perPage, 0);
  }
};
</script>
<style>
.mycontent-left {
  border-right: 1px solid #333;
  background-color: azure;
}
.cols_deck {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.card {
  min-width: 25%;
}
</style>
