<template>
  <v-overlay v-model="dialog" @click="dialog=false">
    <v-card class="mx-auto" transition>
      <v-img :src="img.file_url" max-height="100vh" max-width="70vw" contain>
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-skeleton-loader
              class="mx-auto"
              width="90%"
              type="image"
            />
          </v-row>
        </template>
      </v-img>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'ImgDlg',
  data() {
    return {
      dialog: false,
      img: {
        file_url: ''
      }
    }
  },
  methods: {
    showDlg(img) {
      this.dialog = true
      this.img = img
    }
  }
}
</script>

