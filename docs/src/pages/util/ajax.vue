<template>
  <page-content page-title="方法 - ajax">
    <docs-component>
      <div slot="description">
        <p>基于promise的ajax工具类</p>
      </div>

      <div slot="api">
        <api-table name="单独引用">
          <code-block lang="javascript">
            // 单独引用
            import Vue from 'vue'
            import htAjax from 'vue-tk/dist/utils/htAjax'
            Vue.use(htAjax)
          </code-block>
        </api-table>

        <api-table name="使用方法">
          <code-block lang="javascript" :tidy="false">
            //组件中使用
            this.$htAjax
            this.$htAjaxGlobal

            //不在组件中使用:
            import {htAjax, htAjaxGlobal} from 'vue-tk'

            //使用方法
            this.$htAjax.get('url')
              .then(function (response) {
              //处理ajax获取的数据
              })
              .catch(function (error) {
              //ajax失败，进行错误处理
              })

            // 可以使用的请求类型
            this.$htAjax.get(url, option) //GET
            this.$htAjax.post(url, data, option) //POST
            this.$htAjax.put(url, data, option) //PUT
            this.$htAjax.delete(url, option) //DELETE

            // 请求参数在option中配置
            this.$htAjax.request(option)

            // 使用一个option创建一个实例
            let ajaxIntance = this.$htAjax.create(option)
          </code-block>
        </api-table>

        <api-table name="全局配置">
          <code-block lang="javascript">
            // 在 htAjaxGlobal 中配置的参数会即时作用到所有的ajax请求中
            //
            // 如果 htAjaxGlobal 的配置与 htAjax 配置有重复，有以下两种情况
            // 1. 配置参数值为对象，例如：this.$htAjaxGlobal.data = {lang: 'zh'}
            //                            this.$htAjax.post(url, {id: 1})
            //                      则配置参数会被合并：结果为 data: {lang: 'zh', id: 1}
            // 2. 配置参数值非对象，例如： this.$htAjaxGlobal.timeout = 100
            //                             this.$htAjax.get(url, {timeout: 1000})
            //                      则配置参数会被覆盖：结果为 {timeout: 1000}

            //示例
            this.$htAjaxGlobal.baseURL = 'http://api.web.com/'
            this.$htAjaxGlobal.auth = {
            username: 'username',
            password: 'password'
            }
          </code-block>
        </api-table>

        <api-table name="中间件">
          <code-block lang="javascript">
            // 中间件可以在结果处理之前先行处理结果
            // 执行逻辑：
            // (顺次执行前置中间件）-》ajax请求-》返回结果-》（顺次执行中间件）-》结果处理（中间件返回的结果）
            // 注意：中间件必须调用一次next方法
            // 注意：根据response.status的值来决定结果处理为请求成功或请求失败
            // response.status >= 200 && response.status < 400 为成功，否则为失败

            //示例（全局设置中间件，处理请求结果）：
            this.$htAjaxGlobal.midware = [
              (response, next) => {
                //对response做任何操作
                console.log(response)
                //将response传给下一个中间件或结果处理
                next(response)
              },
              (response, next) => {
                //另一个中间件
                next(response)
              },
            ]
            //示例（全局设置前置中间件，处理请求参数）：
            this.$htAjaxGlobal.preMidware = [
              (config, next) => {
                //对config做任何操作
                console.log(config)
                //将config传给下一个前置中间件或发出请求
                next(config)
              }
            ]
            //示例(单个请求使用中间件):
            this.$htAjax.get(url,{
              //若设置preMidware值为false，则将不使用任何前置中间件
              preMidware: function (config, next) {
                next(config)
              },
              //若设置midware值为false，则将不使用任何中间件
              midware: function (response, next) {
                next(response)
              }
            }).then(function(res){
            //正确的结果处理
            }).catch(function(err){
            //错误的结果处理
            })
          </code-block>
        </api-table>

        <api-table name="错误处理">
          <code-block lang="javascript">
            // 在配置参数中配置errorHandler来使用错误处理
            // 错误处理的执行逻辑：
            // ajax请求-》返回错误-》检查是否有对应错误处理-》执行错误处理-》结果处理（中间件返回的promise）
            // 不使用中间件的执行逻辑
            // ajax请求-》返回结果 -》结果处理（ajax请求返回的promise）
            // 注意：中间件必须返回一个promise，否则无法进入到“结果处理”中

            //示例：
            this.$htAjax.get(url,{
              errorHandler: {
                all: function (err) {}, //处理没有对应状态码的所有错误
                404: function (err) {   //处理错误状态码为404的错误
                  //err 与结果处理中的err等同
                  //返回的promise会替换ajax请求的promise进入到错误处理中
                  return promise
                }
              }
            }).then(function(res){
              //正确的结果处理
            }).catch(function(err){
              //错误的结果处理
            })
          </code-block>
        </api-table>
      </div>

      <div slot="api">
        <api-table name="配置参数">
          <md-table slot="methods">
            <md-table-header>
              <md-table-row>
                <md-table-head>名称</md-table-head>
                <md-table-head>示例</md-table-head>
                <md-table-head>类型</md-table-head>
                <md-table-head>说明</md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>
              <md-table-row>
                <md-table-cell>baseURL</md-table-cell>
                <md-table-cell>http://api.web.com</md-table-cell>
                <md-table-cell><code>string</code></md-table-cell>
                <md-table-cell>api的域名部分</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>url</md-table-cell>
                <md-table-cell>user</md-table-cell>
                <md-table-cell><code>string</code></md-table-cell>
                <md-table-cell>api地址，如果设置了baseUrl,将自动连接</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>method</md-table-cell>
                <md-table-cell>get</md-table-cell>
                <md-table-cell><code>string</code></md-table-cell>
                <md-table-cell>ajax请求类型,可选[get,post,put,delete]</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>midware</md-table-cell>
                <md-table-cell>true</md-table-cell>
                <md-table-cell><code>bool</code></md-table-cell>
                <md-table-cell>是否使用中间件，设置为false禁用</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>errorHandler</md-table-cell>
                <md-table-cell>{400: function}</md-table-cell>
                <md-table-cell><code>object</code></md-table-cell>
                <md-table-cell>中间件，用来处理特定的请求错误</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>headers</md-table-cell>
                <md-table-cell>{auth: none}</md-table-cell>
                <md-table-cell><code>object</code></md-table-cell>
                <md-table-cell>ajax请求的头部参数</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>params</md-table-cell>
                <md-table-cell>{id: 1}</md-table-cell>
                <md-table-cell><code>object</code></md-table-cell>
                <md-table-cell>url参数，示例中的{id:1}会拼接到url里：url?id=1</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>timeout</md-table-cell>
                <md-table-cell>1000</md-table-cell>
                <md-table-cell><code>number</code></md-table-cell>
                <md-table-cell>请求的超时时间，单位是毫秒，如果到达时间，ajax仍未成功会自动失败</md-table-cell>
              </md-table-row>

              <md-table-row>
                <md-table-cell>responseType</md-table-cell>
                <md-table-cell>json</md-table-cell>
                <md-table-cell><code>string</code></md-table-cell>
                <md-table-cell>ajax获取数据的格式，默认是json</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell>expect</md-table-cell>
                <md-table-cell>data.results</md-table-cell>
                <md-table-cell><code>string</code></md-table-cell>
                <md-table-cell>指定返回结果中的特定对象，当该对象不存在时，会作为错误处理</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
        </api-table>
      </div>
      <div slot="example">
        <example-box card-title="ajax">
          <div slot="demo">
            <tk-flex class="method-wrap">
              <md-input-container class="tk-grid-3">
                <label for="method">请求方法</label>
                <md-select name="method" id="method" v-model="method">
                  <md-option :value="item" v-for="item,index in methods" :key="index">{{item}}</md-option>
                </md-select>
              </md-input-container>
              <md-input-container class="fill">
                <label>链接</label>
                <md-input v-model="url"></md-input>
              </md-input-container>
              <div>
                <md-button class="md-raised md-primary" @click.native="send">执行</md-button>
              </div>
            </tk-flex>
            <md-tabs class="md-transparent example-tabs">
              <md-tab id="data" md-label="DATA">
                <div class="field-group" v-for="(item, index) in data">
                  <md-input-container>
                    <label>name</label>
                    <md-input v-model="item.name"></md-input>
                  </md-input-container>
                  <md-input-container>
                    <label>value</label>
                    <md-input v-model="item.value"></md-input>
                  </md-input-container>
                  <md-button class="md-icon-button md-dense" @click.native="deleteData(index)">
                    <tk-icon>close</tk-icon>
                  </md-button>
                </div>
              </md-tab>
              <md-tab id="headers" md-label="HEADERS">
                <div class="field-group" v-for="(item, index) in headers">
                  <md-input-container>
                    <label>name</label>
                    <md-input v-model="item.name"></md-input>
                  </md-input-container>
                  <md-input-container>
                    <label>value</label>
                    <md-input v-model="item.value"></md-input>
                  </md-input-container>
                  <md-button class="md-icon-button md-dense" @click.native="deleteHeader(index)">
                    <tk-icon>close</tk-icon>
                  </md-button>
                </div>
              </md-tab>
            </md-tabs>
          </div>
        </example-box>

        <api-table name="实时代码">
          <code-block lang="javascript">
            this.$htAjax.{{method | toLowerCase}}('{{urlCode}}'{{dataCode}}{{configCode}}).then(function (response) {
            //处理ajax获取的数据
            })
            .catch(function (error) {
            //ajax失败，进行错误处理
            })
          </code-block>
        </api-table>

        <api-table :name="'ajax请求结果参数说明：' + resultType" v-if="resultType">
          <code-block lang="javascript" v-if="resultType === 'success'">
            // success 返回参数说明
            {
            data: object|string, //ajax请求获取到的数据,
            status: int, //ajax请求响应状态码，为0代表未能发出请求，通常为网络问题
            statusText: string, //ajax响应状态信息，可能为undefined
              headers: {}, //ajax响应头
              config: {}, //本次请求的配置参数
              request: {} //本次ajax的实际请求对象，nodejs环境下为 ClientRequest 实例，浏览器环境下为 XMLHttpRequest 实例
            }
          </code-block>
          <code-block lang="javascript" v-else>
            // error 返回参数说明
            {
              message: string, //请求错误信息
              data: object|string, //ajax请求获取到的数据,
              status: int, //ajax请求响应状态码，为0代表未能发出请求，通常为网络问题
              statusText: string, //ajax响应状态信息，可能为undefined
              headers: {}, //ajax响应头，可能为undefined
              config: {}, //本次请求的配置参数
              request: {} //本次ajax的实际请求对象，nodejs环境下为 ClientRequest 实例，浏览器环境下为 XMLHttpRequest 实例，可能为undefined
            }
          </code-block>
          <code-block lang="javascript">
            {{result | json}}
          </code-block>
        </api-table>
      </div>
    </docs-component>
  </page-content>
