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
import { userLogin } from "../services/userService";
const getForm = () => ({
  email: "",
  password: ""
});
export default {
  data() {
    return {
      form: getForm(),
      show: true,
      showAlert: false,
      msg:''
    };
  },

  methods: {
    async onSubmit(event) {
      try {
        event.preventDefault();

        const formData = {
          email: this.form.email,

          password: this.form.password
        };

        const response = await userLogin(formData);
        if (response.status === 200) {
          this.$store.dispatch("setUserId", response.data.id);
          this.$store.dispatch("setUserName", response.data.fname);
          this.$router.push("/products");
          window.location.reload();
        }
      } catch (err) {
        this.msg = 'Invalid Email and Password!!'
        this.showAlert = true;
      }
    },
    async onReset(event) {
      try {
        event.preventDefault();
        this.form = getForm();
        this.$nextTick(() => {
          this.show = true;
        });
      } catch (err) {}
    }
  },
  name: "Login"
};
</script>
