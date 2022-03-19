<template>
  <q-list class="full-width q-pt-md q-px-sm" dense>
    <q-item v-for="user in users" :key="user.id" class="q-my-sm text-dark">
      <q-icon
        name="fiber_manual_record"
        :color="user.stat"
        size="sm"
        class="q-pr-md"
      />
      <q-item-section>
        <q-item-label
          class="text-white text-subtitle1"
          style="word-wrap: break-word"
          >{{ user.fullname }}</q-item-label
        >
        <q-item-label caption lines="1" class="text-dark text-">{{
          user.username
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from './models';

export default defineComponent({
  name: 'Users',

  data() {
    return {};
  },
  computed: {
    users: {
      get() {
        return this.$store.state.MainStore.users;
      },
      set(user: User) {
        this.$store.commit('insertUser', user);
      },
    },
  },
  methods: {},
  beforeMount() {
    void this.$store.dispatch('MainStore/getUsers');
  },
});
</script>
