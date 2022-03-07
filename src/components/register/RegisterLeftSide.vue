<template>
  <div class="text-h2 text-dark text-center q-mb-xl">Register</div>
  <q-form class="q-gutter-md column" style="width: 50%">
    <q-input outlined v-model="nickname" label="Nickname" />
    <q-input outlined type="email" v-model="email" label="E-mail" />
    <q-input outlined v-model="fullname" label="Fullname" />
    <q-input
      v-model="password"
      outlined
      :type="isPwd ? 'password' : 'text'"
      label="Password"
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
      label="Retype password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </q-form>
  <q-btn
    size="lg"
    label="Register"
    type="submit"
    color="primary"
    class="q-mt-lg"
    style="width: 50%"
  />
  <a href="/login" style="text-decoration: none">
    <p class="lt-md text-dark q-pt-md cursor-pointer">
      Already have an Account? Login!
    </p>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterLeftSide',
  data() {
    return {
      nickname: '',
      email: '',
      fullname: '',
      password: '',
      passwordAgain: '',
      isPwd: 1,
    };
  },
});
</script>
