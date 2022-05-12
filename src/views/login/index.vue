<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      overlay-color="indigo"
      overlay-opacity="0.5"
      max-width="390"
    >
      <v-card>
        <v-card-title class="text-h6">
        Verify yourself to 🔓 <strong>Unlock</strong>
        </v-card-title>
        <v-card-text>
            <v-text-field color="green darken-1" v-model="user.login" label="Login"></v-text-field>
            <v-text-field color="green darken-1" @keypress.enter="login" v-model="user.password" label="Password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            outlined
            color="green darken-1"
            text
            @click="login"
            :loading="loading"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Vendor from '../../services/vendor'

export default {
  data () {
    return {
      dialog: true,
      loading: false,
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      Vendor.loginVendor({
        ...this.user
      }).then(res => {
        if (res.exist) {
          console.log({
            name: res.name ? res.name : 'default',
            ...res
          })
          this.$store.commit('SET_LOGIN', {
            name: res.name ? res.name : 'default',
            ...res
          })
          this.dialog = false
        } else {
          alert('Wrong login or password')
          this.user = {}
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.dialog = !this.$store.state.user
  }
}
</script>
