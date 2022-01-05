<template>
  <v-app>
    <router-view />
    <my-toast />
  </v-app>
</template>

<script>
import MyToast from '@/components/Widgets/MyToast'
export default {
  name: 'App',
  components: {
    MyToast
  }
}
</script>
