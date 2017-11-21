<template>
  <div class="_box" :style = "style">
    <div :style = 'padding'></div>
    <div class="_box_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      ratio: {
        type: String,
        default: '1:1'
      },
      bgImg: {
        type: String
      }
    },
    computed: {
      ratios() {
        let arr = this.ratio.split(':');
  
        return arr[0] / arr[1];
      },
      padding() {
        return {
          'padding-bottom': `${this.ratios * 100}%`
        };
      },
      style() {
        if (this.bgImg) {
          return {
            'background-image': `url(${this.bgImg})`
          };
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  ._box{
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center center;
    position: relative;
    ._box_content {
      position:absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
    }
  }
</style>
