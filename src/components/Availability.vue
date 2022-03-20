<template>
  <q-btn-dropdown no-caps flat class="text-white q-pr-xs">
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-icon left name="fiber_manual_record" :color="statusColor" />
        <div>{{ status }}</div>
      </div>
    </template>

    <q-list separator bordered class="bg-grey-2 text-dark">
      <q-item clickable v-close-popup @click="status = 'Online'">
        <q-item-section avatar>
          <q-icon name="fiber_manual_record" class="text-positive" size="xs" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>Online</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="status = 'DND'">
        <q-item-section avatar>
          <q-icon name="fiber_manual_record" class="text-negative" size="xs" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>DND</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="status = 'Offline'">
        <q-item-section avatar>
          <q-icon name="fiber_manual_record" class="text-grey" size="xs" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>Offline</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Availability',

  computed: {
    status: {
      get(): string {
        return this.$store.state.MainStore.user.status;
      },

      set(value: string) {
        void this.$store.dispatch('MainStore/setStatus', value);
      },
    },
    statusColor() {
      switch (this.status) {
        case 'Online':
          return 'positive';
        case 'DND':
          return 'negative';
        case 'Offline':
          return 'grey';
        default:
          return '';
      }
    },
  },
});
</script>
