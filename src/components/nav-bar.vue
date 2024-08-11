<script>
import { authComputed } from "@/state/helpers";
import { mapGetters } from 'vuex';
import $cookies from "vue-cookies";
/**
 * Nav-bar Component
 */
export default {
	data() {
		return {
			lang: "en",
			text: null,
			flag: null,
			value: null,
			languages: [
				{
					flag: require("@/assets/images/flags/us.jpg"),
					language: "en",
					title: "English",
				},
				{
					flag: require("@/assets/images/flags/french.jpg"),
					language: "fr",
					title: "French",
				},
				{
					flag: require("@/assets/images/flags/spain.jpg"),
					language: "es",
					title: "Spanish",
				},
				{
					flag: require("@/assets/images/flags/chaina.png"),
					language: "zh",
					title: "Chinese",
				},
				{
					flag: require("@/assets/images/flags/arabic.png"),
					language: "ar",
					title: "Arabic",
				},
			],
		};
	},
	components: {},
	mounted() {},
	methods: {
		toggleMenu() {
			this.$parent.toggleMenu();
		},
		toggleRightSidebar() {
			this.$parent.toggleRightSidebar();
		},
		initFullScreen() {
			document.body.classList.toggle("fullscreen-enable");
			if (
				!document.fullscreenElement &&
				/* alternative standard method */ !document.mozFullScreenElement &&
				!document.webkitFullscreenElement
			) {
				// current working methods
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen(
						Element.ALLOW_KEYBOARD_INPUT
					);
				}
			} else {
				if (document.cancelFullScreen) {
					document.cancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}
			}
		},
		logout() {
			$cookies.remove("token");
			this.$router.push({
				path:'/login'
			})
		},
	},
	computed: {
		...authComputed,
        ...mapGetters('auth', ['profile']),
	},
};
</script>

<template>
	<header id="page-topbar" :class="this.profile.mode == 'dark' ? 'dark-mode' : ''">
		<div class="navbar-header">
			<div class="d-flex">
                <!-- <button
                id="vertical-menu-btn"
                type="button"
                class="btn btn-sm px-3 font-size-16 header-item"
                @click="toggleMenu"
                >
                <i class="fa fa-fw fa-bars"></i>
                </button> -->
                <div class="logo text-center">
                    <h1>hris</h1>
                </div>
                <div class="search">
                    <i class="bx bx-search"></i>
                    <input placeholder="search..." :class="this.profile.mode == 'dark' ? 'dark-mode-input' : 'light-mode-input'"/>
                </div>
                <div class="toggle">
                    <label>Dark Mode:</label>
                    <i v-if="this.profile.mode == 'dark'" class="cursor-pointer bx bx-toggle-right fs-2  text-success"></i>
                    <i v-if="this.profile.mode == 'light'" class="cursor-pointer bx bx-toggle-left fs-2 text-danger"></i>
                </div>
                <div class="buttons">
                    <b-dropdown right variant="black" menu-class="dropdown-menu-end">
                        <template v-slot:button-content>
                            <div class="d-flex align-items-center">
                                <i class="fs-3 bx bx-cog d-none d-xl-inline-block"></i>
                                <i class="fs-6 mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </div>
                        </template>
                        <a href="javascript:void(0)" @click="showPasswordModal" class="dropdown-item text-warning">
                            <i class="mdi mdi-open-in-new font-size-16 align-middle me-1 text-warning"></i>
                            Change Password
                        </a>
                        <a href="javascript:void(0)" id="logout-btn" @click.prevent="logout()"
                            class="dropdown-item text-danger">
                            <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                            {{ $t("navbar.dropdown.henry.list.logout") }}
                        </a>
                    </b-dropdown>
                </div>
            </div>
		</div>
	</header>
</template>
<style scoped>
#page-topbar {
	/* background: #ffffff !important; */
	box-shadow: none;
	height: 50px;
}
.navbar-header {
	height: 50px;
}
.navbar-brand-box {
	background: #1b1d21 !important;
}
.logo{
    width: 200px;
}
.search{
    margin-left: 10px;
    position: relative;
    width: 300px;
    display: flex;
    align-items: center;
}
.toggle{
    margin-left: 20px;
    margin-top: 5px;
    position: relative;
    width: auto;
    display: flex;
    align-items: center;;
}
.toggle > i{
    position: absolute;
    top: 6px;
    left: 72px;
}
.search > i{
    position: absolute;
    top: 15px;
    left: 8px;
    font-size: 15px;
}
.search > input{
    /* background: #16181B; */
    border: none;
    padding-left: 30px;
    border-radius: 100px;
    height: 30px;
    width: 100%;
}
.buttons{
    position: absolute;
    right: 0;
    top: 5px;
}

/* dark mode */
.dark-mode{
	background: #1b1d21 !important;
}
.dark-mode-input{
	background: #16181B !important;
}
/* light mode */
.light-mode-input{
	background: #f3f3f3 !important;
}
</style>
