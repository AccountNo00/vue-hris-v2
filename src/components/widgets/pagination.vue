<template>
    <div class="d-flex justify-content-between align-items-center relative">
        <!-- <div v-if="data.links.length">
            Showing {{ data.from }} - {{ data.to }} of {{ data.total }}
        </div> -->
        <ul
            class="pagination justify-content-center my-2"
            :class="this.profile.mode == 'dark' ? 'filters-dark': 'filters-light'"
            style="flex: 1">
            <li
                :class="`page-item ${l.active ? 'active' : ''}  ${l.label == '...' || l.active ? 'disabled' : ''} ${this.profile.mode == 'dark' ? 'page-item-dark':'page-item-light'}`"
                v-for="l in data.links"
                :key="l.label">
                <a class="page-link" href="#" @click.prevent="emitPage(l.label)"
                    >{{
                        l.label.includes('previous') ||
                        l.label.includes('Previous') ||
                        l.label.includes('next') ||
                        l.label.includes('Next')
                            ? ''
                            : l.label
                    }}
                    <i
                        class="bx bx-caret-left"
                        v-if="
                            l.label.includes('previous') ||
                            l.label.includes('Previous')
                        "></i>
                    <i
                        class="bx bx-caret-right"
                        v-if="
                            l.label.includes('next') || l.label.includes('Next')
                        "></i>
                </a>
            </li>
        </ul>
        <slot />
    </div>
</template>

<script>
// import number from '../mixins/number';

import { mapGetters } from 'vuex';
export default {
    // mixins: [number],
    props: {
        data: {
            type: Object,
        },
        small: {
            type: Boolean,
        },
    },
    computed: {
        ...mapGetters('auth', ['profile']),
        prev_page() {
            return this.data.current_page - 1;
        },
        next_page() {
            return this.data.current_page + 1;
        },
    },
    methods: {
        emitPage(page) {
            if (page.includes('Previous') || page.includes('previous')) {
                if (this.data.current_page > 1) {
                    this.$emit('emitPage', this.data.current_page - 1);
                }
            } else if (page.includes('Next') || page.includes('next')) {
                if (this.data.current_page < this.data.last_page) {
                    this.$emit('emitPage', this.data.current_page + 1);
                }
            } else {
                this.$emit('emitPage', parseInt(page));
            }
        },
    },
};
</script>

<style scoped>
nav {
    margin-left: auto;
}
.pagination {
    display: flex;
    flex-wrap: wrap;
    margin: 0 !important;
    padding: 0 !important;
}
.page-item a{
    background: #0F1013 !important;
    border-color: #0F1013;
    height: 30px;
    font-size: 10px;
}
.page-item.active a {
    background: #0F1013;
    border-color: #0F1013;
    font-size: 10px;
}
.page-item-dark a{
    background: #0F1013 !important;
    border-color: #0F1013;
}
.page-item-dark.active a {
    background: #0F1013;
    border-color: #0F1013;
}
.page-item-light a{
    background: #e6e6e6 !important;
    border-color: #e6e6e6;
    color: black;
}
.page-item-light.active a {
    background: #e6e6e6;
    border-color: #e6e6e6;
    color: black;
}
.page-link:focus {
    box-shadow: 0 0 0 0.15rem rgb(11 14 30 / 25%) !important;
}
.page-link:hover {
    color: #2a3042;
}
</style>
