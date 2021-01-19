<template>
  <div class="about">
    <b-container class="bv-example-row text-left">
      <b-row class="justify-content-md-center mb-5">
        <b-col cols="6">
          <h1>Login Here</h1>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Your Password:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
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
import store from "../store";
import router from "../router";
import axios from "axios";
const getForm = () => ({
  email: "",
  password: ""
});
export default {
  data() {
    return {
      form: getForm(),
      show: true
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();

      const formData = {
        email: this.form.email,

        password: this.form.password
      };

      axios
        .post("/api/auth/login", formData)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.id)
            this.$store.dispatch("login");
            this.$router.push({ name: "ProductList", params: {user_id: res.data.id } });
          }
          console.log(res);
        })

        .catch(error => {
          console.log(error);
          alert("Invalid email and password!");
        });
    },
    onReset(event) {
      event.preventDefault();
      this.form = getForm();
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
    name: "Login",
};
</script>
