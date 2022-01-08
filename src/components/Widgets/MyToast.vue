<template>
  <v-snackbar
    v-model="toast.show"
    :timeout="toast.timeout"
    :color="toast.color"
    :top="toast.align === 'top'"
    :left="toast.align === 'left'"
    :right="toast.align === 'right'"
    :bottom="toast.align === 'bottom'"
    :centered="toast.align === 'center'"
    multi-line
    text
    outlined
  >
    <p class="mb-0">
      <v-icon :color="iconColor" class="mr-2" v-text="icon" />
      {{ toast.msg }}
    </p>
  </v-snackbar>
</template>

<script>
export default {
  name: 'MyToast',
  computed: {
    toast() {
      return this.$store.state.toast
    },
    iconColor() {
      return this.toast.color || 'info'
    },
    icon() {
      switch (this.iconColor) {
        case 'success':
          return 'mdi-check-circle'
        case 'error':
          return 'mdi-alert-octagon-outline'
        case 'warning':
          return 'mdi-alert-outline'
        case 'info':
        default:
          return 'mdi-information-outline'
      }
    }
  }
}
</script>

