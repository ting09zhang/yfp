import { getUserInfo } from '@/api/login.js'
import { mapGetters } from 'vuex'
export default {

    data() {
        return {}
    },
    methods: {
        getUserInfos() {
            getUserInfo({ token: this.token }).then(res => {
                this.$store.commit('user/getUserInfo', res.data.user)
            })
        }
    },

    computed: {
        ...mapGetters(['token'])
    }

}