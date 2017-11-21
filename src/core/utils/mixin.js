const dataBus = {}

export default {
  beforeCreate: function () {
    let name = this.$options.name
    if (!dataBus[name]) {
      dataBus[name] = {}
    }
  },
  methods: {
    getGlobalData: function (name) {
      return dataBus[this.$options.name][name]
    },
    setGlobalData: function (name, value) {
      dataBus[this.$options.name][name] = value
    }
  }
}
