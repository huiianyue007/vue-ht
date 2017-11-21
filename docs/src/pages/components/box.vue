<template>
  <page-content page-title="组件 - 图片等比缩放">
    <docs-component>
      <div slot="description">
        <p>图片按比例缩放</p>
      </div>

      <div slot="api">
        <api-table name="HtBox">
          <code-block lang="javascript">
            // 单独引用
            import htBox from 'vue-ht/components/box'
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
                <md-table-cell>ratio</md-table-cell>
                <md-table-cell><code>String</code></md-table-cell>
                <md-table-cell>图片比例，默认为1:1</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>bgImg</md-table-cell>
                <md-table-cell><code>String</code></md-table-cell>
                <md-table-cell>背景图片</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
        </api-table>
      </div>
      <div slot="example">
        <example-box card-title="box">
          <div slot="demo">
            <div class="block-container" ref="container">
              <ht-box class = 'box'>
                1232
              </ht-box>
              <div class="block"></div>
            </div>
          </div>
          <div slot="code">
            <code-block lang="xml" class="demo">
              &lt;ht-box class = 'box'&gt;
                1232
              &lt;/ht-box&gt;
            </code-block>
          </div>
        </example-box>
      </div>
    </docs-component>
  </page-content>
</template>

<script>
  export default {
    name: 'box'
  };
</script>

<style scoped>
  .block{
    height:1350px;
  }
  .block-container{
    overflow-x:hidden;
    position:relative;
  }
  .box{
    width: 100px;
    background: red;
  }
</style>
