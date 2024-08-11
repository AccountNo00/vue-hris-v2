<script>
import '../design/css/custom.css'
import { mapGetters } from 'vuex';
export default {
	props: {
		user: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	components: {
	},
	data() {
		return {
		};
	},
	computed:{
        ...mapGetters('auth', ['profile']),
	},
	mounted() {
	},
};
</script>

<template>
	<div class="breadcrumbs" :class="this.profile.mode == 'dark' ? 'breadcrumbs-dark': 'breadcrumbs-light'">
		<div  class="title">
			<span class="fs-4 fw-bold">{{`${user} • `}}</span>
			<span class="fs-6">{{`${title}`}}</span>
		</div>
	</div>
</template>
<style scoped>
.breadcrumbs{
	height: 130px;
}
.breadcrumbs-dark{
	background-color: #0f1013 !important;
}
.breadcrumbs-light{
	background-color: #c9c9c9 !important;
}
.title{
	padding: 20px 30px;
}
</style>
