import $api from "../api";
// import axios from "axios";
export const actions = {
    getList({ rootGetters }) {
		return new Promise(function (resolve) {
			$api
				.get(`${window.location.origin}/json/users.json`, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err) {
						resolve(err.response.data.message);
					}
				});
		});
	},
};

export default {
    namespaced: true,
    actions
};