import {createStore} from 'vuex'

export default createStore({
    state: {
        app: {
            "name": "CYPHERSTASH",
            "version": "1.0.0",
            "host": "http://" + window.location.hostname + ":" + window.location.port,
        },
        user: JSON.parse(localStorage.getItem("user")) || "",
        tabName: 'HOME'
    },
    mutations: {
        SET_USERINFO: (state, user) => {
            state.user = user
            localStorage.setItem("user", JSON.stringify(user))
        },
        REMOVE_INFO: (state) => {
            state.user = ""
            localStorage.removeItem("user")
        }
    },
    getters: {
        getAppName: state => {
            return state.app.name
        },
        getUser: state => {
            return state.user
        },
        getUserName: state => {
            return state.user.username
        },
        getHost: state => {
            return state.app.host
        }
    },
    actions: {},
    modules: {}
})
