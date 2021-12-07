<template>
  <div style="padding: 2px">
    <v-row no-gutters>
<!--      <v-col cols="3" v-for="i in 30" :key="i" style="padding: 2px">-->
<!--        <v-img src="https://picsum.photos/500/300"/>-->
<!--      </v-col>-->
      <v-col cols="3" v-for="(item, index) in imgs" :key="index" style="padding: 2px">
        <v-img :src="item.src"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      imgs: [
        {
          src: 'https://picsum.photos/500/300',
          width: 500,
          height: 300
        },
        {
          src: 'https://picsum.photos/1920/1080',
          width: 1920,
          height: 1080
        },
        {
          src: 'https://picsum.photos/1060/2240',
          width: 1060,
          height: 2240
        },
        {
          src: 'https://picsum.photos/100/100',
          width: 100,
          height: 100
        }
      ]
    }
  },
  created() {
    // const viewWidth = 100
    // const rowHeight = 24
  }
}
</script>
