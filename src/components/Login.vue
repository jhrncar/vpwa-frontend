<template>
  <div class="text-h2 text-dark q-mb-xl">Login</div>

  <q-form class="q-gutter-y-md column" style="width: 50%" @submit="login">
    <q-input
      outlined
      v-model="email"
      label="E-mail/Username"
      hide-bottom-space
      :error-message="getErrorMessage('email')"
      :error="v$.email.$error"
      autofocus
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
    <q-checkbox
      class="text-dark"
      v-model="remember"
      left-label
      label="Remember me"
      color="primary"
    />
    <q-btn
      size="lg"
      label="Login"
      type="submit"
      color="primary"
      class="q-mt-md"
      :loading="loading"
    />
  </q-form>

  <q-btn
    no-caps
    flat
    class="lt-md q-mt-sm text-subtitle1 text-dark"
    :to="{ name: 'register' }"
    ><p>
      Don't have an Account? <span class="text-primary">Register</span>
    </p></q-btn
  >
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core'
import { maxLength, minLength, required, email } from '@vuelidate/validators'
import { defineComponent } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'LoginComponent',
  setup () {
    const $q = useQuasar()

    function alert () {
      $q.dialog({
        title: 'Error',
        message: 'User does not exist.'
      })
    }

    return { v$: useVuelidate(), alert }
  },
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      showPassword: false
    }
  },
  validations () {
    return {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
      }
    }
  },
  computed: {
    redirectTo (): RouteLocationRaw {
      return (this.$route.query.redirect as string) || { name: 'home' }
    },
    loading (): boolean {
      return this.$store.state.auth.status === 'pending'
    }
  },
  methods: {
    async login () {
      this.v$.$touch()
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const data = {
          email: this.email,
          password: this.password,
          remember: this.remember
        }
        this.$store
          .dispatch('auth/login', data)
          .then(() => {
            this.$store.dispatch('MainStore/getUser')
            this.$store.dispatch('MainStore/getChannels')
            this.$router.push(this.redirectTo)
          }).catch(error => { if (error.response.status === 400) this.alert() })
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
