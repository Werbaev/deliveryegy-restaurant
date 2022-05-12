<template>
  <div>
    <v-card flat tile style="width: 100vw" color="green lighten-2">
      <v-row class="mx-2 my-0" justify="space-between" align="center">
        <v-col cols="auto">
          <span class="display-1">Restaurant</span>
          <p class="title">{{ $store.state.user.name }}</p>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" style="margin: 0.4px 0px">
        <v-col cols="12">
          <v-tabs
            :ripple="false"
            background-color="#efeff4"
            v-model="tab"
            hide-slider
            slider-color="black"
            fixed-tabs
            class="tab_card"
          >
            <v-tab key="orders" active-class="colorDone">
              <v-badge color="green" :content="newOrders.length">
                New orders
              </v-badge>
            </v-tab>
            <v-tab key="proccess" active-class="colorDone">On Process</v-tab>
            <v-tab key="finished" active-class="colorDone">Ready</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4" flat tile color="transparent">
      <v-tabs-items v-model="tab" background-color="transparent">
        <v-tab-item
          active-class="colorDone"
          style="background-color: #e5e5e5 !important"
        >
          <New :orders="newOrders" />
        </v-tab-item>
        <v-tab-item style="background-color: #e5e5e5 !important">
          <Process :orders="restaurantProccess" />
        </v-tab-item>
        <v-tab-item style="background-color: #e5e5e5 !important">
          <Finish :orders="restaurantReady" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-footer fixed>
      <v-row justify="center">
        <v-col cols="auto" class="px-0">
          <v-btn elevation="0" color="red" dark rounded @click="leave"
            >Leave</v-btn
          >
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Finish from './finishedOrder'
import New from './newOrder'
import Process from './processOrder'
import Vendor from '../../services/vendor'
export default {
  data () {
    return {
      tab: 'new',
      restaurantProccess: [],
      restaurantReady: [],
      newOrders: []
    }
  },
  watch: {
    tab (value) {
      console.log(this.$route.query)

      switch (value) {
        case 0:
          this.$router
            .replace({
              query: {
                status: 'new'
              }
            })
            .catch((er) => {})
          break
        case 1:
          this.$router
            .replace({
              query: {
                status: 'restaurant-proccess'
              }
            })
            .catch((er) => {})
          break
        case 2:
          this.$router
            .replace({
              query: {
                status: 'restaurant-ready'
              }
            })
            .catch((er) => {})
          break

        default:
          break
      }
    }
  },
  methods: {
    leave () {
      localStorage.removeItem('user')
      this.$store.commit('REMOVE')
      window.location.reload()
    },
    getOrders () {
      Vendor.getOrderList().then((res) => {
        console.log(res)
        this.newOrders = res.orders.filter((el) => el.status === 'new')
        this.restaurantProccess = res.orders.filter(
          (el) => el.status === 'restaurant-proccess'
        )
        this.restaurantReady = res.orders.filter(
          (el) => el.status === 'restaurant-ready'
        )
      })
    }
  },
  components: { Finish, New, Process },
  created () {
    this.tab = this.$route.query.status ? this.$route.query.status : 'new'
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped>
.tab_card {
  border-radius: 12px !important;
  height: 56px;
  background: #efeff4 !important;
  padding: 5px;
}
.colorDone {
  background: rgb(231, 241, 245) !important;
  border-bottom: 12px !important;
  border-radius: 3px solid green;
}
</style>
