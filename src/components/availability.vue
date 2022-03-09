<template>
  <q-btn-dropdown :class="stat" flat icon="fiber_manual_record" :label="stat">
    <q-list>
      <q-item clickable v-close-popup @click="onSelection('online')">
        <q-item-section avatar>
          <q-avatar icon="fiber_manual_record" class="online" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>Online</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onSelection('dnd')">
        <q-item-section avatar>
          <q-avatar icon="fiber_manual_record" class="dnd" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>DND</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onSelection('offline')">
        <q-item-section avatar>
          <q-avatar icon="fiber_manual_record" class="offline" />
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
  data() {
    return {
      stat: 'offline',
    };
  },
  methods: {
    onSelection(state: string) {
      this.stat = state;
    },
  },
});
</script>
<style>
.online {
  color: #3acc2d;
}
.dnd {
  color: #a72608;
}
.offline {
  color: #acaaa199;
}
</style>
