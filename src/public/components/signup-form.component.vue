<script>
import ButtonPrimary from "@/greenhouse/components/button-primary.component.vue";
import axios from "axios";
import * as yup from "yup";
import {CompanyApiService} from "@/profiles/services/company-api.service";
import {UserApiService} from "@/profiles/services/user-api.service";
export default {
  name: "signup-form",
  components: {ButtonPrimary},
  data() {

    return {
      company_name: "",
      ruc: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      successful: false,
      loading: false,
      companyService: new CompanyApiService(),
      userService: new UserApiService(),
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.companyService.createCompany({companyName: this.company_name, tin: this.ruc}).then(
          (response) => {
            this.userService.createEmployee({
              firstName: this.first_name,
              lastName: this.last_name,
              email: this.email,
              password: this.password,
              companyId: response.data.id,
            })
          }
      );

      this.$store.dispatch("auth/register", {
        username: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
      }).then(
          () => {
            this.$router.push("/login");
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
  },
}
</script>

<template>
  <form id="signup" @submit.prevent="handleRegister">
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="company_name"
          type="text"
          name="company_name"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="company_name"
      ></pv-input-text>
      <label for="company_name">{{ $t('login-signup.company_name') }}</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="ruc"
          type="number"
          name="ruc"
          required
          class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full border rounded-md px-3 py-2 "
          v-model="ruc"
      ></pv-input-text>
      <label for="ruc">{{ $t('login-signup.ruc') }}</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="email"
      ></pv-input-text>
      <label for="email">{{ $t('login-signup.email') }}</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="first-name"
          type="text"
          name="first-name"
          autocomplete="given-name"
          required
          class="w-full border rounded-md px-3 md:py-2"
          v-model="first_name"
      ></pv-input-text>
      <label for="first-name">{{ $t('login-signup.first_name') }}</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="last-name"
          type="text"
          name="last-name"
          autocomplete="family-name"
          required
          class="w-full border rounded-md px-3 md:py-2"
          v-model="last_name"
      ></pv-input-text>
      <label for="last-name">{{ $t('login-signup.last_name') }}</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="password"
          type="password"
          name="password"
          autocomplete="current-password"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="password"
      ></pv-input-text>
      <label for="password">{{ $t('login-signup.password') }}</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="confirm-password"
          type="password"
          name="confirm-password"
          autocomplete="current-password"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="password_confirmation"
      ></pv-input-text>
      <label for="confirm-password">{{ $t('login-signup.password_confirm') }}</label>
    </div>
    <div class="flex items-center md:items-start mb-3">
      <div class="h-5">
        <input id="remember" aria-describedby="remember" type="checkbox" required class="rounded cursor-pointer">
      </div>
      <div class="text-sm ml-3">
        <label for="remember" class="font-medium">
          <span v-text="$t('login-signup.agree_with_terms')"></span>
          <router-link to="site-policy" class="text-blue-500 underline cursor-pointer">{{$t('login-signup.terms_and_conditions')}}
          </router-link>
          {{ $t('and') }}
          <router-link to="site-policy" class="text-blue-500 underline cursor-pointer">{{$t('login-signup.privacy_policy')}}
          </router-link>
        </label>
      </div>
    </div>
    <div class="text-center">
      <button-primary
          class="px-7 mb-3"
          :text="$t('login-signup.signup')"
          :buttonColor="'var(--primary-green)'"
          :buttonTextColor="'var(--primary-white)'"
          :buttonBorderColor="'var(--primary-green)'"
          type="submit">
      </button-primary>
    </div>
  </form>
</template>

<style scoped>

</style>