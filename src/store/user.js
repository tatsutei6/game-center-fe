import axios from 'axios'

export default {
    state: {
        id: '', username: '', avatarUrl: '', token: '', isLogin: false, pullingInfo: true  // 是否正在从云端拉取信息
    },
    getters: {},
    mutations: {
        updateUser(state, user) {
            state.id = user.id
            state.username = user.username
            state.avatarUrl = user.avatarUrl
            state.isLogin = user.isLogin
        },
        updateToken(state, token) {
            state.token = token
        },
        logout(state) {
            state.id = ''
            state.username = ''
            state.avatarUrl = ''
            state.token = ''
            state.isLogin = false
        },
        updatePullingInfo(state, pullingInfo) {
            state.pullingInfo = pullingInfo
        }
    },
    actions: {
        login(context, payload) {
            axios.post('http://127.0.0.1:8080/play/user/login', {
                username: payload.username, password: payload.password
            }).then(function(response) {
                const responseData = response.data
                if (responseData.message === 'success') {
                    const token = responseData.data
                    localStorage.setItem('jwt_token', token)
                    context.commit('updateToken', token)
                    if (payload.onSuccess) {
                        payload.onSuccess(responseData)
                    }
                } else {
                    if (payload.onFail) {
                        payload.onFail(responseData.message)
                    }
                }
            }).catch(function(error) {
                if (payload.onFail) {
                    payload.onFail(error.message)
                }
            })
        },
        me(context, payload) {
            const token = context.state.token || localStorage.getItem('jwt_token')
            axios.get('http://127.0.0.1:8080/play/user/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(function(response) {
                const responseData = response.data
                context.commit('updateUser', {
                    id: responseData.data.id,
                    username: responseData.data.username,
                    avatarUrl: responseData.data.avatarUrl,
                    isLogin: true
                })
                if (responseData.message === 'success') {
                    if (payload.onSuccess) {
                        payload.onSuccess(responseData)
                    }
                }else {
                    if (payload.onFail) {
                        payload.onFail(responseData.message)
                    }
                }

            }).catch(function(error) {
                if (payload.onFail) {
                    payload.onFail(error.message)
                }
            })
        },
        logout(context) {
            localStorage.removeItem('jwt_token')
            context.commit('logout')
        }
    }, modules: {}
}