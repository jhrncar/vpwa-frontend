<template>
  <q-btn-dropdown no-caps flat class="text-white q-pr-xs">
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-icon left name="fiber_manual_record" :color="stat" />
        <div>{{ label }}</div>
      </div>
    </template>

    <q-list separator class="bg-dark text-white">
      <q-item clickable v-close-popup @click="onSelection('positive')">
        <q-item-section avatar>
          <q-icon name="fiber_manual_record" class="text-positive" size="xs" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>Online</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="onSelection('negative')">
        <q-item-section avatar>
          <q-icon name="fiber_manual_record" class="text-negative" size="xs" />
        </q-item-section>
        <q-item-section label>
          <q-item-label>DND</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="onSelection('grey')">
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
  data() {
    return {
      stat: 'grey',
      label: 'Offline',
    };
  },
  methods: {
    onSelection(state: string) {
      this.stat = state;
      if (state == 'positive') {
        this.label = 'Online';
      } else if (state == 'negative') {
        this.label = 'DND';
      } else if (state == 'grey') {
        this.label = 'Offline';
      }
    },
  },
});
</script>
