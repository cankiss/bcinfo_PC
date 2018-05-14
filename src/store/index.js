import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store()

store.registerModule('followStatus', {
    state: {
        isFollow: false
    },
    mutations: {
        updateFollowStatus(state, payload) {
            state.isFollow = payload.isFollow;
        }
    }
})

export default store