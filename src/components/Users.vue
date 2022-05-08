<template>
  <q-list class="full-width q-py-md" dense>
    <q-toolbar-title class="text-white q-mx-lg">Users</q-toolbar-title>
    <q-separator inset class="q-mt-xs q-mb-sm" />
    <q-item v-for="user in users" :key="user.id" class="text-dark q-mb-xs">
      <q-icon
        name="fiber_manual_record"
        :color="getStatusColor(user.status)"
        size="sm"
        class="q-pr-md"
      />
      <q-item-section>
        <div class="row">
        <q-icon v-if="activeChannel?.adminId === user.id" name="fa-solid fa-crown" color="orange" class="q-pr-sm"/>
        <q-item-label
          class="text-white text-subtitle1"
          style="word-wrap: break-word"
          >{{ user.fullname }}</q-item-label
        >
        </div>
        <q-item-label caption lines="1" class="text-dark text-">{{
          user.username
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { ChannelUser, UserStatus } from 'src/contracts'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersComponent',

  data () {
    return {}
  },
  computed: {
    users (): ChannelUser[] {
      return this.$store.getters['channels/currentUsers']
    },
    activeChannel () {
      return this.$store.state.channels.active
    }
  },
  methods: {
    getStatusColor (status: UserStatus): string {
      switch (status) {
        case UserStatus.ONLINE:
          return 'positive'
        case UserStatus.DND:
          return 'negative'
        case UserStatus.OFFLINE:
          return 'grey'
        default:
          return 'grey'
      }
    }
  }
})
</script>
