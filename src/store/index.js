import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";
import http from '@/util/http'
Vue.use(Vuex)

export default new Vuex.Store({
    // plugins: [createPersistedState()],
    // 公共状态
    state: {
        cityname: '上海',
        cityId: '310100',
        cinemasList: [],
        isFootShow: true
    },

    getters: {},

    // 统一管理，可以被devtools记录状态的修改
    // 只能支持同步
    mutations: {
        // mutation(事件类型，回调函数)
        changeCityName(state, name) {
            // console.log(cityname);
            state.cityname = name
        },
        changeCityId(state, Id) {
            state.cityId = Id
        },
        changeCinemasList(state, data) {
            state.cinemasList = data
        },
        clearCinemasList(state) {
            state.cinemasList = []
        },
        show(state) {
            state.isFootShow = true
        },
        hide(state) {
            state.isFootShow = false
        }
    },

    // 支持异步和同步
    actions: {
        getCinemasData(state, cityId) {
            return http({
                url: `/gateway?cityId=${cityId}&ticketFlag=1&k=2756676`,
                headers: {
                    "X-Host": "mall.film-ticket.cinema.list"
                }
            }).then(res => {
                state.commit('changeCinemasList', res.data.data.cinemas)
            })
        }
    },

    modules: {}
})