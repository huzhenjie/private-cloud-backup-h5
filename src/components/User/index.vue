<template>
  <v-responsive min-height="100%">
    <v-app-bar app elevate-on-scroll dense>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Gallery</v-toolbar-title>
      <v-spacer />
      <v-btn text color="grey darken-2" class="text-none" @click="$refs.upload.click()">
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
      <router-view ref="routerView" />
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
      drawer: false,
      uploading: false
    }
  },
  methods: {
    async onUploadChange(f) {
      const { files } = f.target
      if (files.length === 0) {
        this.showUploadDlg()
        return
      }
      this.uploading = true
      const file_info_list = []
      const file_list = []
      for (const file of files) {
        const file_info = await getFileInfo(file)
        file_info_list.push(file_info)
        file_list.push(file)
      }
      let success_count = 0
      try {
        const res = await FileApi.applyUpload(file_info_list)
        const apply_infos = res.data
        let fail_count = 0
        for (const file of file_list) {
          const i = file_list.indexOf(file)
          const { chunks, id } = apply_infos[i]
          for (const { chunk_size, offset, upload_url } of chunks) {
            const chunk_file = file.slice(offset, offset + chunk_size)
            await FileApi.upload(upload_url, chunk_file)
          }
          const { code, msg } = await FileApi.uploadCombine(id)
          if (code === 200) {
            success_count++
          } else {
            fail_count++
            await this.$store.dispatch('toast/error', msg)
          }
        }
        this.uploading = false
        let toast_tip = ''
        let toast_type = 'success'
        if (success_count > 0) {
          toast_tip = `Success: ${success_count}`
          const route_view_init = this.$refs.routerView.init
          route_view_init && route_view_init()
        }
        if (fail_count > 0) {
          if (toast_tip) {
            toast_tip += ', '
            toast_type = 'warning'
          } else {
            toast_type = 'error'
          }
          toast_tip = `${toast_tip}Fail: ${fail_count}`
        }
        if (toast_tip) {
          await this.$store.dispatch('toast/' + toast_type, toast_tip)
        }
      } catch (e) {
        await this.$store.dispatch('toast/error', e.message)
      } finally {
        this.$refs.upload.value = ''
        // if (success_count > 0) { }
      }
    },
    showUploadDlg() {
      this.$refs.uploadDlg.showDlg()
    }
  }
}
</script>
