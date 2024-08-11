<script>
import Layout from "../../layouts/main";
import Breadcrumbs from '../../../components/breadcrumbs.vue'
import { mapActions,mapGetters } from 'vuex';
import 'animate.css';
/**
 * Dashboard Component
 */
export default {
	components: {
		Layout,Breadcrumbs
	},
	data() {
		return {
			user: 'admin',
			title: 'create',
            data: {
				list:[],
                links: [],
                current_page: 1,
                per_page: 1,
                last_page: 1,
            },
			filters:{
				limit: 50,
			},
		};
	},
	computed:{
        ...mapGetters('auth', ['profile']),
	},
	methods:{
        ...mapActions('users', {
            userList: 'getList',
        }),
        async initList(p) {
            var pl = {
                page_no: p ? p : 1,
                limit: this.filters.limit,
            };
            const data = await this.userList(pl);
            this.data.list = data.data;
            this.data.links = data.links;
            this.data.current_page = data.current_page;
            this.data.per_page = data.per_page;
            this.data.last_page = data.last_page;
        },
		goBack(){
			this.$router.push({
				path: '/'
			});
		},
	},
	mounted() {
		this.initList(1);
	},
};
</script>

<template>
	<Layout>
		<Breadcrumbs :user="user" :title="title"/>
		<div class="m-3">
			<div class="form-container" :class="this.profile.mode == 'dark' ? 'form-dark': 'form-light'">
				<div class="p-2 d-flex justify-content-between align-center">
					<div class="text-uppercase fw-bold table-title">user {{`${this.$route.query.user_id ? 'update' : 'create'}`}}</div>
					<i class="bx bx-arrow-back fs-4 px-2 pt-1 cursor-pointer" @click="goBack()"></i>
				</div>
				<hr class="mb-0 mt-0">
				<div class="p-3">
					<div class="row mb-3">
						<div class="col-6">
							<label class="custom-color" :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" >First Name</label>
							<input type="text" class="form-control custom-bg-input" :class="this.profile.mode == 'dark' ? 'custom-bg-input-dark': 'custom-bg-input-light'" />
						</div>
						<div class="col-6">
							<label class="custom-color" :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" >Last Name</label>
							<input type="text" class="form-control custom-bg-input" :class="this.profile.mode == 'dark' ? 'custom-bg-input-dark': 'custom-bg-input-light'" />
						</div>
					</div>
					<div class="row mb-3">
						<label class="custom-color" :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" >Department</label>
						<div>
							<b-form-select class="custom-bg-input" :class="this.profile.mode == 'dark' ? 'custom-bg-input-dark': 'custom-bg-input-light'">
								<option value="" disabled hidden>
									----Select One----
								</option>
								<option>
									RND
								</option>
								<option>
									RND
								</option>
								<option>
									RND
								</option>
							</b-form-select>
						</div>
					</div>
					<div class="row mb-3">
						<label class="custom-color" :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" >Status</label>
						<div>
							<label class="mx-2">
								<input type="checkbox"/>
								Training
							</label>
						</div>
						<div>
							<label class="mx-2">
								<input type="checkbox"/>
								Active
							</label>
						</div>
						<div>
							<label class="mx-2">
								<input type="checkbox"/>
								Inactive
							</label>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</Layout>
</template>
