<template>
  <q-page class="column justify-end q-pa-lg">
    <Messages />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Messages from 'components/Messages.vue'

export default defineComponent({
  name: 'ChatPage',
  components: {
    Messages
  }
})
</script>
