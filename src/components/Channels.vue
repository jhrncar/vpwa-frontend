<template>
  <q-list dense class="q-pt-md q-pb-sm">
    <q-toolbar-title class="text-white q-mx-lg q-mb-xs"
      >Public channels</q-toolbar-title
    >
    <q-item v-for="channel in publicChannels" :key="channel.id" dense>
      <q-btn
        dense
        class="full-width q-px-md"
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
  <q-separator color="secondary" inset></q-separator>
  <q-list dense class="q-pt-md q-pb-sm">
    <q-toolbar-title class="text-white q-mx-lg q-mb-xs"
      >Private channels</q-toolbar-title
    >
    <q-item v-for="channel in privateChannels" :key="channel.id" dense>
      <q-btn
        dense
        class="full-width q-px-md"
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
        { label: '# channel1', id: '1' },
        { label: '# channel2', id: '2' },
        { label: '# channel3', id: '3' },
      ],
      privateChannels: [
        { label: '# channel1', id: '4' },
        { label: '# chanel2', id: '5' },
        { label: '# chanel3', id: '6' },
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
