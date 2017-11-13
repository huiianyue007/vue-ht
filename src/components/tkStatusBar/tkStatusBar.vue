<template>
  <div class="status-bar-wrapper" v-if="isShow">
    <div class="status-bar fixed" :class="_class" :style="_style"></div>
    <div class="status-bar" :class="_class" :style="_style"  v-if="state._space"></div>
  </div>
</template>

<script>
import state from './state.js';

export default {
  name: 'StatusBar',
  data() {
    return {
      state: state
    };
  },
  computed: {
    _class: function() {
      return this.state.class;
    },
    _style: function() {
      let rt = {
        height: this.state.height() + 'px'
      };

      if (this.state._color) {
        rt['background-color'] = this.state._color;
      } else if (this.color) {
        rt['background-color'] = this.color;
      }
      return rt;
    },
    isShow: function() {
      return this.state.isShow() && this.state.height() !== 0;
    }
  },
  props: {
    color: String
  }
};
</script>
<style scoped>
  div{
    background-color:black;
    display:block;
    width:100%;
  }
  .status-bar.fixed{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:100000;
  }
</style>
