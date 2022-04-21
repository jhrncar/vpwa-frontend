<template>
  <q-btn round flat icon="account_circle" color="white">
    <q-badge floating class="q-mt-sm" :color="statusColor" rounded />
    <q-menu anchor="bottom middle" self="top middle">
      <div class="q-pa-sm bg-grey-2">
        <q-list dense class="bg-grey-2 text-dark">
          <q-item clickable v-close-popup @click="status = 'online'">
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

          <q-item clickable v-close-popup @click="status = 'dnd'">
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

          <q-item clickable v-close-popup @click="status = 'offline'">
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

export default defineComponent({
  name: 'AvailabilityComponent',

  computed: {
    status: {
      get (): string {
        return this.$store.state.MainStore.user.status
      },

      set (value: string) {
        this.$store.dispatch('MainStore/setStatus', value)
      }
    },
    statusColor (): string {
      switch (this.status) {
        case 'online':
          return 'positive'
        case 'dnd':
          return 'negative'
        case 'offline':
          return 'grey'
        default:
          return ''
      }
    }
  }
})
</script>
