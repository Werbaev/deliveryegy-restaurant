<template>
 <v-app id="inspire">

  <v-app-bar app v-if="false">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main class="py-0 my-0">
    <!-- Provides the application the proper gutter -->
    <v-container fluid class="pa-0 overflow-hidden">
      <transition name="component-fade" mode="out-in">
      <router-view></router-view>
      </transition>
      <Login />
    </v-container>
  </v-main>
</v-app>
</template>

<script>
import Login from './views/login'
export default {
  components: {
    Login
  },
  data: () => ({
  }),
  created () {
    // this.$vuetify.theme = 'dark'
  }
}
</script>
<style scoped>
#inspire {
  padding: 0px !important;
  background: #E5E5E5;
}
.trueClass {
  background: red;
}
.startLunk {
  background: rgba(15, 158, 214, 0.37);
  color: rgb(10, 84, 223) !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
