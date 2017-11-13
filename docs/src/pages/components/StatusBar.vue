<template>
  <page-content page-title="组件 - 状态栏">
    <docs-component>
      <div slot="description">
        <p>沉浸式效果下，虚拟的状态栏效果</p>
        <p>组件实际生成了两个状态栏，一个使用fixed固定在顶部，一个用来占位。可以通过引入组件目录下的state文件，来修改状态栏的显示效果。</p>
        <p>状态栏的高度会自动设置，在非app环境下不会显示。</p>
        <p><b>注意：</b></p>
        <p><b>1. 因为共用state的关系，该组件全局只能插入一次，即使使用多次，状态也是完全一致的</b></p>
        <p><b>2. 如果一个页面的状态栏效果与其他页面不一致，在离开该页面时，必须将状态栏还原</b></p>
      </div>

      <div slot="api">
        <api-table name="StatusBar">
          <code-block lang="javascript">
            // 单独引用
            import TkStatusBar from 'vue-tk/dist/components/tkStatusBar'
          </code-block>
          <md-table slot="properties">
            <md-table-header>
              <md-table-row>
                <md-table-head>名称</md-table-head>
                <md-table-head>类型</md-table-head>
                <md-table-head>说明</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>
              <md-table-row>
                <md-table-cell>color</md-table-cell>
                <md-table-cell><code>String</code></md-table-cell>
                <md-table-cell>状态栏的颜色，默认为黑色，优先级低于state中的颜色设置</md-table-cell>
              </md-table-row>

            </md-table-body>
          </md-table>
        </api-table>
      </div>

      <div slot="api">
        <api-table name="state">
          <p>状态栏状态控制文件</p>

          <code-block lang="javascript">
            // 单独引用
            import {tkStatusBarState} from 'vue-tk/dist/components/tkStatusBar'
            // 如果已经全局引用vue-tk
            import {tkStatusBarState} from 'vue-tk'
          </code-block>

          <md-table slot="methods">
            <md-table-header>
              <md-table-row>
                <md-table-head>名称</md-table-head>
                <md-table-head>参数</md-table-head>
                <md-table-head>说明</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>
              <md-table-row>
                <md-table-cell>setClass()</md-table-cell>
                <md-table-cell>className <code>String</code> 类名</md-table-cell>
                <md-table-cell>设置状态栏的class</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>setColor()</md-table-cell>
                <md-table-cell>color <code>String</code> 颜色</md-table-cell>
                <md-table-cell>设置状态栏的颜色</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>show()</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>显示状态栏，在非app环境下无效</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>hide()</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>隐藏状态栏，即沉浸式效果</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>toggle()</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>切换状态栏显示效果</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>height()</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>获取状态栏高度</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>isShow()</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>判断状态栏当前是否显示</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>setSpace()</md-table-cell>
                <md-table-cell>useSpace <code>Bool</code> 是否占用</md-table-cell>
                <md-table-cell>设置状态栏是否占用空间，若设置为false，则状态栏会照常显示，但不占据空间，页面内容会整体上移</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>reset()</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>还原所有状态变更</md-table-cell>
              </md-table-row>

            </md-table-body>
          </md-table>
        </api-table>
      </div>

      <div slot="example">
        <example-box card-title="设置状态栏">
          <div slot="demo" class="demo">
            <tk-status-bar></tk-status-bar>
            <md-button @click="show">显示</md-button>
            <md-button @click="hide">隐藏</md-button>
            <md-button @click="toggle">切换</md-button>
            <md-button @click="color('black')">黑色</md-button>
            <md-button @click="color('gray')">灰色</md-button>
            <md-button @click="color('red')">红色</md-button>
            <md-button @click="color('blue')">蓝色</md-button>
            <md-button @click="reset">还原</md-button>
          </div>

          <div slot="code">
            <code-block lang="xml" class="demo">
              &lt;tk-status-bar&gt;&lt;/tk-status-bar&gt;
              &lt;md-button @click=&quot;show&quot;&gt;显示&lt;/md-button&gt;
              &lt;md-button @click=&quot;hide&quot;&gt;隐藏&lt;/md-button&gt;
              &lt;md-button @click=&quot;toggle&quot;&gt;切换&lt;/md-button&gt;
              &lt;md-button @click=&quot;color(&#39;black&#39;)&quot;&gt;黑色&lt;/md-button&gt;
              &lt;md-button @click=&quot;color(&#39;gray&#39;)&quot;&gt;灰色&lt;/md-button&gt;
              &lt;md-button @click=&quot;color(&#39;red&#39;)&quot;&gt;红色&lt;/md-button&gt;
              &lt;md-button @click=&quot;color(&#39;blue&#39;)&quot;&gt;蓝色&lt;/md-button&gt;
              &lt;md-button @click=&quot;reset&quot;&gt;还原&lt;/md-button&gt;
            </code-block>
          </div>
        </example-box>
      </div>
    </docs-component>
  </page-content>
</template>

<script>
  import statusBarState from '../../../../src/components/tkStatusBar/state.js';
  export default {
    created: function() {
      statusBarState._height = 35;
      statusBarState.setSpace(false);
    },
    methods: {
      show() {
        statusBarState.show();
      },
      hide() {
        statusBarState.hide();
      },
      toggle() {
        statusBarState.toggle();
      },
      color(c) {
        statusBarState.setColor(c);
      },
      reset() {
        statusBarState.reset();
        statusBarState.setSpace(false);
      }
    }
  };
</script>

<style scoped>
  .demo{
    padding-top:35px;
  }
</style>
