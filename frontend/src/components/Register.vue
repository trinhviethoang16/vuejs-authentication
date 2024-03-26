<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <div class="form-group">
      <label>First name</label>
      <input
        type="text"
        class="form-control"
        v-model="user.firstName"
        placeholder="First name"
      />
    </div>
    <div class="form-group">
      <label>Last name</label>
      <input
        type="text"
        class="form-control"
        v-model="user.lastName"
        placeholder="Last name"
      />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input
        type="email"
        class="form-control"
        v-model="user.email"
        placeholder="Email"
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        type="password"
        class="form-control"
        v-model="user.password"
        placeholder="Password"
      />
    </div>
    <div class="form-group">
      <label>Confirm password</label>
      <input
        type="password"
        class="form-control"
        v-model="user.confirmPassword"
        placeholder="Confirm Password"
      />
    </div>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <button type="submit" class="btn btn-primary btn-block">Confirm</button>
  </form>
</template>


<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      result: {},
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    validateInput() {
      this.errors = [];

      if (this.user.firstName === "") {
        this.errors.push("First name required.");
      }
      if (this.user.lastName === "") {
        this.errors.push("Last name required.");
      }
      if (this.user.email === "") {
        this.errors.push("Email required.");
      }
      if (this.user.password === "") {
        this.errors.push("Password required.");
      }
      if (this.user.password !== this.user.confirmPassword) {
        this.errors.push("Passwords do not match.");
      }
      return this.errors.length === 0;
    },

    async handleSubmit() {
      if (this.validateInput()) {
        try {
          await axios.post(`${process.env.VUE_APP_BASE_URL}/register`, this.user).then(() => {
            alert("User registered successfully");
            this.$router.push("/login");
          });
        } catch (error) {
          alert("Error registering user");
          console.log(error);
        }
      }
    },
  },
};
</script>
