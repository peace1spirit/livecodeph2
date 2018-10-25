import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
Vue.use(Vuex)

const myaxios = axios.create({
  baseURL: 'http://localhost:3000'
})
/* eslint-disable */
export default new Vuex.Store({
  state: {
    isLogin: false,
    iduser: '',
    items:[],
    currentuser:null
  },
  mutations: {
    STATUS_LOGIN (state, payload) {
      state.isLogin = payload.status
      state.iduser = payload.iduser
    },
    SETSNIPPET (state, payload) {
      state.items = payload
    },
    SETUSER(state, payload) {
      state.currentuser = payload
    },
  },
  actions: {  
    logout ({ commit }, payload) {
      localStorage.clear()
      commit('STATUS_LOGIN', { status: false, iduser: '' })
      router.push('/')
    },
    setLogin ({ commit }, payload){
      console.log('setloginnn',payload)
      commit('STATUS_LOGIN', { status: true, iduser: payload.id })
    },
    setSnippet ({ commit }, payload){
      console.log('setSnippet',payload)
      commit('SETSNIPPET', payload)
    },
    checkToken ( context , payload) {
      
      let token =localStorage.getItem('token')
       if(token){
        myaxios.get(`/users/`, {
            headers: { token: token }
        })
        .then(({data}) => {
          console.log('ini cehkkkkk',data)
          context.commit('STATUS_LOGIN', { status: true, iduser: data.user.id })
        })
        .catch((err) => {
            console.log(err)
        });
      }
      
    },
    getuser ( context , payload) {  
      let token =localStorage.getItem('token')
       if(token){
        myaxios.get(`/users/getuser`, {
            headers: { token: token }
        })
        .then(({data}) => {
          console.log('ini cSETUSER',data)
          context.commit('SETUSER', { status: true, iduser: data.user })
        })
        .catch((err) => {
            console.log(err)
        });
      }
      
    }
      
    
  }
})
