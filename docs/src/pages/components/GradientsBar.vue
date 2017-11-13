<template>
  <page-content page-title="组件 - 滚动渐变栏">
    <docs-component>
      <div slot="description">
        <p>随容器滚动，线性的改变背景颜色</p>
      </div>

      <div slot="api">
        <api-table name="TkGradientsBar">
          <code-block lang="javascript">
            // 单独引用
            import TkGradientsBar from 'vue-tk/components/tkGradientsBar'
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
                <md-table-cell>start</md-table-cell>
                <md-table-cell><code>Number</code></md-table-cell>
                <md-table-cell>渐变开始高度，默认为0</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>end</md-table-cell>
                <md-table-cell><code>Number</code></md-table-cell>
                <md-table-cell>渐变结束高度，必填</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>startColor</md-table-cell>
                <md-table-cell><code>String</code></md-table-cell>
                <md-table-cell>初始颜色，如果不设置将自动获取</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>endColor</md-table-cell>
                <md-table-cell><code>String</code></md-table-cell>
                <md-table-cell>目标颜色，必填</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>container</md-table-cell>
                <md-table-cell><code>Object</code></md-table-cell>
                <md-table-cell>用来计算滚动的容器dom，如果不设置将自动设置为组件的父dom</md-table-cell>
              </md-table-row>

            </md-table-body>
          </md-table>
          <md-table slot="events">
            <md-table-header>
              <md-table-row>
                <md-table-head>名称</md-table-head>
                <md-table-head>参数</md-table-head>
                <md-table-head>说明</md-table-head>
              </md-table-row>

              <md-table-row>
                <md-table-cell>gradients</md-table-cell>
                <md-table-cell>
                  state <code>Object</code>
                  <div class="indentation">percentage <code>Number</code> : 当前高度在起点与终点间的百分比</div>
                  <div class="indentation">start <code>Number</code> : 起点高度</div>
                  <div class="indentation">end <code>Number</code> : 终点高度</div>
                  <div class="indentation">scrollTop <code>Number</code> : 当前滚动高度</div>
                  <div class="indentation">color <code>String</code> : 当前颜色</div>
                </md-table-cell>
                <md-table-cell>当颜色发生改变时触发</md-table-cell>
              </md-table-row>
            </md-table-header>
          </md-table>
        </api-table>
      </div>

      <div slot="api">
        <api-table name="tkGradients">
          <p>用来计算两个颜色的中间色，支持透明色<code>transparent</code>,16位色：<code>#FFFFFF</code>,rgb色：<code>rgb(255,255,255)</code>,rgba色：<code>rgba(255,255,255,0)</code></p>
          <code-block lang="javascript">
            // 单独引用
            import {tkGradients} from 'vue-tk/components/tkGradientsBar'
            // 如果已经全局引用vue-tk
            import {tkGradients} from 'vue-tk'

            //使用
            // startColor 初始颜色
            // endColor 目标颜色
            // percentage 百分比，最小0，最大100
            tkGradients(startColor, endColor, percentage)
            // return 中间色
          </code-block>
        </api-table>
      </div>

      <div slot="example">
        <example-box card-title="滚动变色">
          <div slot="demo">
            <div class="block-container" ref="container">
              <tk-gradients-bar class="gradients-bar" :start="start" :startColor="startColor" :endColor="endColor" :end="end" :container="container"></tk-gradients-bar>
              <div class="actions">
                <md-input-container>
                  <label>初始颜色</label>
                  <md-input v-model="startColor"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>目标颜色</label>
                  <md-input v-model="endColor"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>渐变开始高度</label>
                  <md-input v-model="start"></md-input>
                </md-input-container>
                <md-input-container>
                  <label>渐变结束高度</label>
                  <md-input v-model="end"></md-input>
                </md-input-container>
              </div>
              <div class="block"></div>
            </div>
          </div>
          <div slot="code">
            <code-block lang="xml" class="demo">
              &lt;tk-gradients-bar
                :start=&quot;start&quot;
                :startColor=&quot;startColor&quot;
                :endColor=&quot;endColor&quot;
                :end=&quot;end&quot;
                :container=&quot;container&quot;&gt;
              &lt;/tk-gradients-bar&gt;
            </code-block>
          </div>
        </example-box>
      </div>
    </docs-component>
  </page-content>
</template>

<script>
  export default {
    data: function() {
      return {
        startColor: '#2196f3',
        endColor: 'transparent',
        start: 0,
        end: 500,
        container: null
      };
    },
    mounted: function() {
      this.container = this.$refs.container;
    },
    methods: {

    }
  };
</script>

<style scoped>
  .block{
    height:1350px;
  }
  .block-container{
    max-height:500px;
    overflow-y:scroll;
    overflow-x:hidden;
    position:relative;
  }
  .gradients-bar{
    position:fixed;
    width:100%;
    background-color:blue;
    top:0;
    left:0;
    height:35px;
  }
  .actions {
    position:fixed;
    left:0;
    padding:30px;
    top:0px;
    padding-top:65px;
  }
  .indentation:before{
    content:"|-"
  }
  .indentation{
    padding-left:10px;
  }
</style>
