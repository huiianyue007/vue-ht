<template>
    <div class="tk-gradients-header" :style="style" ref="bar">
      <slot></slot>
    </div>
</template>

<script>
import gradientColors from './utils.js';

export default {
  name: 'tkGradientsBar',
  data() {
    return {
      styleColor: null,
      percentage: 0,
      bindContainer: null
    };
  },
  computed: {
    color: function() {
      let startColor = this.startColor ? this.startColor : this.styleColor;

      if (this.percentage === 0) {
        return startColor;
      } else if (this.percentage === 100) {
        return this.endColor;
      }
      return gradientColors(startColor, this.endColor, this.percentage);

    },
    style: function() {
      return {
        'background-color': this.color
      };
    }
  },
  watch: {
    container: function() {
      this.bind();
    }
  },
  mounted: function() {
    if (this.styleColor === null) {
      this.styleColor = this.$el.style.backgroundColor;
    }
    this.bind();
  },
  activated: function() {
    this.bind();
  },
  deactivated: function() {
    this.unbind();
  },
  beforeDestroy: function() {
    this.unbind();
  },
  methods: {
    bind: function() {
      if (this.bindContainer) {
        this.unbind();
      }
      this.bindContainer = this.container ? this.container : this.$el.parentNode;
      this.bindContainer.addEventListener('scroll', this.scrollHandler, false);
      this.scrollHandler();
    },
    unbind: function() {
      if (this.bindContainer) {
        this.bindContainer.removeEventListener('scroll', this.scrollHandler);
        this.bindContainer = null;
      }
    },
    scrollHandler: function(e) {
      let scrollTop = e.target === window ? window.pageYOffset : e.target.scrollTop;

      if (scrollTop <= this.start) {
        this.percentage = 0;
      } else if (scrollTop >= this.end) {
        this.percentage = 100;
      } else {
        this.percentage = Math.ceil((scrollTop - this.start) / (this.end - this.start) * 100);
      }
      let opt = {
        percentage: this.percentage,
        start: this.start,
        end: this.end,
        scrollTop: scrollTop,
        color: this.color
      };

      this.$emit('gradients', opt);
    }
  },
  props: {
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      required: true
    },
    startColor: String,
    endColor: {
      type: String,
      default: 'transparent'
    },
    container: null
  }
};
</script>
<style>

</style>
