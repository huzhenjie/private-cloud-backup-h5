<template>
  <v-responsive min-height="100%">
    <v-app-bar app elevate-on-scroll dense>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Gallery</v-toolbar-title>
      <v-spacer />
      <v-btn text color="grey darken-2" @click="$refs.upload.click()">
        <v-icon dense class="mr-1">mdi-tray-arrow-up</v-icon>
        Upload
      </v-btn>
      <input ref="upload" type="file" class="d-none" accept="image/*" multiple @change="onUploadChange">
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
    <v-main class="fill-height">
      <router-view />
      <upload-list-dlg ref="uploadDlg" />
    </v-main>
  </v-responsive>
</template>

<script>
import UploadListDlg from '@/components/User/Gallery/UploadListDlg'
import FileApi from '@/apis/file'
import { getFileInfo } from '@/utils'

export default {
  name: 'UserContainer',
  components: { UploadListDlg },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    async onUploadChange(f) {
      const { files } = f.target
      if (files.length === 0) {
        this.showUploadDlg()
        return
      }
      const file_info_list = []
      const file_list = []
      for (const file of files) {
        const file_info = await getFileInfo(file)
        file_info_list.push(file_info)
        file_list.push(file)
      }
      const res = await FileApi.applyUpload(file_info_list)
      const apply_infos = res.data
      for (const file of file_list) {
        const i = file_list.indexOf(file)
        const { chunks, id } = apply_infos[i]
        for (const { chunk_size, offset, upload_url } of chunks) {
          const chunk_file = file.slice(offset, chunk_size)
          await FileApi.upload(upload_url, chunk_file)
        }
        await FileApi.uploadCombine(id)
      }
      this.$refs.upload.value = ''
    },
    showUploadDlg() {
      this.$refs.uploadDlg.showDlg()
    }
  }
}
</script>
