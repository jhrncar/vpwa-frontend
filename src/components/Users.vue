<template>
  <q-list class="full-width q-pt-md q-px-sm" dense>
    <q-item v-for="user in users" :key="user.id" class="q-my-sm text-dark">
      <q-icon
        name="fiber_manual_record"
        :color="getStatusColor(user.status)"
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

export default defineComponent({
  name: 'Users',

  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.state.MainStore.selectedChannel.users;
    },
  },
  methods: {
    getStatusColor(status: string) {
      switch (status) {
        case 'online':
          return 'positive';
        case 'dnd':
          return 'negative';
        case 'offline':
          return 'grey';
        default:
          return '';
      }
    },
  },
});
</script>
