<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar class="justify-between">
        <q-btn flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title v-if="!leftDrawerOpen && activeChannel">
          # {{activeChannel.name}}
        </q-toolbar-title>
        <div style="justify-content: space-between; display: flex; gap: 10px">
          <Availability />
          <q-btn flat round icon="people" @click="toggleRightDrawer" />
          <q-btn round flat icon="logout" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="bg-primary"
      :width="250"
    >
      <Channels @closeDrawer="toggleLeftDrawer" />
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      class="bg-primary"
      :width="250"
    >
      <Users />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import Availability from 'src/components/Availability.vue'
import Channels from 'src/components/Channels.vue'
import Users from 'src/components/Users.vue'

export default defineComponent({
  name: 'MainLayout',

  components: { Availability, Channels, Users },

  data () {
    return {
      drawerWidth: 250
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },

  computed: {
    activeChannel () {
      return this.$store.state.channels.active
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
})
</script>
<style></style>
