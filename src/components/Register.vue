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
      :error-message="getErrorMessage('nickname')"
    />
    <q-input
      outlined
      v-model="email"
      label="E-mail"
      hide-bottom-space
      :error-message="getErrorMessage('email')"
      :error="v$.email.$error"
    />
    <q-input
      outlined
      v-model="fullname"
      label="Full name"
      :error="v$.fullname.$error"
      hide-bottom-space
      :error-message="getErrorMessage('fullName')"
    />
    <q-input
      v-model="password"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      hide-bottom-space
      :error-message="getErrorMessage('password')"
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
      hide-bottom-space
      :error-message="getErrorMessage('passwordAgain')"
      :error="v$.passwordAgain.$error"
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
import useVuelidate, { ErrorObject } from '@vuelidate/core';
import {
  minLength,
  maxLength,
  required,
  email,
  sameAs,
  helpers,
} from '@vuelidate/validators';

export default defineComponent({
  name: 'Register',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      nickname: '',
      email: '',
      fullname: '',
      password: '',
      passwordAgain: '',
      isPwd: true,
    };
  },
  validations() {
    return {
      nickname: {
        required,
        maxLength: maxLength(30),
      },
      email: {
        required,
        email,
      },
      fullname: {
        required,
        maxLength: maxLength(30),
      },

      password: {
        required,
        sameAs: helpers.withMessage(
          'The passwords are not the same',
          sameAs(this.passwordAgain)
        ),
        minLength: minLength(8),
        maxLength: maxLength(30),
      },
      passwordAgain: {
        required,
        sameAs: helpers.withMessage(
          'The passwords are not the same',
          sameAs(this.password)
        ),
        minLength: minLength(8),
        maxLength: maxLength(30),
      },
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$touch;
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
      }
    },
    getErrorMessage(id: string): string {
      let a = undefined;
      try {
        a = this.v$.$errors.reduce((previousValue, currentValue) =>
          currentValue.$property == id ? currentValue : previousValue
        ).$message;
      } catch (error) {}
      if (typeof a == 'string') {
        return a;
      } else {
        return '';
      }
    },
  },
});
</script>
