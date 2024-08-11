import $api from "../api";
import router from "../../router/index";
import $cookies from "vue-cookies";
export const state = {
    token: $cookies.get("token"),
    type: 1,
    id: 1,
    profile: {
        id: "",
        username: "",
        first_name: "",
        image: "",
        cover: "",
        last_name: "",
        contact_number: "",
        email_address: "",
        role: "",
        address: "",
        birthday: "",
        mode: "light",
        access: [],
        abilities: [],
    }
};
export const actions = {
    loginSeller({ commit }, pl) {
        return new Promise(function (resolve) {
            $api
                .post("auth/seller/login", pl)
                .then(function (res) {  
                    if (res.status == 200 || res.status == 'success') {
                        console.log(res.data)
                        commit("setToken", res.data.data);
                        resolve(res);
                    }
                })
                .catch(function (err) {
                    if(err){
                        resolve(err.response.data.message)
                    }
                });
        });
    },
    logoutUser({ commit, getters }) {
        return new Promise(function (resolve) {
            $api
                .get("auth/logout", {
                    headers: { Authorization: getters.bearer_token },
                })
                .then(function () {
                    commit("destroyAuth");
                    resolve(true);
                })
                .catch(function () {
                    commit("destroyAuth");
                    resolve(true);
                });
        });
    },
    getProfile({ commit, getters }) {
        return new Promise(function (resolve) {
            $api
                .get(
                    "auth/profile", {
                    headers: { Authorization: getters.bearer_token },
                }
                )
                .then(function (res) {
                    if (res.status === 200) {
                        commit("setProfile", res.data.data);
                    }
                    resolve(true);
                })
                .catch(function (err) {
                    if(err){
                        resolve(err)
                    }
                });

        });
    },
};

export const mutations = {
    setToken(state, data) {
        var token = `${data.token_type} ${data.access_token}`;
        $cookies.set("token", token);
        // state.access = data.abilities.split(",");
        // state.abilities = data.abilities.split(",");
        state.token = token;
    },
    register() {
        this.$router.push({path:"/login"});
    },
    setProfile(state, data) {
        state.profile.id = data._id
        state.profile.username = data.username
        state.profile.first_name = data.first_name
        state.profile.last_name = data.last_name
        state.profile.image = data.image
        state.profile.cover = data.cover
        state.profile.contact_number = data.contact_number
        state.profile.email_address = data.email_address
        state.profile.role = data.role
        state.profile.address = data.address
        state.profile.birthday = data.birthday
        state.profile.mode = data.mode
        // state.profile.abilities = data.abilities;
        // state.access = data.abilities.split(",");
        // state.abilities = data.abilities.split(",");
    },
    destroyAuth(state) {
        $cookies.remove("token");
        state.profile.id = null
        state.profile.username = null
        state.profile.first_name = null
        state.profile.last_name = null
        state.profile.contact_number = null
        state.profile.email_address = null
        state.profile.role = null
        state.profile.address = null
        state.profile.birthday = null
        state.profile.abilities = null;
        state.profile.mode = null;
        router.replace({ path: "/login" }).catch(() => { });
    }
};
export const getters = {
    authenticated(state) {
        return state.token != null;
    },
    bearer_token(state) {
        return 'Bearer ' + state.token;
    },
    profile(state) {
        return state.profile;
    },
    access(state) {
        var arr = [...state.access]
        if (state.access.includes("/user")) {
            arr.push("/role-management")
            arr.push("/company-management")
            arr.push("/department-management")
            console.log(arr)
        }
        return arr
    },
};