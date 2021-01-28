<template>
  <div class="mt-5">
    <b-container class="bv-example-row">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="require('../images/mobile.jpeg')"
              alt="Image"
              class="rounded-0"
              fluid
            ></b-card-img>
          </b-col>
          <b-col md="6" class="text-left mt-3">
            <b-card-body :title="product_details.name">
              <b-card-text>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Brand: </b-col>
                  <b-col>{{ product_details.brand_name }}</b-col>
                </b-row>
                <b-row
                  v-if="product_details.overall_rating"
                  class=" text-left pt-2"
                >
                  <b-col class="font-weight-bold" cols="3">Rating: </b-col>
                  <b-col>{{ product_details.overall_rating }}</b-col>
                </b-row>
                <b-row
                  v-if="product_details.internal_memory"
                  class=" text-left pt-2"
                >
                  <b-col class="font-weight-bold" cols="3">Memory: </b-col>
                  <b-col> {{ product_details.internal_memory }}</b-col>
                </b-row>
                <b-row v-if="product_details.battery" class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Battery: </b-col>
                  <b-col>{{ product_details.battery }}</b-col>
                </b-row>
                <b-row v-if="product_details.cpu" class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">CPU: </b-col>
                  <b-col>{{ product_details.cpu }}</b-col>
                </b-row>
                <b-row v-if="product_details.os" class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">OS: </b-col>
                  <b-col>{{ product_details.os }}</b-col>
                </b-row>
                <b-row v-if="product_details.camera" class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Camera: </b-col>
                  <b-col>{{ product_details.camera }}</b-col>
                </b-row>
                <b-row v-if="product_details.ram" class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">RAM: </b-col>
                  <b-col>{{ product_details.ram }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Price: </b-col>
                  <b-col>{{ product_details.price }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3"
                    >Total Reviews:
                  </b-col>
                  <b-col> {{ product_details.no_of_reviews }}</b-col>
                </b-row>
                <div>
                  <b-button
                    class="mt-5"
                    v-b-toggle.accordion-2
                    variant="outline-primary"
                    >Rate Product</b-button
                  >
                  <b-button
                    class="mt-5"
                    variant="outline-primary"
                    v-b-modal.modal-prevent-closing
                    >Buy Product</b-button
                  >

                  <b-modal
                    id="modal-prevent-closing"
                    ref="modal"
                    title="Select Quantity"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
                  >
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                      <b-form-group
                        label="Quantity"
                        label-for="name-input"
                        invalid-feedback="Quantity is required"
                        :state="nameState"
                      >
                        <b-form-input
                          id="name-input"
                          v-model="name"
                          type="number"
                          :state="nameState"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </form>
                  </b-modal>
                </div>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="primary"
              >Rate Product</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-container fluid>
                <b-row>
                  <b-col sm="2">
                    <label for="textarea-small">Rate:</label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-rating v-model="value"></b-form-rating>
                  </b-col>
                </b-row>

                <b-row class="mt-2">
                  <b-col sm="2">
                    <label for="textarea-default">Comment:</label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-textarea
                      v-model="comment_text"
                      id="textarea-default"
                      rows="5"
                      placeholder="Add comment"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
                <b-button
                  href="#"
                  class="mt-3"
                  @click="postComment()"
                  variant="outline-primary"
                  >Submit</b-button
                >
              </b-container>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="primary"
              >Product Reviews</b-button
            >
          </b-card-header>
          <b-collapse
            id="accordion-1"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body class="text-left">
              <div
                :key="index"
                v-for="(product_comment, index) in product_comments"
              >
                <b-card-text class="font-weight-bold">Name of User</b-card-text>
                <b-card-text>{{ product_comment.star_rating }}</b-card-text>
                <b-card-text>{{ product_comment.comment_text }}</b-card-text>
                <hr />
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <b-alert
        v-model="showSuccessAlert"
        class="position-fixed fixed-top m-0 rounded-0"
        style="z-index: 2000;"
        variant="success"
        dismissible
      >
        {{ msg }}
      </b-alert>
      <b-alert
        v-model="showDangerAlert"
        class="position-fixed fixed-top m-0 rounded-0"
        style="z-index: 2000;"
        variant="danger"
        dismissible
      >
        {{ msg }}
      </b-alert>
    </b-container>
  </div>
</template>

<script>
import { getProductDetails } from "../services/productService";
import { postComment, getAllComments } from "../services/commentService";

export default {
  data() {
    return {
      value: null,
      comment_text: "",
      name: "",
      nameState: null,
      submittedNames: [],
      product_details: [],
      product_comments: [],
      showDangerAlert: false,
      showSuccessAlert: false,
      msg: ""
    };
  },
  name: "ProductDetails",
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.submittedNames.push(this.name);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
      this.msg = "Order Placed Successfully!!";
      this.showSuccessAlert = true;
    },
    async getProductDetails() {
      try {
        let prod_id = this.$route.params.prod_id;
        const response = await getProductDetails(prod_id);
        this.product_details = response.data;
      } catch (err) {}
    },
    async postComment() {
      try {
        if (this.value != null) {
          let user_id = this.$store.getters.getUserId;
          let prod_id = this.$route.params.prod_id;
          const commentData = {
            comment_text: this.comment_text,
            star_rating: this.value
          };

          await postComment(commentData, prod_id, user_id);
          window.location.reload();
        } else {
          this.msg = "Please Give star rating to product!";
          this.showDangerAlert = true;
        }
      } catch (err) {}
    },
    async getAllComments() {
      try {
        let prod_id = this.$route.params.prod_id;

        const response = await getAllComments(prod_id);

        if (response.status === 200) {
          this.product_comments = response.data;
        }
      } catch (err) {}
    }
  },
  name: "ProductDetail",
  async mounted() {
    await this.getProductDetails();
    await this.getAllComments();
  }
};
</script>
