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
          'bg-dark': selectedChannel.id == channel.id ? true : false,
          'text-white': selectedChannel.id == channel.id ? true : false,
          'text-dark': selectedChannel.id == channel.id ? false : true,
        }"
        unelevated
        no-caps
        align="left"
        @click="selectedChannel = channel"
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
          'bg-dark': selectedChannel.id == channel.id ? true : false,
          'text-white': selectedChannel.id == channel.id ? true : false,
          'text-dark': selectedChannel.id == channel.id ? false : true,
        }"
        no-caps
        unelevated
        align="left"
        @click="selectedChannel = channel"
      >
        {{ channel.label }}
      </q-btn>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Channel } from './models';

export default defineComponent({
  name: 'Channels',
  data() {
    //TODO pozvanky
    return {};
  },
  watch: {},
  computed: {
    selectedChannel: {
      get(): Channel {
        return this.$store.state.MainStore.selectedChannel;
      },

      set(value: Channel) {
        void this.$store.dispatch('MainStore/setSelectedChannel', value);
      },
    },
    publicChannels: {
      get(): Channel[] {
        return this.$store.state.MainStore.publicChannels;
      },
      set(value: Channel) {
        this.$store.commit('MainStore/insertPublicChannel', value);
      },
    },
    privateChannels: {
      get(): Channel[] {
        return this.$store.state.MainStore.privateChannels;
      },
      set(value: Channel) {
        this.$store.commit('MainStore/insertPrivateChannel', value);
      },
    },
  },
  methods: {},
  mounted() {
    void this.$store.dispatch('MainStore/getChannels');
  },
});
</script>
