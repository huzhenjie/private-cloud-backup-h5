<template>
  <v-snackbar
    v-model="$store.state.toast.show"
    :timeout="$store.state.toast.timeout"
    :color="$store.state.toast.color"
    center
    :top="$store.state.toast.align==='top'"
    :left="$store.state.toast.align==='left'"
    :right="$store.state.toast.align==='right'"
    :bottom="$store.state.toast.align==='bottom'"
    :centered="$store.state.toast.align==='centered'"
    multi-line
    text
    outlined
  >
    <p class="mb-0">
      <v-icon v-if="$store.state.toast.color === 'success'" color="success" class="mr-2">
        mdi-check-circle
      </v-icon>
      <v-icon v-else-if="$store.state.toast.color === 'error'" color="error" class="mr-2">
        mdi-alert-octagon
      </v-icon>
      <v-icon v-else-if="$store.state.toast.color === 'warning'" color="warning" class="mr-2">
        mdi-alert
      </v-icon>
      {{ $store.state.toast.msg }}
    </p>
  </v-snackbar>
</template>

<script>
export default {
  name: 'MyToast'
}
</script>

