<template>
  <div class="text-h2 text-dark q-mb-xl">Register</div>
  <q-form class="q-gutter-y-md column" style="width: 50%" @submit="register">
    <q-input
      outlined
      v-model="username"
      label="Username"
      :error="v$.username.$error"
      hide-bottom-space
      :error-message="getErrorMessage('username')"
      autofocus
    />
    <q-input
      outlined
      v-model.trim="email"
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
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      hide-bottom-space
      :error-message="getErrorMessage('password')"
      :error="v$.password.$error"
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
    <q-input
      v-model="passwordConfirmation"
      outlined
      :type="showPassword ? 'text' : 'password'"
      label="Confirm password"
      hide-bottom-space
      :error-message="getErrorMessage('passwordConfirmation')"
      :error="v$.passwordConfirmation.$error"
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
    <q-btn
      size="lg"
      label="Register"
      type="submit"
      color="primary"
      :loading="loading"
    />
  </q-form>

  <q-btn
    no-caps
    flat
    class="lt-md q-mt-sm text-subtitle1 text-dark"
    color="dark"
    :to="{ name: 'login' }"
    ><p>
      Already have an Account? <span class="text-primary"> Login</span>
    </p></q-btn
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  minLength,
  maxLength,
  required,
  email,
  sameAs,
  helpers,
  alpha
} from '@vuelidate/validators'
import { RouteLocationRaw } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'RegisterComponent',
  setup () {
    const $q = useQuasar()

    function alert () {
      $q.dialog({
        title: 'Error',
        message: 'User with this username/e-mail already exists.'
      })
    }

    return { v$: useVuelidate(), alert }
  },
  data () {
    return {
      username: '',
      email: '',
      fullname: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false
    }
  },
  validations () {
    return {
      username: {
        required,
        alpha,
        minLength: minLength(6),
        maxLength: maxLength(30)
      },
      email: {
        required,
        email
      },
      fullname: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      },

      password: {
        required,
        sameAs: helpers.withMessage(
          'The passwords are not the same',
          sameAs(this.passwordConfirmation)
        ),
        minLength: minLength(8),
        maxLength: maxLength(30)
      },
      passwordConfirmation: {
        required,
        sameAs: helpers.withMessage(
          'The passwords are not the same',
          sameAs(this.password)
        ),
        minLength: minLength(8),
        maxLength: maxLength(30)
      }
    }
  },
  computed: {
    redirectTo (): RouteLocationRaw {
      return { name: 'login' }
    },
    loading (): boolean {
      return this.$store.state.auth.status === 'pending'
    }
  },
  methods: {
    async register () {
      this.v$.$touch()
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const data = {
          username: this.username,
          email: this.email,
          fullname: this.fullname,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        }
        this.$store
          .dispatch('auth/register', data)
          .then(() => this.$router.push(this.redirectTo)).catch(error => { if (error.response.status === 422) this.alert() })
      }
    },
    getErrorMessage (id: string): string {
      let a
      try {
        a = this.v$.$errors.reduce((previousValue, currentValue) =>
          currentValue.$property === id ? currentValue : previousValue
        ).$message
      } catch (error) {}
      if (typeof a === 'string') {
        return a
      } else {
        return ''
      }
    }
  }
})
</script>
