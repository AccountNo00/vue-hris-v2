<template>
	<router-view></router-view>
</template>

<script>
import { mapGetters } from 'vuex';
import '../src/design/css/custom.css'
export default {
	name: "App",
	components: {},
	computed:{
        ...mapGetters('auth', ['profile']),
	},
	mounted(){
		var body = document.getElementById("body");
		
		if(this.$route.path == '/login'){
			body.classList.add("body-light");
		}else{
			if(this.profile.mode == 'dark'){
				body.classList.add("body-dark");
			}else{
				body.classList.add("body-light");
			}
		}
	},
};
</script>
<style >
/* body {
	background: #16181b !important;
} */
.body-dark{
	background: #16181b !important;
}
.body-light{
	background: #e7e7e7 !important;
}
.vertical-menu {
	position: fixed !important;
	top: 50px !important;
}
.main-content {
	margin-left: 200px !important;
}
.page-content {
	padding: calc(50px) 0 !important;
}
.container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
	width: 100%;
	padding-right: 0 !important;
	padding-left: 0 !important;
	margin-right: auto;
	margin-left: auto;
}
</style>