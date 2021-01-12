<template>
  <div class="about">
    <b-container class="bv-example-row text-left">
      <b-row class="justify-content-md-center mb-5">
        <b-col cols="6">
          <h1>Register Here</h1>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Your First Name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.fname"
                placeholder="Enter first name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Your Last Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.lname"
                placeholder="Enter last name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Email address:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Contact Number:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.contact"
                placeholder="Enter contact"
                required
                pattern="[0-9]{10}"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Gender:"
              label-for="input-5"
            >
              <b-form-select
                id="input-5"
                v-model="form.gender"
                placeholder="Enter gender"
                :options="genders"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="input-group-6"
              label="Your Address:"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="form.address"
                placeholder="Enter address"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-7" label="City:" label-for="input-7">
              <b-form-input
                id="input-7"
                v-model="form.city"
                placeholder="Enter city"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-8"
              label="Your Password:"
              label-for="input-8"
            >
              <b-form-input
                id="input-8"
                v-model="form.password"
                placeholder="Enter password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
const getForm = () => ({
  fname: "",
  lname: "",
  email: "",
  contact: "",
  genders: null,
  address: "",
  city: "",
  password: ""
});
export default {
  data() {
    return {
      form: getForm(),
      genders: [{ text: "Male", value: "Male" }, "Female", "Other"],
      show: true
    };
  },
  methods: {
    onSubmit(event) {
      const formData = {
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

      axios
        .post("/api/auth/signup", formData)
        .then(res => {
          alert(JSON.stringify(res.data.message));
          if (res.status === 200) {
            router.push("/login");
          }
          console.log(res);
        })

        .catch(error => {
          console.log(error);
          alert("Email already exist!");
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form = getForm();
      // Trick to reset/clear native browser form validation state
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
