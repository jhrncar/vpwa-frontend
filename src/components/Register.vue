<template>
  <div class="text-h2 text-dark q-mb-xl">Register</div>
  <q-form class="q-gutter-y-md column" style="width: 50%">
    <q-input
      outlined
      v-model="nickname"
      label="Nickname"
      :rules="[(val: string) => val.length <= 30 || 'Please use maximum 30 characters']"
      hide-bottom-space
    />
    <q-input outlined type="email" v-model="email" label="E-mail" />
    <q-input
      outlined
      v-model="fullname"
      label="Full name"
      :rules="[(val: string) => val.length <= 500 || 'Please use maximum 500 characters']"
      hide-bottom-space
    />
    <q-input
      v-model="password"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      :rules="[(val: string) => val.length >= 3 || 'Please use minimum 3 characters']"
      lazy-rules="ondemand"
      hide-bottom-space
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
      :rules="[(val: string) => val.length >= 3 || 'Please use minimum 3 characters']"
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

export default defineComponent({
  name: 'Register',
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
});
</script>
