<template>
  <div>
    <v-card flat color="#22B573" class="pa-2" tile>
      <v-btn fab text small @click="$router.go(-1)"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-card-title v-if="order.guid">Order №{{  order.guid.substring(0, 6) || ''}}</v-card-title>
    </v-card>
    <!-- Courier list -->
    <v-card height="72" class="my-2 px-4" tile flat>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <label for="">Courier</label>
          <p>{{ courierName(order) }}</p>
        </v-col>
        <v-col cols="auto">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="12" fill="#E6F1F4" />
            <path
              d="M21.366 22.682C22.3043 24.3305 23.6695 25.6957 25.318 26.634L26.202 25.396C26.3442 25.1969 26.5543 25.0569 26.7928 25.0023C27.0313 24.9478 27.2814 24.9825 27.496 25.1C28.9103 25.8729 30.4722 26.3378 32.079 26.464C32.3298 26.4839 32.5638 26.5975 32.7345 26.7823C32.9052 26.9671 33 27.2094 33 27.461V31.923C33.0001 32.1706 32.9083 32.4094 32.7424 32.5932C32.5765 32.777 32.3483 32.8927 32.102 32.918C31.572 32.973 31.038 33 30.5 33C21.94 33 15 26.06 15 17.5C15 16.962 15.027 16.428 15.082 15.898C15.1073 15.6517 15.223 15.4235 15.4068 15.2576C15.5906 15.0917 15.8294 14.9999 16.077 15H20.539C20.7906 15 21.0329 15.0948 21.2177 15.2655C21.4025 15.4361 21.5161 15.6702 21.536 15.921C21.6622 17.5278 22.1271 19.0897 22.9 20.504C23.0175 20.7186 23.0522 20.9687 22.9977 21.2072C22.9431 21.4456 22.8031 21.6558 22.604 21.798L21.366 22.682ZM18.844 22.025L20.744 20.668C20.2048 19.5041 19.8354 18.2688 19.647 17H17.01C17.004 17.166 17.001 17.333 17.001 17.5C17 24.956 23.044 31 30.5 31C30.667 31 30.834 30.997 31 30.99V28.353C29.7312 28.1646 28.4959 27.7952 27.332 27.256L25.975 29.156C25.4287 28.9437 24.898 28.6931 24.387 28.406L24.329 28.373C22.3676 27.2567 20.7433 25.6324 19.627 23.671L19.594 23.613C19.3069 23.102 19.0563 22.5713 18.844 22.025Z"
              fill="#22B573"
            />
          </svg>
        </v-col>
      </v-row>
    </v-card>
    <!-- Product list -->
    <v-card class="my-2 px-4" tile flat>
      <v-list subheader>
        <v-subheader>Products</v-subheader>

        <v-list-item v-for="(chat, i) in order.products" :key="chat.title">

          <v-list-item-content>
            <v-list-item-title v-text="i+1 + '. ' + chat.name"></v-list-item-title>
            <!-- <v-list-item-subtitle class="text--gray" v-text="chat.des"></v-list-item-subtitle> -->
          </v-list-item-content>

          <v-list-item-icon>
           <span>{{ chat.price }}</span>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
          <v-row justify="space-between" >
              <v-col cols="auto"><span class="body font-weight-bold">Total price:</span></v-col>
              <v-col cols="auto"><span class="body font-weight-bold">{{ orderPrice(order.products) }} uzs</span></v-col>
          </v-row>
      </v-card-actions>
    </v-card>
    <!-- Product comment -->
    <v-card class="my-2 px-4" tile flat>
      <v-card-title class="pa-2 font-weight-bold">Comments</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>{{ order.comment }}</v-card-subtitle>
    </v-card>
    <!-- Card footer -->
    <v-footer height="72" fixed v-if="statusOfOrder.text">
      <v-row justify="center">
        <v-col cols="12">
          <v-btn elevation="0" :loading="loading" dark @click="updateStatus()" :color="statusOfOrder.color" v-text="statusOfOrder.text" block large class="text-capitalize" rounded>
            <v-icon></v-icon>
           </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Vendor from '../../../services/vendor'
export default {
  computed: {
    statusOfOrder () {
      switch (this.$route.query.status) {
        case 'orders':
          return { text: 'Accept order', color: 'orange darken-1' }
        case 'restaurant-proccess':
          return { text: 'Ready', color: '#22B573' }
        case 'restaurant-ready':
          return { text: '', color: '' }
        default:
          return { text: 'Accept order', color: 'orange darken-1' }
      }
    }
  },
  data () {
    return {
      order: {},
      loading: false,
      recent: [
        {
          active: true,
          price: '15 000 сум',
          title: '1 x Гамбургер',
          des: 'без сыра'
        },
        {
          active: true,
          price: '100 000 сум',
          title: '2 x Лаваш',
          des: 'без майонеза'
        }
      ]
    }
  },
  methods: {
    courierName (item) {
      if (!item.courier_id) {
        return 'No courier assigned yet'
      } else {
        Vendor.getCourier(item.courier_id).then(res => {
          console.log(res)
        })
      }
    },
    orderPrice (list = []) {
      return list.reduce((acc, curr) => {
        acc = acc + curr.price
        return acc
      }, 0)
    },
    getOrderById (id) {
      Vendor.getOrderById(id).then(res => {
        console.log(res)
        this.order = res
      })
    },
    updateStatus () {
      this.loading = true
      let status = this.$route.query.status
      switch (this.$route.query.status) {
        case 'new':
          status = 'restaurant-proccess'
          break
        case 'restaurant-proccess':
          status = 'restaurant-ready'
          break
        // case 'restaurant-ready':
        //   status = 'courier-accepted'
        //   break;
        default:
          status = 'restaurant-proccess'

          break
      }
      console.log(this.order)
      const formData = {
        address: this.order.address,
        branch_id: this.order.branch_id,
        comment: this.order.comment,
        delivery_type: this.order.delivery_type,
        guid: this.order.guid,
        payment_type: this.order.payment_type,
        product_id: this.order.products.map(el => el.id),
        status,
        user_id: this.order.user_id
      }
      Vendor.updateOrder(formData).then(res => {
        this.$router.replace({
          query: {
            status
          }
        })
        this.order = {
          ...this.order,
          status
        }
        this.loading = false
        alert('Successfully updated ')
        console.log(this.order)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getOrderById(this.$route.params.id)
  }
}
</script>

<style>
</style>
