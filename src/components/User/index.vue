<template>
  <div>
    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Gallery</v-toolbar-title>
      <v-spacer />
      <v-btn text color="grey darken-2" @click="$refs.upload.click()">
        <v-icon dense class="mr-1">mdi-tray-arrow-up</v-icon>
        Upload
      </v-btn>
      <input ref="upload" type="file" class="d-none" accept="image/*" @change="onUploadChange">
      <!--      <v-file-input-->
      <!--        ref="upload"-->
      <!--        @change="onUploadChange"-->
      <!--        accept="image/*"-->
      <!--        hide-input-->
      <!--        hide-details-->
      <!--        placeholder="Upload"-->
      <!--        prepend-icon="mdi-tray-arrow-up"-->
      <!--      >-->
      <!--      </v-file-input>-->
      <v-avatar size="32" color="indigo">
        <v-icon dark>
          mdi-account
        </v-icon>
        <!--        <img-->
        <!--          src="https://cdn.vuetifyjs.com/images/john.jpg"-->
        <!--          alt="John"-->
        <!--        >-->
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import { getImageInfo } from '@/utils'
export default {
  name: 'UserContainer',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    async onUploadChange(f) {
      console.log(f.target.files)
      const imgInfo = await getImageInfo(f.target.files[0])
      console.log(imgInfo)
    }
  }
}
</script>
