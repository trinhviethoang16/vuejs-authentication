<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
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
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <button type="submit" class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      result: {},
      user: { email: "", password: "" },
      errors: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
  validateInput() {
    this.errors = [];
    if (!this.user.email) {
      this.errors.push("Email required.");
    }
    if (!this.user.password) {
      this.errors.push("Password required.");
    }
    return this.errors.length === 0;
  },

  async handleSubmit() {
    if (this.validateInput()) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/login`, this.user);
        if (response.data.status === true) {
            alert("Login successful.");
            this.$router.push("/");
        } else {
            alert("Invalid! Please try again.");
        }
       } catch (error) {
          console.error(error);
       }
    }
  },
},

};
</script>