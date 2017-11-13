<template>
  <div class="container">
    <md-sidenav class="main-sidebar md-left md-fixed" ref="main-sidebar">
      <md-toolbar class="vue-material-logo" md-theme="white">
        <router-link exact to="/">
          <img src="assets/logo.png" alt="Vue">
          <span>Vue components</span>
        </router-link>
      </md-toolbar>

      <div class="main-sidebar-links">
        <md-list class="md-dense">
          <md-list-item>
            <router-link exact to="/">说明</router-link>
          </md-list-item>
          <md-list-item>
            <span>组件</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">
                  <router-link exact to="/components/status-bar">状态栏</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link exact to="/components/gradients-bar">滚动渐变栏</router-link>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </div>
    </md-sidenav>

    <transition name="md-router" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
  @import './variables.scss';

  $sizebar-size: 280px;

  [v-cloak] {
    display: none;
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
    font-family: "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "Hiragino Sans GB", "Source Han Sans CN Normal", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }

  body {
    display: flex;
  }

  .container {
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    transition: $swift-ease-out;

    @media (min-width: 1281px) {
      padding-left: $sizebar-size;
    }
  }

  .main-sidebar.md-sidenav {
    .md-sidenav-content {
      width: $sizebar-size;
      display: flex;
      flex-flow: column;

      @media (min-width: 1281px) {
        top: 0;
        pointer-events: auto;
        transform: translate3d(0, 0, 0) !important;
        box-shadow: $material-shadow-2dp;
      }
    }

    .md-backdrop {
      @media (min-width: 1281px) {
        opacity: 0;
        pointer-events: none;
      }
    }

    .md-toolbar {
      min-height: 172px;
      border-bottom: 1px solid rgba(#000, .12);
    }

    .vue-material-logo {
      font-size: 24px;

      a {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        color: inherit;
        text-decoration: none;

        &:hover {
          color: inherit;
          text-decoration: none;
        }
      }

      img {
        width: 100px;
        margin-bottom: 16px;
      }
    }

    .main-sidebar-links {
      overflow: auto;

      .md-inset .md-list-item-container {
        padding-left: 36px;
      }

      .md-list-item-container {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .main-content {
    padding: 16px;
    flex: 1;
    overflow: auto;
    background-color: #fff;
    transform: translate3D(0, 0, 0);
    transition: $swift-ease-out;
    transition-delay: .2s;
  }

  .md-router-enter-active,
  .md-router-leave-active {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    @media (min-width: 1281px) {
      left: $sizebar-size;
    }

    .main-content {
      opacity: 0;
      overflow: hidden;
    }
  }

  .md-router-leave-active {
    z-index: 1;
    transition: $swift-ease-in;
    transition-duration: .25s;
  }

  .md-router-enter-active {
    z-index: 2;
    transition: $swift-ease-out;

    .main-content {
      transform: translate3D(0, 7%, 0);
    }
  }

  code {
    &:not(.hljs) {
      margin-left: 1px;
      margin-right: 1px;
      padding: 0 4px;
      display: inline-block;
      border-radius: 2px;
      font-family: "Operator Mono", "Fira Code", Menlo, Hack, "Roboto Mono", "Liberation Mono", Monaco, monospace;

      pre {
        margin: 8px 0;
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        toolbar: true,
        theme: 'default',
        pageTitle: ''
      };
    },
    methods: {
      toggleSidenav() {
        this.$refs['main-sidebar'].toggle();
      },
      closeSidenav() {
        this.$refs['main-sidebar'].close();
      }
    }
  };
</script>
