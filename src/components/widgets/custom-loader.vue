<script>

/**
 * Preloader component
 */
export default {
  data() {
    return {};
  },
  props: {
    loading: Boolean,
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
      // setTimeout(() => {
      //       var preloader = document.getElementsByClassName("preloader-component");
      //       Array.prototype.forEach.call(preloader, function(el) {
      //           el.style.display = "none";
      //       });

      //       var status = document.getElementsByClassName("status");
      //       Array.prototype.forEach.call(status, function(el) {
      //           el.style.display = "none";
      //       });
      // }, 1000);
  },
};
</script>

<template>
  <div :class="{ 'is-loading': loading }">
    <div class="preloader-component">
      <div class="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
<style scoped>
.preloader-component{
  background: rgba(0, 0, 0, 0.363) !important;
  position: fixed;
  top: 50%;
  left: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
}
</style>
