<template>
  <h4>Public channels</h4>

  <q-btn-toggle
    class="full-width"
    style="flex-direction: column; justify-self: flex-start"
    toggle-color="red"
    v-model="selectedChannel"
    :options="publicChannels"
  />

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
        { label: '# Channel1', value: 'channel1' },
        { label: '# Channel2', value: 'channel2' },
        { label: '# Channel3', value: 'channel3' },
      ],
      privateChannels: [
        { id: 1, name: 'channel1' },
        { id: 2, name: 'channel2' },
        { id: 2, name: 'channel2' },
      ],
      selectedChannel: null,
    };
  },
});
</script>
<style>
.channels {
  width: 100%;
  align-items: flex-start;
}
</style>
