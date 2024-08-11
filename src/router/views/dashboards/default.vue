<script>
import Layout from "../../layouts/main";
import Breadcrumbs from '../../../components/breadcrumbs.vue'
import Loader from '../../../components/widgets/custom-loader.vue'
import Pagination from '../../../components/widgets/pagination.vue'
import { mapActions,mapGetters } from 'vuex';
import Swal from 'sweetalert2'
import 'animate.css';
/**
 * Dashboard Component
 */
export default {
	components: {
		Layout,Loader,Pagination,Breadcrumbs
	},
	data() {
		return {
			user: 'admin',
			title: 'dashboard',
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
			loading: false,
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
            this.loading = true;
            const data = await this.userList(pl);
            this.loading = false;
            this.data.list = data.data;
            this.data.links = data.links;
            this.data.current_page = data.current_page;
            this.data.per_page = data.per_page;
            this.data.last_page = data.last_page;
        },
		gotoForm(data){
			if(data){
				this.$router.push({
					path: '/dashboard-create',
					query:{
						user_id: data.first_name
					}
				});
			}else{
				this.$router.push({
					path: '/dashboard-create',
				});
			}
		},
		exportData(){
			Swal.fire({
				title: "Are you sure you want to export this?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				allowOutsideClick: false,
				showClass: {
					popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`
				},
				hideClass: {
					popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`
				}
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Downloading..',
						text: "Wait for a while",
						timer: 7000,
						timerProgressBar: true,
						showConfirmButton: false,
						allowOutsideClick: false,
					})
					setTimeout(() => {
						Swal.fire({
							title: 'Success',
							icon: "success",
						})
					}, 7000);
				} 
			});
		},
		exportPDF(){
			Swal.fire({
				title: "Are you sure you want to download this as PDF?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				allowOutsideClick: false,
				showClass: {
					popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`
				},
				hideClass: {
					popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`
				}
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Downloading..',
						text: "Wait for a while",
						timer: 7000,
						timerProgressBar: true,
						showConfirmButton: false,
						allowOutsideClick: false,
					})
					setTimeout(() => {
						Swal.fire({
							title: 'Success',
							icon: "success",
						})
					}, 7000);
				} 
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
		<Loader  v-if="loading"/>
		<Breadcrumbs :user="user" :title="title"/>
		<div class="m-3">
			<div class="main-header" :class="this.profile.mode == 'dark' ? 'main-header-dark': 'main-header-light'">
				<div class="statistics d-flex">
					<div class="p-4 mx-4 mt-5 d-flex">
						<div>
							<h6 :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="text-uppercase">NEW EMPLOYEE</h6>
							<p :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="text-secondary fs-5">13</p>
						</div>
						<i :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="mdi mdi-account mx-2 fs-1"></i>
					</div>
					<div class="p-4 mx-4 mt-5 d-flex">
						<div>
							<h6 :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="text-uppercase">RECENTLY HIRED</h6>
							<p :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="text-secondary fs-5">25</p>
						</div>
						<i :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="mdi mdi-account-check-outline mx-2 fs-1"></i>
					</div>
					<div class="p-4 mx-4 mt-5 d-flex">
						<div>
							<h6 :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="text-uppercase">TOTAL EMPLOYEE</h6>
							<p :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="text-secondary fs-5">5235</p>
						</div>
						<i :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="mdi mdi-account-group mx-2 fs-1"></i>
					</div>
				</div>
				<div class="action-buttons">
					<i :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="cursor-pointer mdi mdi-file-pdf-box mx-4" @click="exportPDF()"></i>
					<i :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="cursor-pointer bx bx-export mx-4" @click="exportData()"></i>
					<i :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="cursor-pointer mdi mdi-account-plus mx-4" @click="gotoForm()"></i>
				</div>
			</div>
			<div class="main-table">
				<div class="filters p-4" :class="this.profile.mode == 'dark' ? 'filters-dark': 'filters-light'" >
					<div class="mb-3">
						<label :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="custom-color">Keyword</label>
						<div>
							<input :class="this.profile.mode == 'dark' ? 'custom-bg-input-dark': 'custom-bg-input-light'" type="text" class="form-control custom-bg-input" placeholder="ex:(user01)"/>
						</div>
					</div>
					<div class="mb-3">
						<label :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="custom-color">Range</label>
						<div class="d-flex">
							<input :class="this.profile.mode == 'dark' ? 'custom-bg-input-dark': 'custom-bg-input-light'" type="date" class="form-control custom-bg-input"/>
							<span class="m-2 text-white">~</span>
							<input :class="this.profile.mode == 'dark' ? 'custom-bg-input-dark': 'custom-bg-input-light'" type="date" class="form-control custom-bg-input"/>
						</div>
					</div>
					<div class="mb-3">
						<label :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="custom-color">Department</label>
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
					<div class="mb-3">
						<label :class="this.profile.mode == 'dark' ? 'custom-shadow': 'custom-shadow-light'" class="custom-color">Status</label>
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
				<div class="table-container" :class="this.profile.mode == 'dark' ? 'filters-dark': 'filters-light'">
					<div class="p-2 d-flex justify-content-between align-center">
						<div class="text-uppercase fw-bold table-title" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'" >user list</div>
						<Pagination class="m-0 p-0"  :data="data" @emitPage="initList"/>
					</div>
					<hr class="mb-0 mt-0">
					<div class="table-responsive  my-table">
						<table class="table table-borderless" :class="this.profile.mode == 'dark' ? 'hover-dark': 'hover-light'">
							<thead>
								<tr class="text-secondary">
									<th style="width: 20px;" class="text-uppercase" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'">ID</th>
									<th style="width: 20%;" class="text-uppercase" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'">Name</th>
									<th style="width: 30%;" class="text-uppercase" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'">Department</th>
									<th style="width: 10%;" class="text-uppercase" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'">Status</th>
									<th style="" class="text-uppercase" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'">Created At</th>
									<th style="" class="text-uppercase" :class="this.profile.mode == 'dark' ? 'text-shadow-dark': 'text-shadow-light'">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="data,index in data.list" :key="index">
									<td>
										<input type="checkbox"/>
									</td>
									<td class="text-capitalize custom-color">{{data.first_name + ' ' + data.last_name}}</td>
									<td class="custom-color">{{data.department}}</td>
									<td>
										<span v-if="data.status == 0" class="text-warning">training</span>
										<span v-if="data.status == 1" class="text-success">Active</span>
										<span v-if="data.status == 2" class="text-danger">Inactive</span>
									</td>
									<td class="custom-color">{{data.created_at}}</td>
									<td>
										<button class="custom-btn" :class="this.profile.mode == 'dark' ? 'custom-btn-dark': 'custom-btn-light'" @click="gotoForm(data)">
											<span>view</span>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>
