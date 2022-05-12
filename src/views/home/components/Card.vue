<template>
  <div>
    <v-card  class="mb-2" height="130" color="white" style="border: 1px solid red" tile flat @click="$router.push({
      path: '/product/' + element.guid,
      query
    })">
      <v-card-title class="text-h5 pa-2">
            <v-row justify="space-between" align="center">
                <v-col cols="auto">
                    Order <strong>{{ element.guid.substring(0, 6) }}</strong>
                </v-col>
            </v-row>
        </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle class="pa-2 px-1">
        <v-row>
          <v-col cols="auto">
            <v-btn text class="text-lowercase">
              <v-icon left size="24" color="green">mdi-bike</v-icon> {{ element.delivery_price }} uzs
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col cols="auto">
            <v-btn text class="text-lowercase">
              <v-icon left size="24" color="green">mdi-cash</v-icon> {{ getProductCost(element.products) }} uzs
            </v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['status', 'query', 'element'],
  methods: {
    getProductCost (list = []) {
      if (!list) return 0
      return list.reduce((acc, curr) => {
        acc = acc + curr.price
        return acc
      }, 0)
    }
  }
}
</script>

<style>
</style>
