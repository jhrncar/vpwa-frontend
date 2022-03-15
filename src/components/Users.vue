<template>
  <q-list class="full-width q-pt-md q-px-sm" dense>
    <q-item v-for="user in users" :key="user.id" class="q-my-sm text-dark">
      <q-icon
        name="fiber_manual_record"
        :color="user.stat"
        size="sm"
        class="q-pr-md"
      />
      <q-item-section>
        <q-item-label
          class="text-white text-subtitle1"
          style="word-wrap: break-word"
          >{{ user.fullname }}</q-item-label
        >
        <q-item-label caption lines="1" class="text-dark text-">{{
          user.username
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Users',

  data() {
    return {
      users: [
        {
          id: 1,
          fullname: 'Ruddy Jedrzej',
          username: 'xruddy',
          stat: 'positive',
        },
        {
          id: 2,
          fullname: 'Mallorie Alessandrini',
          username: 'xmallorie',
          stat: 'positive',
        },
        {
          id: 3,
          fullname: 'Elisabetta Wicklen',
          username: 'xelisabetta',
          stat: 'negative',
        },
        {
          id: 4,
          fullname: 'Seka Fawdrey',
          username: 'xseka',
          stat: 'grey',
        },
      ],
    };
  },
});
</script>
