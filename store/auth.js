export const state = () => ({
    isLoggedIn: false,
    user: {},
});

export const mutations = {
    user(state, user){
        state.isLoggedIn = !!user;
        state.user = user || {}
    },
    logout(state){
        state.isLoggedIn = false;
        state.user = {};
    }
}

export const actions = {
    user({ commit }, user){
        commit("user", user);
    },
    logout({ commit }){
        commit("logout");
    },
}