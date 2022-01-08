<template>
  <v-card elevation="0" outlined width="500" class="ma-auto pa-4">
    <v-card-title>
      Login
    </v-card-title>
    <v-card-subtitle>
      to continue to Private Cloud
    </v-card-subtitle>
    <v-card-text class="mt-4">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-text-field
              v-model="username"
              label="Username"
              placeholder="Email"
              :rules="[ Rule.required ]"
              outlined
              required
              @keyup.enter="login"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              label="Password"
              :type="show_password ? 'text' : 'password'"
              :rules="[ Rule.required ]"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              outlined
              required
              @keyup.enter="login"
              @click:append="show_password = !show_password"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        class="text-none"
        @click="gotoRegister"
      >
        Create account
      </v-btn>
      <v-spacer />
      <v-btn
        elevation="0"
        color="primary"
        class="text-none"
        @click="login"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Rule from '@/rules'
export default {
  name: 'Login',
  data() {
    return {
      Rule,
      valid: false,
      show_password: false,
      username: this.$route.params.username || '',
      password: ''
    }
  },
  methods: {
    login() { },
    gotoRegister() {
      this.$router.push({
        name: 'Register',
        params: {
          username: this.username
        }
      })
    }
  }
}
</script>
