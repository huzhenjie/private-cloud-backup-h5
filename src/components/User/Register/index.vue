<template>
  <v-card elevation="0" outlined max-width="500" class="ma-auto pa-4">
    <v-card-title>
      Create your Primary Cloud Account
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="username"
              label="Username"
              placeholder="Email"
              :rules="[ Rule.required ]"
              outlined
              dense
              required
              @keyup.enter="register"
            />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="nick"
              label="Nick"
              :rules="[ Rule.required ]"
              outlined
              dense
              required
              @keyup.enter="register"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="password"
              label="Password"
              :type="show_password ? 'text' : 'password'"
              hint="Use 8 or more characters"
              :rules="[ Rule.required ]"
              persistent-hint
              outlined
              dense
              required
              @keyup.enter="register"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="confirm_password"
              label="Confirm"
              :type="show_password ? 'text' : 'password'"
              placeholder="Confirm Password"
              :rules="[ Rule.required ]"
              outlined
              dense
              required
              @keyup.enter="register"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-checkbox
        v-model="show_password"
        label="Show password"
        dense
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        class="text-none"
        @click="register"
      >
        Sign in instead
      </v-btn>
      <v-spacer />
      <v-btn
        elevation="0"
        color="primary"
        class="text-none"
        @click="register"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Rule from '@/rules'
import { register } from '@/apis/user'
export default {
  name: 'Register',
  data() {
    return {
      Rule,
      valid: false,
      loading: false,
      show_password: false,
      nick: '',
      username: '',
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    register() {
      const validOk = this.$refs.form.validate()
      if (!validOk) {
        return
      }
      if (this.password !== this.confirm_password) {
        this.$store.dispatch('toast/error', 'Password and Confirm Password are not same')
        return
      }
      this.loading = true
      register({
        username: this.username,
        nick: this.nick,
        pwd: this.password
      }).then(res => {
        this.loading = false
        this.$store.dispatch('toast/success', 'Register Success')
      }).catch(e => {
        this.loading = false
        this.$store.dispatch('toast/error', e.message)
      })
    }
  }
}
</script>
