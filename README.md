# vue-kline

> 

## Build Setup
> 基于Vue的K线图组件

### 演示地址

<<<<<<< HEAD
* 效果和这个一样后面[Demo](https://lindakai2016.github.io/react-kline/index.html)
=======
* [Demo]效果和这个一样后面(https://lindakai2016.github.io/react-kline/index.html)
>>>>>>> origin/master

### 安装和使用

安装

```bash
$ npm install vue-kline
```

* 使用

```html
   <template>
    <div id="app">
        <Vue-kline :klineParams="klineParams" :klineData="klineData" ref="callMethods"></Vue-kline>
    </div>
    </template>
    <script>
    import VueKline from "vue-kline";
    export default {
    components: {
        VueKline
    },
    data() {
        return {
        klineParams: {
            width: 600,
            height: 400,
            theme: "dark",
            language: "zh-cn",
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: "BTC",
            symbolName: "BTC/USD",
            intervalTime: 5000,
            depthWidth: 50
        },
        klineData: {
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
    };
    }
    };
    </script>
    <style>
    </style>

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
|`limit`  | 分页大小 | 1000
|`intervalTime`  | 请求间隔时间(ms) | 3000
|`debug` | 是否开启调试模式 true/false |  true
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

* setIntervalTime: function (intervalTime) 

    设置请求间隔时间(ms)

```javascript
this.$refs.callMethods.setIntervalTime(5000);
```

* setDepthWidth: function (width)

    设置深度图宽度

```javascript
this.$refs.callMethods.setDepthWidth(100);
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

### 数据请求param格式

```json
{
  "symbol": "BTC",		// 交易品种
  "range": 900000,		// range类型，毫秒
  "limit": 1000,
  "since": "1512205140000"      // 时间
}
```

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