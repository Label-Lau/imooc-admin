import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import router from '@/router'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(
            /**
             * @param {string} data.token
             *  */
            (data) => {
              commit('setToken', data.token)
              resolve()
            }
          )
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      /**
       * @param {string} res.avatar - 用户头像
       * */
      commit('setUserInfo', res)
      return res
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
