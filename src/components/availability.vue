<template>
  <q-btn-dropdown :class="stat" flat icon="fiber_manual_record" :label="label">
    <q-list>
      <q-item clickable v-close-popup @click="onSelection('text-positive')">
        <q-item-section avatar>
          <q-avatar icon="fiber_manual_record" class="text-positive" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>Online</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onSelection('text-negative')">
        <q-item-section avatar>
          <q-avatar icon="fiber_manual_record" class="text-negative" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>DND</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="onSelection('text-dark')">
        <q-item-section avatar>
          <q-avatar icon="fiber_manual_record" class="text-dark" />
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
      stat: 'text-dark',
      label: 'Offline',
    };
  },
  methods: {
    onSelection(state: string) {
      this.stat = state;
      if (state == 'text-positive') {
        this.label = 'Online';
      } else if (state == 'text-negative') {
        this.label = 'DND';
      } else if (state == 'text-dark') {
        this.label = 'Offline';
      }
    },
  },
});
</script>
