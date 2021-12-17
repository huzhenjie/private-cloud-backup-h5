<template>
  <div style="padding: 2px">
    <v-row no-gutters>
      <v-col v-for="(item, index) in items" :key="index" cols="3" style="padding: 2px">
        <v-img :src="item.file_url" height="250" @click="showImg(item)" @contextmenu="showMenu($event, item)">
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
      </v-col>
    </v-row>
    <img-dlg ref="imgDlg" />
    <img-menu ref="imgMenu" />
  </div>
</template>

<script>
import FileApi from '@/apis/file'
import ImgMenu from '@/components/User/Gallery/ImgMenu'
import ImgDlg from '@/components/User/Gallery/ImgDlg'
export default {
  name: 'Gallery',
  components: { ImgDlg, ImgMenu },
  data() {
    const host = process.env.VUE_APP_BASE_API.substr(0, process.env.VUE_APP_BASE_API.length - 1)
    return {
      loading: false,
      query: {
        host,
        last_id: 0,
        last_file_time: 0
      },
      items: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      Object.assign(this.query, {
        last_id: 0,
        last_file_time: 0
      })
      this.getImgList()
    },
    getImgList() {
      this.loading = true
      const { last_id, last_file_time } = this.query
      FileApi.getImgList(last_id, last_file_time).then(res => {
        this.loading = false
        const { items, last_file_time, last_id } = res.data
        this.items = items.map(item => {
          item.file_url = this.query.host + item.file_url
          return item
        })
        Object.assign(this.query, {
          last_file_time,
          last_id
        })
      })
    },
    showImg(img) {
      this.$refs.imgDlg.showDlg(img)
    },
    showMenu(e, item) {
      e.preventDefault()
      this.$nextTick(() => {
        this.$refs.imgMenu.showMenu(e.clientX, e.clientY, item)
      })
    }
  }
}
</script>
