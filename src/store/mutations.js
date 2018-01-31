import * as types from './mutation-types'

const mutations = {
    [types.SET_NAME](state, name) {
        state.name = name
    }
}