</template>

<script>
  export default {
    data: function() {
      return {
        url: '',
        method: 'GET',
        methods: [
          'GET',
          'POST',
          'PUT',
          'DELETE'
        ],
        name: '',
        value: '',
        data: [
          {
            name: '',
            value: ''
          }
        ],
        headers: [
          {
            name: '',
            value: ''
          }
        ],
        result: {},
        resultType: ''
      };
    },
    watch: {
      data: {
        handler: function() {
          this.autoAdd('data');
        },
        deep: true
      },
      headers: {
        handler: function() {
          this.autoAdd('headers');
        },
        deep: true
      }
    },
    filters: {
      toLowerCase(val) {
        return val.toLowerCase();
      },
      json(val) {
        return JSON.stringify(val);
      }
    },
    computed: {
      needData: function() {
        return this.method === 'POST' || this.method === 'PUT';
      },
      urlCode: function() {
        return this.url || 'url';
      },
      dataCode: function() {
        if (!this.needData) {
          return '';
        }
        let data = this.transData(this.data);
  
        return ', ' + JSON.stringify(data);
  
      },
      configCode: function() {
        let headers = this.transData(this.headers);
  
        return Object.keys(headers).length > 0 ? ', ' + JSON.stringify({headers: headers}) : '';
      }
    },
    methods: {
      transData(data) {
        let rs = {};
  
        for (let item of data) {
          if (item.name) {
            rs[item.name] = item.value;
          }
        }
        return rs;
      },
      autoAdd(name) {
        let length = this[name].length;
  
        if (length > 0) {
          let lastItem = this[name][length - 1];
  
          if (lastItem.name || lastItem.value) {
            this[name].push({
              name: '',
              value: ''
            });
          }
        } else {
          this[name].push({
            name: '',
            value: ''
          });
        }
      },
      deleteHeader(index) {
        this.headers.splice(index, 1);
      },
      deleteData(index) {
        this.data.splice(index, 1);
      },
      send() {
        let self = this;
  
        this.$htAjax.request({
          url: this.url,
          method: this.method.toLowerCase(),
          data: this.transData(this.data),
          headers: this.transData(this.headers)
        }).then(function(res) {
          self.result = res;
          self.resultType = 'success';
        }).catch(function(err) {
          self.result = err;
          self.resultType = 'error';
        });
      }
    }
  };
</script>

<style scoped>
  .field-group{
    display:flex;
    align-items: center;
  }
  .field-group>*{
    margin:0 16px;
  }
</style>
