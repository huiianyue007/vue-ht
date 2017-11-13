<template>
  <page-content page-title="说明">
    <div class="main-content">
      <div class="introduction">
          <div class="introduction">自开发用组件库</div>
        </div>
    </div>
  </page-content>
</template>

<style lang="scss" scoped>
  .introduction {
    max-width: 960px;
    margin: 0 auto;
  }
  .column {
    margin: 0 10px;
    flex: 1 1 30%;

    @media (max-width: 640px) {
      flex: 1 1 100%;
    }
  }
</style>
