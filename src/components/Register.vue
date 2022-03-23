<template>
  <div class="text-h2 text-dark q-mb-xl">Register</div>
  <q-form
    class="q-gutter-y-md column"
    style="width: 50%"
    @submit.stop="onSubmit"
  >
    <q-input
      outlined
      v-model="nickname"
      label="Nickname"
      :error="v$.nickname.$error"
      hide-bottom-space
      :error-message="v$.$errors.map((e) => e.$message).join()"
    />
    <q-input
      outlined
      v-model="email"
      label="E-mail"
      hide-bottom-space
      :error-message="v$.$errors.map((e) => e.$message).join()"
      :error="v$.email.$error"
    />
    <q-input
      outlined
      v-model="fullname"
      label="Full name"
      :error="v$.fullName.$error"
      hide-bottom-space
      :error-message="v$.$errors.map((e) => e.$message).join()"
    />
    <q-input
      v-model="password"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      :rules="[
        (val) => val.length >= 3 || 'Please use a minimum 3 of characters',
        (val) => val == passwordAgain || 'Passwords do not match',
      ]"
      hide-bottom-space
      :error-message="v$.$errors.map((e) => e.$message).join()"
      :error="v$.password.$error"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      v-model="passwordAgain"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Confirm password"
      :rules="[
        (val) => val.length >= 3 || 'Please use a minimum 3 of characters',
        (val) => val == password || 'Passwords do not match',
      ]"
      hide-bottom-space
      lazy-rules="ondemand"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-btn size="lg" label="Register" type="submit" color="primary" />
  </q-form>

  <q-btn
    no-caps
    flat
    class="lt-md q-mt-sm text-subtitle1 text-dark"
    color="dark"
    to="/login"
    ><p>
      Already have an Account? <span class="text-primary"> Login</span>
    </p></q-btn
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import {
  minLength,
  maxLength,
  required,
  email,
  sameAs,
} from '@vuelidate/validators';

export default defineComponent({
  name: 'Register',
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      nickname: '',
      email: '',
      fullname: '',
      password: '',
      passwordAgain: '',
      isPwd: true,
      isDifferent: false,
    };
  validations() {
    return {
      nickname: {
        required,
        maxLength: maxLength(30),
      },
      fullName: {
        required,
        maxLength: maxLength(30),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        sameAs,
      },
    };
  },
  methods: {
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
      }
      if (this.password != this.passwordAgain) {
        this.isDifferent = true;
      }
    },
  },
});
</script>
