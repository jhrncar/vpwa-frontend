<template>
  <q-page class="column">
    <div class="col"></div>
    <div class="q-pa-lg"><MessageInput></MessageInput></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageInput from 'src/components/MessageInput.vue';

export default defineComponent({
  name: 'PageMain',
  components: {
    MessageInput,
  },
});
</script>

<style scoped></style>
