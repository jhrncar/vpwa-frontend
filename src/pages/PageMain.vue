<template>
  <q-page class="column">
    <div class="column col q-px-lg"><Messages /></div>
    <div class="q-pa-lg"><MessageInput /></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageInput from 'src/components/MessageInput.vue';
import Messages from 'src/components/Messages.vue';

export default defineComponent({
  name: 'PageMain',
  components: {
    MessageInput,
    Messages,
  },
});
</script>

<style scoped></style>
