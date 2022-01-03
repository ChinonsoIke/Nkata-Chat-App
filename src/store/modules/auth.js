//store/modules/auth.js

import axios from 'axios';
const state = {
    user: null,
    token: null,
    chats: null,
    single: [],
    messageSent: null,
    contacts: null,
    addContactResponse: null,
};

const getters = {
    isLoggedIn: state => !!state.user,   // !!state.user is a boolean
    StateUser: state => state.user,
    UserToken: state => state.token,
    StateChats: state => state.chats,
    singleChat: state=> state.single,
    userContacts: state => state.contacts,
    addContactResponse: state => state.addContactResponse,
};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('/register', form)
        let LoginForm = new FormData()
        LoginForm.append('email', form.email)
        LoginForm.append('password', form.password)
        await dispatch('LogIn', LoginForm)
    },
    async LogIn({commit}, User) {
        await axios.post('/login', User)
        .then(response => {
            commit('setUser', response.data)
        })
    },
    async LogOut({commit}){
        let user = null
        commit('LogOut', user)
    },
    async GetChats({ commit }){
        axios.get('/chats')
        .then(response => {
            commit('SetChats', response.data.data.chats)
        })
    },
    async GetSingle({commit}, id){
        axios.get(`/chats/${id}`)
        .then(response => {
            commit('SetSingle', response.data.data.chats)
        })        
    },
    async sendMessage({dispatch}, messageBody) {
        axios.post('/messages/send', messageBody)
        .then(() => {
            dispatch('GetChats')
            dispatch('GetSingle', messageBody.to)
        })
        
    },
    async getContacts({commit}){
        axios.get('/contacts')
        .then(response => {
            commit('SetContacts', response.data)
        })
    },
    async addContact({dispatch, commit}, formData) {
        axios.post('/contacts/add', formData)
        .then(response => {
            // console.log(response.data)
            commit('AddContactResponse', response.data)
            dispatch('getContacts')
        })
        
    },
};
const mutations = {
    setUser(state, userData){
        state.user = userData.data.user
        state.token= userData.data.token
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.data.token}`
    },
    LogOut(state){
        state.user = null
        state.token = null
        localStorage.removeItem('user')
    },
    SetChats(state, chats){
        state.chats= chats
    },
    SetSingle(state, singleChat){
        state.single= singleChat
    },
    sendMessage(state){
        state.messageSent= true
    },
    SetContacts(state, contacts){
        state.contacts= contacts
    },
    AddContactResponse(state, data){
        state.addContactResponse= data
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
