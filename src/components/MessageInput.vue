<template>
  <q-input outlined v-model="text" bg-color="grey-2" placeholder="Message...">
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="text = ''"
        class="cursor-pointer"
      />
    </template>

    <template v-slot:after>
      <q-btn round dense flat icon="send" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  name: 'MessageInput',
  setup() {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
    };
  },
});
</script>
