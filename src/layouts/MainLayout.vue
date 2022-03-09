<template>
  <q-layout view="hHh LpR lFr">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Prismarine </q-toolbar-title>
        <div style="justify-content: space-between; display: flex; gap: 20px">
          <Availability></Availability>
          <q-btn round flat icon="search" />
          <q-btn flat round icon="people" @click="toggleRightDrawer" />
          <q-btn round flat icon="logout" to="/login" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-primary"
      width="250"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
      class="bg-primary"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import Availability from 'src/components/availability.vue';

export default {
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },

  components: { Availability },
};
</script>
<style></style>
