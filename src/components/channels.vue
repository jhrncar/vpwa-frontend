<template>
  <h5 style="font-size: 32px; text-align: center" class="text-white q-mb-lg">
    Public channels
  </h5>

  <q-btn-toggle
    unelevated
    no-wrap
    class="full-width"
    style="flex-direction: column"
    toggle-color="dark"
    toggle-text-color="white"
    v-model="selectedChannel"
    :options="publicChannels"
  />

  <h5 style="font-size: 32px; text-align: center" class="text-white q-mb-lg">
    Private channels
  </h5>
  <q-list>
    <q-btn-toggle
      unelevated
      no-wrap
      class="full-width"
      style="flex-direction: column"
      toggle-color="dark"
      toggle-text-color="white"
      v-model="selectedChannel"
      :options="privateChannels"
    />
  </q-list>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Channels',
  data() {
    return {
      publicChannels: [
        { label: '# Channel1', value: '1' },
        { label: '# Channel2', value: '2' },
        { label: '# Channel3', value: '3' },
      ],
      privateChannels: [
        { label: '# Channel1', value: '4' },
        { label: '# Chanel2', value: '5' },
        { label: '# Chanel3', value: '6' },
      ],
      selectedChannel: null, //TODO treba to dat do storu asi
    };
  },
  watch: {
    selectedChannel(newChannel) {
      console.log(newChannel);
    },
  },
  methods: {
    getNewChannel() {
      //load new channel
    },
  },
});
</script>
