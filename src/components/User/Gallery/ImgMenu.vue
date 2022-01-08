<template>
  <v-menu
    v-model="show"
    :position-y="y"
    :position-x="x"
    absolute
    offset-y
  >
    <v-list dense>
      <v-list-item link @click="downloadImg">
        <v-list-item-title>Download</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="delImg">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import FileApi from '@/apis/file'
export default {
  name: 'ImgMenu',
  data() {
    return {
      show: false,
      x: 0,
      y: 0,
      img: null
    }
  },
  methods: {
    showMenu(x, y, img) {
      this.x = x
      this.y = y
      this.img = img
      this.show = true
    },
    delImg() {
      FileApi.delFile(this.img.id).then(() => {
        this.$emit('remove', this.img)
      })
    },
    downloadImg() {
      window.open(this.img.file_url, '_blank')
    }
  }
}
</script>
