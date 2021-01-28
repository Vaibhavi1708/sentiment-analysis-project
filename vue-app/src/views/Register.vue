<template>
  <div class="about">
    <b-container class="bv-example-row text-left">
      <b-row class="justify-content-md-center mb-5">
        <b-col cols="6">
          <h1>Register Here</h1>
          <b-form
            @submit.prevent="validateBeforeSubmit"
            @reset="onReset"
            v-if="show"
          >
            <b-form-group
              id="input-group-1"
              label="Your First Name *"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.fname"
                placeholder="Enter first name"
                required
                v-validate="'alpha'"
                name="first name"
              ></b-form-input>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('first name')">
              <div v-if="errors.has('first name')">
                {{ errors.first("first name") }}
              </div>
            </div>

            <b-form-group
              id="input-group-2"
              label="Your Last Name "
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.lname"
                placeholder="Enter last name"
                v-validate="'alpha'"
                name="last name"
              ></b-form-input>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('last name')">
              <div v-if="errors.has('last name')">
                {{ errors.first("last name") }}
              </div>
            </div>
            <b-form-group
              id="input-group-3"
              label="Email address *"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                name="email"
              >
              </b-form-input>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('email')">
              <div v-if="errors.has('email')">
                {{ errors.first("email") }}
              </div>
            </div>

            <b-form-group
              id="input-group-4"
              label="Contact Number *"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.contact"
                placeholder="Enter contact"
                required
                v-validate="'digits:10'"
                name="contact"
              ></b-form-input>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('contact')">
              <div v-if="errors.has('contact')">
                {{ errors.first("contact") }}
              </div>
            </div>

            <b-form-group
              id="input-group-5"
              label="Gender *"
              label-for="input-5"
            >
              <b-form-select
                id="input-5"
                v-model="form.gender"
                placeholder="Enter gender"
                :options="genders"
                name="gender"
                required
              ></b-form-select>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('gender')">
              <div v-if="errors.has('gender')">
                {{ errors.first("gender") }}
              </div>
            </div>
            <b-form-group
              id="input-group-6"
              label="Your Address *"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="form.address"
                placeholder="Enter address"
                name="address"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-7" label="City *" label-for="input-7">
              <b-form-input
                id="input-7"
                v-model="form.city"
                placeholder="Enter city"
                required
                name="city"
                v-validate="'alpha'"
              ></b-form-input>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('city')">
              <div v-if="errors.has('city')">
                {{ errors.first("city") }}
              </div>
            </div>
            <b-form-group
              id="input-group-8"
              label="Your Password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                placeholder="Enter password *"
                type="password"
                v-validate="{
                  required: true,
                  min: 6
                }"
                name="password"
                ref="password"
              ></b-form-input>
            </b-form-group>
            <div class="alert alert-danger" v-show="errors.has('password')">
              <div v-if="errors.has('password')">
                {{ errors.first("password") }}
              </div>
            </div>

            <b-form-group
              id="input-group-9"
              label="Confirm Password *"
              label-for="confirmpassword"
            >
              <b-form-input
                id="confirmpassword"
                v-model="form.confirmpassword"
                placeholder="password"
                type="password"
                v-validate="'required|confirmed:password'"
                name="password confirmation"
                data-vv-as="password"
              ></b-form-input>
            </b-form-group>
            <div
              class="alert alert-danger"
              v-show="errors.has('password confirmation')"
            >
              <div v-if="errors.has('password confirmation')">
                {{ errors.first("password confirmation") }}
              </div>
            </div>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-alert
        v-model="showAlert"
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
import { userSignup } from "../services/userService";
const getForm = () => ({
  fname: "",
  lname: "",
  email: "",
  contact: "",
  genders: null,
  address: "",
  city: "",
  password: "",
  confirmpassword: ""
});
export default {
  data() {
    return {
      form: getForm(),
      genders: [{ text: "Male", value: "Male" }, "Female", "Other"],
      show: true,
      showAlert: false,
      msg:''
    };
  },
  methods: {
    async validateBeforeSubmit() {
      try {
        const result = await this.$validator.validateAll();
        if (result) {
          const formData = await {
            fname: this.form.fname,
            lname: this.form.lname,
            email: this.form.email,
            gender: this.form.gender,
            password: this.form.password,
            contact_no: this.form.contact,
            city: this.form.city,
            address: this.form.address
          };
          event.preventDefault();
          const response = await userSignup(formData);

          if (response.status === 200) {
            this.$router.push("/login");
          }
          return;
        }
        this.msg = 'Entered Invalid Data!'
        this.showAlert = true;
      } catch (err) {
        this.msg = 'Email Already Exist'
        this.showAlert = true;
      }
    },

    onReset(event) {
      event.preventDefault();
      this.form = getForm();
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  name: "Register"
};
</script>
