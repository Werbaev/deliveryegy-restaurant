import request from '@/utils/axios'

const req = {
  postVendorUser: (data) => request({ method: 'post', url: '/vendor-user/create', data }),
  putVendorUser: (data) => request({ method: 'put', url: '/vendor-user/update', data }),
  getVendorUsers: (data) => request({ method: 'get', url: '/vendor-user/list', data }),
  getVendorUser: (id, data) => request({ method: 'get', url: `/vendor-user/get/${id}`, data }),
  deleteVendorUser: (data) => request({ method: 'delete', url: '/vendor-user/delete', data }),
  loginVendor: (data) => request({ method: 'post', url: '/vendor-user/login', data }),
  getOrderList: (params) => request({ method: 'get', url: '/order/list', params }),
  getOrderById: (id) => request({ method: 'get', url: '/order/get/' + id }),
  updateOrder: (data) => request({ method: 'put', url: '/order/update', data }),
  getCourier: (id) => request({ method: 'get', url: '/courier/get/' + id })
}
export default req
