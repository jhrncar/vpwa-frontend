<template>
  <h5
    style="font-size: 32px; text-align: center; align-content: top"
    class="text-white q-mb-sm q-mt-sm"
  >
    Public channels
  </h5>
  <q-list>
    <q-item v-for="channel in publicChannels" :key="channel.id" dense>
      <q-btn
        class="full-width"
        :class="{
          'bg-dark': selectedChannel == channel.id ? true : false,
          'text-white': selectedChannel == channel.id ? true : false,
          'text-dark': selectedChannel == channel.id ? false : true,
        }"
        unelevated
        no-caps
        align="left"
        @click="handleSelect(channel.id)"
      >
        {{ channel.label }}
      </q-btn>
    </q-item>
  </q-list>
  <h5
    style="font-size: 32px; text-align: center"
    class="text-white q-mb-sm q-mt-lg"
  >
    Private channels
  </h5>
  <q-list>
    <q-item v-for="channel in privateChannels" :key="channel.id" dense>
      <q-btn
        dense
        class="full-width"
        :class="{
          'bg-dark': selectedChannel == channel.id ? true : false,
          'text-white': selectedChannel == channel.id ? true : false,
          'text-dark': selectedChannel == channel.id ? false : true,
        }"
        no-caps
        unelevated
        align="left"
        @click="handleSelect(channel.id)"
      >
        {{ channel.label }}
      </q-btn>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Channels',
  data() {
    // channeli sa loaduju z databazy
    return {
      publicChannels: [
        { label: '# Channel1', id: '1' },
        { label: '# Channel2', id: '2' },
        { label: '# Channel3', id: '3' },
      ],
      privateChannels: [
        { label: '# Channel1', id: '4' },
        { label: '# Chanel2', id: '5' },
        { label: '# Chanel3', id: '6' },
      ],
      selectedChannel: '', //TODO treba to dat do storu asi
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
    handleSelect(newChannel: string) {
      this.selectedChannel = newChannel;
    },
  },
  //beforeMount(){} asi? a tu sa budu gettovat z databazy channely
});
</script>
