<template>
  <div v-if="dialog">
    <v-navigation-drawer
      absolute
      permanent
      right
      color="grey lighten-4"
    >
      <template v-slot:prepend>
        <v-toolbar
          dark
          color="primary darken-2"
          elevation="0"
          class="mt-1"
          dense
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>上传列表</v-toolbar-title>
          <!--          <v-spacer />-->
          <!--          <v-toolbar-items>-->
          <!--            <v-btn-->
          <!--              dark-->
          <!--              text-->
          <!--              @click="dialog = false"-->
          <!--            >-->
          <!--              关闭-->
          <!--            </v-btn>-->
          <!--          </v-toolbar-items>-->
        </v-toolbar>
      </template>
      <v-subheader>
        上传中
      </v-subheader>
      <v-list three-line />
      <v-subheader>
        已完成
      </v-subheader>
      <v-list dense />
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'UploadListDlg',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    showDlg() {
      console.log('xxx')
      this.dialog = true
    }
  }
}
</script>
