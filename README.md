# vue-kline     [![npm version](https://badge.fury.io/js/vue-kline.svg)](https://badge.fury.io/js/vue-kline)
[![NPM](https://nodei.co/npm/vue-kline.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-kline/)
> 

## Build Setup
> 本项目基于Vue的k线图.某K线插件做了一些封装和二次开发,使其更加便于使用和修改,方便后来的开发者. 修改主要涉及以下几个点:

* 使用 [webpack](https://webpack.js.org/) 打包 js/css/images/*.vue
* 使用 vue.js 对原有代码进行了拆分和封装 支持所有vue版本
* 删除了一些不必要的逻辑
* 把源码中常用可配置的部分抽出来
* 增加对外接口及事件回调
* 超级简单的组件引入方式,不用在意其背后的实现原理,真正做到快速上手,快速开发

### 演示地址


* 简单效果[Demo](https://zhengquantao.github.io/vue-Kline/)

### Requirements

* jquery
* jquery.mousewheel


### 安装和使用

安装

```bash
$ npm install vue-kline
```

* 使用组件方式引入, 放在想添加的页面上

```html
   <template>
    <div id="app">
        <!--把子组件放到想放的位置-->
        <Vue-kline></Vue-kline>
    </div>
    </template>
    <script>
    import VueKline from "vue-kline"; //当前页引入vue-kline
    export default {
      components: {
          VueKline,                   //以子组件形式注册到当前页面中
      },
    };
    </script>

```
### 自定制(没有使用Vuex作为组件数据转输方式,而是用:xxxx数据绑定方式, 所以vue-kline很轻便、简单)
```html
    <template>
      <div class="container">
        <!-- :klineParams="klineParams" :klineData="klineData" 绑定下面data数据 用于自定制数据传输到vue-kline, ref="data"绑定一个DOM事件 用于调用接口  --->
        <Vue-kline :klineParams="klineParams" :klineData="klineData" ref="callMethods"></Vue-kline>
      </div>
    </template>
    <script>
    import VueKline from "vue-kline";
    improt axios from "axios"
    export default {
      components: {
        ...
        VueKline
      },
      data() {
        return {
          klineParams: {
            width: 600,               // k线窗口宽
            height: 400,              // k线窗口高
            theme: "dark",            // 主题颜色
            language: "zh-cn",        //语言
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],  // 聚合选项
            symbol: "BTC",            // 交易代号
            symbolName: "BTC/USD",    // 交易名称
            intervalTime: 5000,       // k线更新周期 毫秒
            depthWidth: 50            // 深度图宽度
          },
          klineData: {};              // 数据
      },
      computed: {                     // 当然你可以写在methods中, 我这里写到computed中
          requestData(){              //方法名任意取 
            this.$axios.request({
            url: "xxxxx",             //请求地址  
            method: "POST"
          })
          .then(ret => {
            this.klineData = ret      // 把返回数据赋值到上面的 klineData, 
          });
        },  
      },
      mounted(){
        this.requestData;             // 进入页面时执行 requestData()
      },
      methods:{                       // 可调用方法
        this.$refs.callMethods.resize(int width, int height);
        this.$refs.callMethods.setSymbol(string symbol, string symbolName)
        this.$refs.callMethods.setTheme(string style);
        this.$refs.callMethods.setLanguage(string lang);
        this.$refs.callMethods.setIntervalTime(int intervalTime);
        this.$refs.callMethods.setDepthWidth(int width);
        this.$refs.callMethods.onRangeChange();
        this.$refs.callMethods.redraw();
      }
    };
    </script>

```
### 参数

```
klineParams:{}  // K线图参数(具体参数看 构建选项)
klineData:{}    // 数据(只需把指定数据放到这里即可渲染出K线)
```

### 构建选项

| 参数名称  | 参数说明         |  默认值
|:---------|:-----------------|:------------
|`width`   | 宽度 (px)         | 600
|`height` | 高度度 (px) | 400
|`theme` | 主题 dark(暗色)/light(亮色)| dark
|`language` | 语言 zh-cn(简体中文)/en-us(英文)/zh-tw(繁体中文)| zh-cn
|`ranges` | 聚合选项 1w/1d/12h/6h/4h/2h/1h/30m/15m/5m/3m/1m/line (w:周, d:天, h:小时, m:分钟, line:分时数据)| ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"]
|`symbol` | 交易代号| 
|`symbolName`  | 交易名称 | 
|`intervalTime`  | 请求间隔时间(ms) | 3000
|`depthWidth` | 深度图宽度 | 最小50，小于50则取50，默认50


### 方法

* redraw()

    重新绘制线条

```javascript
this.$refs.callMethods.redraw();
```

* resize(int width, int height)

    设置画布大小

```javascript
this.$refs.callMethods.resize(1200, 550);
```

* setSymbol(string symbol, string symbolName)

    设置交易品种

```javascript
this.$refs.callMethods.setSymbol('usd/btc', 'USD/BTC');
```

* setTheme(string style)

    设置主题

```javascript
this.$refs.callMethods.setTheme('dark');  // dark/light
```

* setLanguage(string lang)

    设置语言

```javascript
this.$refs.callMethods.setLanguage('en-us');  // en-us/zh-ch/zh-tw
```

* setIntervalTime(int intervalTime) 

    设置请求间隔时间(ms)

```javascript
this.$refs.callMethods.setIntervalTime(5000);
```

* setDepthWidth(int width)

    设置深度图宽度

```javascript
this.$refs.callMethods.setDepthWidth(100);
```

* onRangeChange: function ()

    聚合时间改变时触发

```javascript
this.$refs.callMethods.onRangeChange();
```


### 事件

| 事件函数                 |  说明
|:-----------------------|:------------
| `onResize: function(width, height)`   | 画布尺寸改变时触发
| `onLangChange: function(lang)`   | 语言改变时触发
| `onSymbolChange: function(symbol, symbolName)`   | 交易品种改变时触发
| `onThemeChange: function(theme)`   | 主题改变时触发
| `onRangeChange: function(range)`   | 聚合时间改变时触发
| `onRequestData: function(param,callback)`| 请求数据时触发，触发时间间隔由`intervalTime`指定，`param`请求参数，`callback(res)`结果回调函数。无论请求是否成功，必须在`onRequestData`里调用`callback`,否则会中断数据请求。


### 回调函数res格式

> 数据请求成功

当success为true，请求成功。

```json
{
  "success": true,
  "data": {
    "lines": [
      [
        1.50790476E12,
        99.30597249871,
        99.30597249871,
        99.30597249871,
        99.30597249871,
        66.9905449283
      ]
    ],
    "depths": {
      "asks": [
        [
          500654.27,
          0.5
        ]
      ],
      "bids": [
        [
          5798.79,
          0.013
        ]
      ]
    }
  }
}
```

> 数据请求失败

当res为空，或者success为false，请求失败。

```json
{
  "success": false,
  "data": null,	        // success为false，则忽略data
}
```


* res参数说明:

* `lines`: K线图, 依次是: 时间(ms), 开盘价, 最高价, 最低价, 收盘价, 成交量
* `depths`深度图数据,`asks`: 一定比例的卖单列表, `bids`:一定比例的买单列表, 其中每项的值依次是 : 成交价, 成交量
