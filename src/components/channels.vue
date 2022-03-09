<template>
  <h4>Public channels</h4>
  <q-list>
    <q-item v-for="channel in publicChannels" :key="channel.id">
      {{ channel.name }}
    </q-item>
  </q-list>
  <h4>Private channels</h4>
  <q-list>
    <q-item v-for="channel in privateChannels" :key="channel.id">
      {{ channel.name }}
    </q-item>
  </q-list>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Channels',
  data() {
    return {
      publicChannels: [
        { id: 1, name: 'channel1' },
        { id: 2, name: 'channel2' },
        { id: 2, name: 'channel2' },
      ],
      privateChannels: [
        { id: 1, name: 'channel1' },
        { id: 2, name: 'channel2' },
        { id: 2, name: 'channel2' },
      ],
    };
  },
});
</script>
