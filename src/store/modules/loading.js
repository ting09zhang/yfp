
export default {
  namespace:true,
state :{
  loading: false
  },
  mutations : {
  // ypt全局loding
  showLoading(state) {
    state.loading = true
  },
  hideLoading(state) {
    state.loading = false
  }
}


}