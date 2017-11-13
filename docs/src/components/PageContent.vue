<template>
  <div class="page-content">
    <md-whiteframe md-elevation="1" class="main-header">
      <md-toolbar>
        <md-button class="md-icon-button nav-trigger" @click="toggleSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <div class="md-title">{{ pageTitle }}</div>

      </md-toolbar>
    </md-whiteframe>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .page-content {
    min-height: 100%;
    max-height: 100%;
    flex: 1;
    display: flex;
    flex-flow: column
  }

  .main-header {
    position: relative;
    z-index: 2;

    .md-toolbar {
      color: #fff !important;
    }
  }

  .nav-trigger {
    @media (min-width: 1281px) {
      display: none;
    }
  }

  .md-title {
    flex: 1;

    @media (min-width: 1281px) {
      margin-left: 8px;
    }
  }

  .md-toolbar {
    .md-select {
      &:after {
        color: rgba(#fff, .87);
      }
    }
  }

  .release-version {
    display: flex;
    align-items: center;
    font-size: 15px;

    .md-select {
      width: auto;
      min-width: auto;
      margin: 0 8px;
    }
  }

  .github {
    @media (max-width: 480px) {
      display: none;
    }
  }
</style>

<script>
  export default {
    props: {
      pageTitle: String
    },
    data: () => ({
      latest: null,
      currentDocs: null,
      availableDocs: []
    }),
    methods: {
      changeDocs() {
        const location = window.location;

        if (this.currentDocs === this.latest) {
          window.location.href = location.origin + '/' + location.hash;
        } else {
          window.location.href = location.origin + '/releases/v' + this.currentDocs + '/' + location.hash;
        }
      },
      toggleSidenav() {
        this.$root.toggleSidenav();
      },
      setCurrentByLocation() {
        let normalizedPathname = window.location.pathname.replace(/\/|releases\/v/g, '');

        if (normalizedPathname && this.availableDocs.indexOf(normalizedPathname) >= 0) {
          this.currentDocs = normalizedPathname;
        }
      }
    },
    mounted() {
      document.title = this.pageTitle + ' - Vue Material';
    }
  };
</script>
