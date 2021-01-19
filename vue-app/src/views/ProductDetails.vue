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
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Memory: </b-col>
                  <b-col> {{ product_details.internal_memory }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Battery: </b-col>
                  <b-col>{{ product_details.battery }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">CPU: </b-col>
                  <b-col>{{ product_details.cpu }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">OS: </b-col>
                  <b-col>{{ product_details.os }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Camera: </b-col>
                  <b-col>{{ product_details.camera }}</b-col>
                </b-row>
                <b-row class=" text-left pt-2">
                  <b-col class="font-weight-bold" cols="3">Ram: </b-col>
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
                  <b-col> 40,000</b-col>
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
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { getProductDetails } from "../services/productService";

export default {
  data() {
    return {
      value: null,
      comment_text: "",
      name: "",
      nameState: null,
      submittedNames: [],
      product_details: [],
      product_comments: []
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
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    getProductDetails() {
      let prod_id = window.location.pathname.split("/")[3];

      getProductDetails(prod_id).then(response => {
        console.log("Successfully fetched product");
        this.product_details = response.data;
      });
    },
    postComment() {
      let user_id = window.location.pathname.split("/")[1];
      let prod_id = window.location.pathname.split("/")[3];
      console.log(user_id, prod_id);
      const commentData = {
        comment_text: this.comment_text,
        star_rating: this.value
      };
      console.log(commentData);

      axios
        .post("/api/postcomment", commentData, { params: { user_id, prod_id } })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
          }
        })

        .catch(error => {
          console.log(error);
        });
    },
    getAllComments() {
      let prod_id = window.location.pathname.split("/")[3];
      axios
        .get("/api/getcomments", { params: { prod_id } })
        .then(res => {
          if (res.status === 200) {
            console.log("API called");
            console.log(res);
            this.product_comments = res.data;
            console.log(this.product_comments);
          }
        })

        .catch(error => {
          console.log(error);
          alert("Invalid product id");
        });
    }
  },
  name: "ProductDetail",
  mounted() {
    this.getProductDetails();
    this.getAllComments();
  }
};
</script>
