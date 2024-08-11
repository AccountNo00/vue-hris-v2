<script>
import { mapActions,mapGetters } from "vuex";
import Swal from 'sweetalert2'
import appConfig from "@/app.config";
import { required, helpers } from "@vuelidate/validators";
/**
 * Login component
 */
export default {
	page: {
		title: "Login",
		meta: [
			{
				name: "description",
				content: appConfig.description,
			},
		],
	},
	components: {
	},
	data() {
		return {
			username: "admin",
			password: "password",
			pl:{
				username: '',
				password: ''
			},
		};
	},
	validations: {
		username: {
			required: helpers.withMessage("username is required", required),
		},
		password: {
			required: helpers.withMessage("Password is required", required),
		},
	},
	computed:{
        ...mapGetters('auth', ['profile']),
	},
	methods: {
        ...mapActions('auth', {
            authAdmin: 'loginSeller',
            newUser: 'register',
        }),
		...mapActions("auth", {
			getAuthProfile: "getProfile",
		}),
		async profileInterval() {
			await this.getAuthProfile();
		},
		async tryToLogIn() {
			// this.submitted = true;
			// this.v$.$touch();

			// if (this.v$.$invalid) {
			// 	return;
			// } else {
            //     var fd = new FormData();
            //     fd.append('username', this.username);
            //     fd.append('password', this.password);
            //     const res = await this.authAdmin(fd);
            //     if (res.status === 'success' || res.status === 200) {
			// 		this.profileInterval();
            //         this.$router.replace({ path: '/' }).catch(() => {});
            //     }else{
            //         Swal.fire({
            //             html: res,
            //             type: "error",
            //             icon: "error",
            //             padding: "2em",
            //         });
			// 	}
			// }
			if(this.username == this.pl.username && this.password == this.pl.password){
				this.$router.replace({ path: '/' }).catch(() => {});
			}else{
				Swal.fire({
					html: 'Invalid Credentials',
					type: "error",
					icon: "error",
					padding: "2em",
				});
			}
		},
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
	},
	mounted() {
	},
};
</script>

<template>
	<div class="login-container">
		<label class="px-4 pt-2 fs-1 text-secondary">LOGIN</label>
		<div class="px-3 pt-2">
			<div class="mb-3">
				<label class="text-secondary">Username</label>
				<input @keyup.enter="tryToLogIn()" v-model="pl.username" type="text" class="form-control custom-login-input fs-5" placeholder="Ex:(user01)"/>
			</div>
			<div class="mb-3">
				<label class="text-secondary">Password</label>
				<input @keyup.enter="tryToLogIn()" v-model="pl.password" type="password" class="form-control custom-login-input fs-5"/>
			</div>
			<div class="mb-3 d-flex justify-content-between align-center">
				<label class="text-secondary">
					<input type="checkbox"/>
					Remember me?
				</label>
				<h6 class="text-secondary cursor-pointer">
					Forgot password?
				</h6>
			</div>
			<div>
				<button class="custom-btn custom-btn-dark p-2 w-100" @click="tryToLogIn()">LOGIN</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
.eye-width {
    border-radius: 0px !important;
}
.eye-btn {
    background-color: transparent;
    border: none;
    border-radius: 0px !important;
	position: absolute;
	right: 40px;
	margin-top: 8px;
	color: rgb(95, 95, 95) !important;
}
</style>