const getters = {
  token: state => state.user.TokenKey, // 用户登录token
  userInfo: state => state.user.userInfo,
  loading: state => state.loading.loading,
  adress: state => state.adress.adress
}
export default getters
