export const state = () => ({
    userInfo: {
        token: "",
        user: {}
    }
})

export const mutations = {
    //设置用户数据
    setUserInfo(state, data) {
        state.userInfo = data
    },

    //清除用户数据
    clearUserInfo(state){
        state.userInfo = {
            token: "",
            user: {}
        }
    }
}


export const actions ={
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data
            //保存到state
            commit('setUserInfo', data);
            return data

        })
    }
}