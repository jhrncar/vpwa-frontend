<template>
  <q-btn round flat icon="account_circle" color="white">
    <q-badge floating class="q-mt-sm" :color="statusColor" rounded />
    <q-menu anchor="bottom middle" self="top middle">
      <div class="q-pa-sm bg-grey-2">
        <q-list dense class="bg-grey-2 text-dark">
          <q-item clickable v-close-popup @click="updateStatus(UserStatus.ONLINE)">
            <q-item-section avatar>
              <q-icon
                name="fiber_manual_record"
                class="text-positive"
                size="xs"
              />
            </q-item-section>
            <q-item-section label>
              <q-item-label>Online</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="updateStatus(UserStatus.DND)">
            <q-item-section avatar>
              <q-icon
                name="fiber_manual_record"
                class="text-negative"
                size="xs"
              />
            </q-item-section>
            <q-item-section label>
              <q-item-label>DND</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="updateStatus(UserStatus.OFFLINE)">
            <q-item-section avatar>
              <q-icon name="fiber_manual_record" class="text-grey" size="xs" />
            </q-item-section>
            <q-item-section label>
              <q-item-label>Offline</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { UserStatus } from 'src/contracts'

export default defineComponent({
  name: 'AvailabilityComponent',

  data () {
    return {
      UserStatus
    }
  },
  computed: {
    status () {
      return this.$store.state.auth.user?.status
    },
    statusColor (): string {
      switch (this.status) {
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
  },
  methods: {
    async updateStatus (status: UserStatus) {
      if (this.status === status) return
      await this.$store.dispatch('auth/updateStatus', status)
    }
  }
})
</script>
