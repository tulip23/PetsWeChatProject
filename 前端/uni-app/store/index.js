import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
        uerInfo: {},  
        hasLogin: false  
    },
    mutations: {
        login(state, provider) {//改变登录状态  
            state.hasLogin = true 
            state.uerInfo.token = provider.token  
            state.uerInfo.user_id = provider.user_id
            uni.setStorage({//将用户信息保存在本地  
                key: 'uerInfo',  
                data: provider
            })
        },  
        logout(state) {//退出登录  
            state.hasLogin = false  
            state.uerInfo = {}  
            uni.removeStorage({  
                key: 'uerInfo'  
            })  
        }  
    }  
});

export default store