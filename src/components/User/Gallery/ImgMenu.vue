<template>
  <v-menu
    v-model="show"
    :position-y="y"
    :position-x="x"
    absolute
    offset-y
  >
    <v-list dense>
      <v-list-item link>
        <v-list-item-title>下载图片</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>删除图片</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
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
    }
  }
}
</script>
