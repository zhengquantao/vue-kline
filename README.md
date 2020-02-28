# vue-kline     [![npm version](https://badge.fury.io/js/vue-kline.svg)](https://badge.fury.io/js/vue-kline)
[![NPM](https://nodei.co/npm/vue-kline.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-kline/)
> 
* 效果图
<img src="https://github.com/zhengquantao/vue-Kline/blob/master/static/demo.png" width=100%>

## Build Setup
> 本项目基于Vue的k线图.某K线插件做了一些封装和二次开发,使其更加便于使用和修改,方便后来的开发者. 修改主要涉及以下几个点:


- [x] 删除一些不必要的逻辑
- [x] 支持PC端,移动端
- [x] 使用了[webpack](https://webpack.js.org/) 进行打包 js/css/images/*.vue
- [x] 简单使用了 vue.js 对原有代码进行了拆分和封装, 支持所有vue版本
- [x] 把源码中一些常用可配置的部分抽了出来
- [x] 增加对一些外接口及事件回调
- [x] 简单的组件引入方式, 不用在意其背后的实现原理, 真正的做到了快速上手, 快速开发


### 演示地址


* 简单效果(Demo暂时没有升级移动端)[Demo](https://zhengquantao.github.io/vue-Kline/)

### Requirements

* jquery
* jquery.mousewheel

### 提示
* 克隆这个项目是不能直接运行的! [运行项目demo](https://github.com/zhengquantao/vue-kline-demo)

### 安装和使用

安装

```bash
$ npm install vue-kline （vue组件方式）
    OR
  only download src （不推荐,要改变import引入路径和自己安装依赖,对新人不友好）
    OR
  only download html （适合html方式引入）
```

* 使用组件方式引入, 放在想添加的页面上 [（列子）](https://github.com/zhengquantao/vue-kline-demo)

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

* OR 仅仅下载src文件夹 [（列子）](https://github.com/zhengquantao/vue-kline-demo)
```html
  <template>
    <div id="app">
        <!--把子组件放到想放的位置-->
        <Vue-kline></Vue-kline>
    </div>
    </template>
    <script>
    import VueKline from "./src/kline/kline"; //当前页引入vue-kline(引入方式不同,其他方式相同,注意要改你自己的路径)
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
        <!-- :klineParams="klineParams" :klineData="klineData" 绑定下面data数据 用于自定制数据传输到vue-kline, ref="callMethods"绑定一个DOM事件 用于调用接口  --->
        <Vue-kline :klineParams="klineParams" :klineData="klineData" ref="callMethods" @refreshKlineData="refreshKlineData"></Vue-kline>
      </div>
    </template>
    <script>
    import VueKline from "vue-kline";
    import axios from "axios"
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
            depthWidth: 50,           // 深度图宽度
            count: 2                  //显示指标数量 默认两个  
          },
          klineData: {};              // 数据
      }},
      mounted(){
        this.refreshKlineData(900000);// 进入页面时执行,默认聚合时间900000毫秒(15分钟)     
      },
      methods:{                       
          requestData(){              //方法名任意取 
            this.$axios.request({
            url: "xxxxx",             //请求地址  
            method: "POST"
          })
          .then(ret => {
            this.klineData = ret.data      // 把返回数据赋值到上面的 klineData, 
            this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(ret.data.data.lines); //强制更改缓存中的lines值,防止显示不同步
          });
          },  
          refreshKlineData(option){
              if (option===900000){ //如果时间等于15分钟
                    this.requestData();  
              }
          },                  
        // 以下可根据使用场景调用内部自定制方法(如果不需要就不写)
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

* OR 仅仅下载html文件夹
```html
    <div id="kline_container"></div>
    <script src="html/lib/jquery.js"></script>
    <script src="html/lib/jquery.mousewheel.js"></script>
    <script src="html/dist/kline.js"></script>
    <script>
        kline = new Kline({
            element: "#kline_container",
            symbol: "BTC",
            symbolName: "比特币",
            height: 650,
            width: 1200,
            theme: 'dark',
            language: 'zh-cn',
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            limit: 1000,
            intervalTime: 1000,
            depthWidth: 100,
        });

        params = "";
        kline.onRequestData = function onRequestData(params, callback) {
            let data = "这里是你的数据"
            callback(data)
        }
        kline.draw();
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

* refreshKlineData(int time)

    聚合时间改变时触发(ms)

```javascript
this.refreshKlineData(900000);
```


### 事件

| 事件函数                 |  说明
|:-----------------------|:------------
| `onResize: function(width, height)`   | 画布尺寸改变时触发
| `onLangChange: function(lang)`   | 语言改变时触发
| `onSymbolChange: function(symbol, symbolName)`   | 交易品种改变时触发
| `onThemeChange: function(theme)`   | 主题改变时触发
| `refreshKlineData: function(range)`   | 聚合时间改变时触发



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

## 文件解析
* kline.js              默认文件配置(程序入口,可自定义改)
* chart_manager.js      控制文件
* control.js            控制文件
* indicators.js         指标文件 (MA,MACD等)
* layouts.js            控制布局(63行控制右边刻度的宽度)
* plotter.js            主画图Canvas(线,烛台,小数点位数)
* themes.js             主题颜色


## 特别说明
* 当然细心的你可能会发现我npm包名(vue-kline)和github上的名字(vue-Kline)会不一样,对你造成一定误解,对此我十分抱歉。原因是当我先把vue-kline发布到npm上,再回到github上是发现名字十天前已经被人使用了。没有办法github上只能硬着头皮用K大写 vue-Kline。 
* 朋友如果你是`cli3`+`typescript`你可能会遇到无法显示的问题.只要把kline.vue里的render改成template的形式,就能正常显示
* 当然如果你想自定义显示小数点位置精度(默认是小数点后两位),可以在`plotters.js`和`util.js`更改,如果有问题,可以加加下面的群号,我会第一时间给你回复

## vue-kline起源与ctpbee发展计划
vue-kline起因是我们内部开源ctpbee量化项目,需要将数据直观展示给用户,而网上又没有关于vue的实现。在此背景下vue-kline孕育而生。

[ctpbee](https://github.com/ctpbee/ctpbee)是一个可供使用的交易微框架, 主要面对开发者, 希望能得到各位大佬的支持. 
策略以及指标等工具都以ctpbee_** 形式发布. ctpbee只提供最小的内核. 本人崇尚开源, 无论你是交易者还是程序员, 只要你有新的想法以及对开源感兴趣, 欢迎基于ctpbee 开发出新的可用工具. 我会维护一个工具列表, 指引用户前往使用. 

## 最后一句 
如果这个能帮助到你, 请点击star来支持我噢. ^_^  

如果你希望贡献代码, 欢迎加群一起讨论和或者提交PR  QQ群号(: 756319143) [点进加入群聊以了解更多](https://jq.qq.com/?_wv=1027&k=5xWbIq3)

最后一句 ----> 祝各位大佬都能赚钱 ！

