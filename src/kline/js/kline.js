import {
  Control
} from './control'
import {
  ChartManager
} from './chart_manager'
import {
  ChartSettings
} from './chart_settings'
import $ from 'jquery'

export default class Kline {

  constructor(option) {
    //容器
    this.element = "#kline_container";
    this.chartMgr = null;
    //定时器(每个五秒刷新一下数据)
    this.timer = null;
    this.buttonDown = false;
    this.init = false;
    this.requestParam = "";
    //是否全屏切换
    this.isSized = false;
    this.data = {};
    //窗口宽度
    this.width = 1200;
    //窗口高度
    this.height = 650;
    //期货品种英文名称
    this.symbol = "";
    //期货品种中文名称
    this.symbolName = "";
    this.range = null;
    this.url = "";
    this.limit = 1000;
    //定时器执行间隔时间
    this.intervalTime = 5000;
    this.debug = true;
    //语言
    this.language = "zh-cn";
    //主题
    this.theme = "dark";
    //时间范围
    this.ranges = ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"];
    this.depthWidth = 100;

    this.periodMap = {
      "01w": 7 * 86400 * 1000,
      "03d": 3 * 86400 * 1000,
      "01d": 86400 * 1000,
      "12h": 12 * 3600 * 1000,
      "06h": 6 * 3600 * 1000,
      "04h": 4 * 3600 * 1000,
      "02h": 2 * 3600 * 1000,
      "01h": 3600 * 1000,
      "30m": 30 * 60 * 1000,
      "15m": 15 * 60 * 1000,
      "05m": 5 * 60 * 1000,
      "03m": 3 * 60 * 1000,
      "01m": 60 * 1000,
      "line": 60 * 1000
    };
    this.tagMapPeriod = {
      "1w": "01w",
      "3d": "03d",
      "1d": "01d",
      "12h": "12h",
      "6h": "06h",
      "4h": "04h",
      "2h": "02h",
      "1h": "01h",
      "30m": "30m",
      "15m": "15m",
      "5m": "05m",
      "3m": "03m",
      "1m": "01m",
      "line": "line"
    };
    //事件
    this.onResize = null;
    this.onLangChange = null;
    this.onSymbolChange = null;
    this.onThemeChange = null;
    this.onRangeChange = null;
    this.onRequestData = null;

    //将构造函数接受的参数拷贝给this
    Object.assign(this, option);
    //判断Kline是否已经new过
    if (!Kline.created) {
      Kline.instance = this;
      Kline.created = true;
    }
    // 返回实例
    return Kline.instance;
  }


  /*********************************************
   * Methods
   *********************************************/
  //绘图
  draw() {
    Kline.chartMgr = new ChartManager();
    //获取窗体dom元素
    let view = $(this.element);
    for (let k in this.ranges) {
      let res = $(view).find('[name="' + this.ranges[k] + '"]');
      res.each(function (i, e) {
        //显示时间间隔tab栏
        $(e).attr("style", "display:inline-block");
      });
    }
    //定时器开始每过5秒刷新一次
    setInterval(Control.refreshFunction, this.intervalTime);
    //注册事件
    this.registerMouseEvent();

    ChartManager.instance.bindCanvas("main", document.getElementById("chart_mainCanvas"));
    ChartManager.instance.bindCanvas("overlay", document.getElementById("chart_overlayCanvas"));
    // 刷新模板
    Control.refreshTemplate();
    // 设置窗口宽高
    Control.onSize(this.width, this.height);
    Control.readCookie();
    // 设置主题
    this.setTheme(this.theme);
    this.theme === 'light' ? $('#sidebarTheme').addClass('light') : $('#sidebarTheme').addClass('dark');
    // 设置语言
    this.setLanguage(this.language);
    // 设置期货品种名称
    this.setSymbol(this.symbol, this.symbolName);

    $(this.element).css({
      visibility: "visible"
    });
  }
  // 设置窗体宽高的方法
  resize(width, height) {
    this.width = width;
    this.height = height;
    Control.onSize(this.width, this.height);
  }
  // 设置期货品种的方法
  setSymbol(symbol, symbolName) {
    this.symbol = symbol;
    this.symbolName = symbolName;
    Control.switchSymbol(symbol, symbolName);
    this.onSymbolChangeFunc(symbol, symbolName);
  }
  // 设置主题的方法
  setTheme(style) {
    this.theme = style;
    Control.switchTheme(style);
  }
  // 设置语言的方法
  setLanguage(lang) {
    this.language = lang;
    Control.chartSwitchLanguage(lang);
  }
  // 设置每个几秒刷新一次数据
  setIntervalTime(intervalTime) {
    this.intervalTime = intervalTime;
    if (this.debug) {
      console.log('DEBUG: interval time changed to ' + intervalTime);
    }
  }
  // 设置深度图的宽度
  setDepthWidth(width) {
    this.depthWidth = width;
    ChartManager.instance.redraw('All', false);
  }

  /*********************************************
   * Events
   *********************************************/
  // 你可以重写设置窗体的宽高事件
  onResizeFunc(width, height) {
    if (this.debug) {
      console.log("DEBUG: chart resized to width: " + width + " height: " + height);
    }
    this.onResize && this.onResize(width, height);
  }
  // 重写设置语言事件
  onLangChangeFunc(lang) {
    if (this.debug) {
      console.log("DEBUG: language changed to " + lang);
    }
    this.onLangChange && this.onLangChange(lang);
  }
  // 重写设置期货品种事件
  onSymbolChangeFunc(symbol, symbolName) {
    if (this.debug) {
      console.log("DEBUG: symbol changed to " + symbol + " " + symbolName);
    }
    this.onSymbolChange && this.onSymbolChange(symbol, symbolName);
  }
  // 重写设置主题事件
  onThemeChangeFunc(theme) {
    if (this.debug) {
      console.log("DEBUG: themes changed to : " + theme);
    }
    this.onThemeChange && this.onThemeChange(theme);
  }
   // 重写设置周期间隔事件
  onRangeChangeFunc(range) {
    if (this.debug) {
      console.log("DEBUG: range changed to " + range);
    }
    this.onRangeChange && this.onRangeChange(range);
  }
   // 重写数据的渲染事件
  onRequestDataFunc(param, callback) {
    if (this.debug) {
      console.log("DEBUG: request data to " + JSON.stringify(param));
    }
    this.onRequestData && this.onRequestData(param, callback);
  }
  // 注册事件
  registerMouseEvent() {
    $(document).ready(function () {
      //设置窗体大小
      function __resize() {
        //判断浏览器类型
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          setTimeout(function () {
            Control.onSize(this.width, this.height)
          }, 200);
        } else {
          Control.onSize(this.width, this.height)
        }
      }
      // 在画布上禁用右键
      $('#chart_overlayCanvas').bind("contextmenu", function (e) {
        e.cancelBubble = true;
        e.returnValue = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
      //顶部tab栏的周期按钮鼠标经过事件---下拉菜单
      $(".chart_container .chart_dropdown .chart_dropdown_t")
        .mouseover(function () {
          let container = $(".chart_container");
          let title = $(this);
          let dropdown = title.next();
          let containerLeft = container.offset().left;
          let titleLeft = title.offset().left;
          let containerWidth = container.width();
          let titleWidth = title.width();
          let dropdownWidth = dropdown.width();
          let d = ((dropdownWidth - titleWidth) / 2) << 0;
          if (titleLeft - d < containerLeft + 4) {
            d = titleLeft - containerLeft - 4;
          } else if (titleLeft + titleWidth + d > containerLeft + containerWidth - 4) {
            d += titleLeft + titleWidth + d - (containerLeft + containerWidth - 4) + 19;
          } else {
            d += 4;
          }
          dropdown.css({
            "margin-left": -d
          });
          title.addClass("chart_dropdown-hover");
          dropdown.addClass("chart_dropdown-hover");
        })
        // 鼠标离开事件
        .mouseout(function () {
          $(this).next().removeClass("chart_dropdown-hover");
          $(this).removeClass("chart_dropdown-hover");
        });
      //顶部tab栏的更多按钮鼠标事件---下拉菜单
      $(".chart_dropdown_data")
        .mouseover(function () {
          $(this).addClass("chart_dropdown-hover");
          $(this).prev().addClass("chart_dropdown-hover");
        })
        .mouseout(function () {
          $(this).prev().removeClass("chart_dropdown-hover");
          $(this).removeClass("chart_dropdown-hover");
        });
      // 指标参数设置
      $("#chart_btn_parameter_settings").click(function () {
        $('#chart_parameter_settings').addClass("clicked");
        $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        $("#chart_parameter_settings").find("th").each(function () {
          let name = $(this).html();
          let index = 0;
          let tmp = ChartSettings.get();
          let value = tmp.indics[name];
          $(this.nextElementSibling).find("input").each(function () {
            if (value !== null && index < value.length) {
              $(this).val(value[index]);
            }
            index++;
          });
        });
      });
      // 指标参数设置关闭事件
      $("#close_settings").click(function () {
        $('#chart_parameter_settings').removeClass("clicked");
      });
      //顶部裸露出来的周期的切换事件
      $(".chart_container .chart_toolbar_tabgroup a")
        .click(function () {
          Control.switchPeriod($(this).parent().attr('name'));
        });
      //由周期按钮触发的二级菜单的周期切换事件
      $("#chart_toolbar_periods_vert ul a").click(function () {
        Control.switchPeriod($(this).parent().attr('name'));
      });
      // 深度图的开启与关闭
      $("#chart_show_depth")
        .click(function () {
          if ($(this).hasClass('selected')) {
            Control.switchDepth("off");
          } else {
            Control.switchDepth("on");
          }
        });
      // 画线工具的开启与关闭
      $("#chart_show_tools")
        .click(function () {
          if ($(this).hasClass('selected')) {
            Control.switchTools('off');
          } else {
            Control.switchTools('on');
          }
        });
      // 画线工具的点击事件
      $("#chart_toolpanel .chart_toolpanel_button")
        .click(function () {
          $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
          $("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
          $(this).addClass("selected");
          let name = $(this).children().attr('name');
          Kline.instance.chartMgr.setRunningMode(ChartManager.DrawingTool[name]);
        });
      // 技术指标的开启与关闭
      $('#chart_show_indicator')
        .click(function () {
          if ($(this).hasClass('selected')) {
            Control.switchIndic('off');
          } else {
            Control.switchIndic('on');
          }
        });
      // 底部tab栏的点击事件---切换指标
      $("#chart_tabbar li a")
        .click(function () {
          $("#chart_tabbar li a").removeClass('selected');
          $(this).addClass('selected');
          let name = $(this).attr('name');
          let tmp = ChartSettings.get();
          tmp.charts.indics[1] = name;
          ChartSettings.save();
          ChartManager.instance.getChart().setIndicator(1, name);
        });
      // 主图样式的切换
      $("#chart_select_chart_style a")
        .click(function () {
          $("#chart_select_chart_style a").removeClass('selected');
          $(this).addClass("selected");
          let tmp = ChartSettings.get();
          tmp.charts.chartStyle = $(this)[0].innerHTML;
          ChartSettings.save();
          let mgr = ChartManager.instance;
          mgr.setChartStyle("frame0.k0", $(this).html());
          mgr.redraw();
        });
      // 主题切换
      $('#chart_dropdown_themes li').click(function () {
        $('#chart_dropdown_themes li a').removeClass('selected');
        let name = $(this).attr('name');
        if (name === 'chart_themes_dark') {
          Control.switchTheme('dark');
        } else if (name === 'chart_themes_light') {
          Control.switchTheme('light');
        }
      });
      // 主指标的切换
      $("#chart_select_main_indicator a")
        .click(function () {
          $("#chart_select_main_indicator a").removeClass('selected');
          $(this).addClass("selected");
          let name = $(this).attr('name');
          let tmp = ChartSettings.get();
          tmp.charts.mIndic = name;
          ChartSettings.save();
          let mgr = ChartManager.instance;
          if (!mgr.setMainIndicator("frame0.k0", name))
            mgr.removeMainIndicator("frame0.k0");
          mgr.redraw();
        });
      // 主题切换
      $('#chart_toolbar_theme a').click(function () {
        $('#chart_toolbar_theme a').removeClass('selected');
        if ($(this).attr('name') === 'dark') {
          $('#sidebarTheme').removeClass('light').addClass('dark');
          Control.switchTheme('dark');
        } else if ($(this).attr('name') === 'light') {
          $('#sidebarTheme').removeClass('dark').addClass('light');
          Control.switchTheme('light');
        }
      });
      // 主题切换
      $('#chart_select_theme li a').click(function () {
        $('#chart_select_theme a').removeClass('selected');
        if ($(this).attr('name') === 'dark') {
          $('#sidebarTheme').removeClass('light').addClass('dark');
          Control.switchTheme('dark');
        } else if ($(this).attr('name') === 'light') {
          $('#sidebarTheme').removeClass('dark').addClass('light');
          Control.switchTheme('light');
        }
      });
      // 画线工具的开启与关闭
      $('#chart_enable_tools li a').click(function () {
        $('#chart_enable_tools a').removeClass('selected');
        if ($(this).attr('name') === 'on') {
          Control.switchTools('on');
        } else if ($(this).attr('name') === 'off') {
          Control.switchTools('off');
        }
      });
      // 技术指标的开启与关闭
      $('#chart_enable_indicator li a').click(function () {
        $('#chart_enable_indicator a').removeClass('selected');
        if ($(this).attr('name') === 'on') {
          Control.switchIndic('on');
        } else if ($(this).attr('name') === 'off') {
          Control.switchIndic('off');
        }
      });
      // 语言切换
      $('#chart_language_setting_div li a').click(function () {

        $('#chart_language_setting_div a').removeClass('selected');
        if ($(this).attr('name') === 'zh-cn') {
          Control.chartSwitchLanguage('zh-cn');
        } else if ($(this).attr('name') === 'en-us') {

          Control.chartSwitchLanguage('en-us');
        } else if ($(this).attr('name') === 'zh-tw') {
          Control.chartSwitchLanguage('zh-tw');
        }
      });
      // 键盘的del事件---删除使用画线工具画的线
      $(document).keyup(function (e) {
        if (e.keyCode === 46) {
          ChartManager.instance.deleteToolObject();
          ChartManager.instance.redraw('OverlayCanvas', false);
        }
      });
      // 清除使用画线工具画出的所有线
      $("#clearCanvas").click(function () {
        let pDPTool = ChartManager.instance.getDataSource("frame0.k0");
        let len = pDPTool.getToolObjectCount();
        for (let i = 0; i < len; i++) {
          pDPTool.delToolObject();
        }
        ChartManager.instance.redraw('OverlayCanvas', false);
      });
      // 画布的鼠标事件
      $("#chart_overlayCanvas")
        .mousemove(function (e) {
          let r = e.target.getBoundingClientRect();
          let x = e.clientX - r.left;
          let y = e.clientY - r.top;
          let mgr = ChartManager.instance;
          if (Kline.instance.buttonDown === true) {
            mgr.onMouseMove("frame0", x, y, true);
            mgr.redraw("All", false);
          } else {
            mgr.onMouseMove("frame0", x, y, false);
            mgr.redraw("OverlayCanvas");
          }
        })
        .mouseleave(function (e) {
          let r = e.target.getBoundingClientRect();
          let x = e.clientX - r.left;
          let y = e.clientY - r.top;
          let mgr = ChartManager.instance;
          mgr.onMouseLeave("frame0", x, y, false);
          mgr.redraw("OverlayCanvas");
        })
        .mouseup(function (e) {
          if (e.which !== 1) {
            return;
          }
          Kline.instance.buttonDown = false;
          let r = e.target.getBoundingClientRect();
          let x = e.clientX - r.left;
          let y = e.clientY - r.top;
          let mgr = ChartManager.instance;
          mgr.onMouseUp("frame0", x, y);
          mgr.redraw("All");
        })
        .mousedown(function (e) {
          if (e.which !== 1) {
            ChartManager.instance.deleteToolObject();
            ChartManager.instance.redraw('OverlayCanvas', false);
            return;
          }
          Kline.instance.buttonDown = true;
          let r = e.target.getBoundingClientRect();
          let x = e.clientX - r.left;
          let y = e.clientY - r.top;
          ChartManager.instance.onMouseDown("frame0", x, y);
        });
      // 指标参数设置的input框的改变事件
      $("#chart_parameter_settings :input").change(function () {
        let name = $(this).attr("name");
        let index = 0;
        let valueArray = [];
        let mgr = ChartManager.instance;
        $("#chart_parameter_settings :input").each(function () {
          if ($(this).attr("name") === name) {
            if ($(this).val() !== "" && $(this).val() !== null && $(this).val() !== undefined) {
              let i = parseInt($(this).val());
              valueArray.push(i);
            }
            index++;
          }
        });
        if (valueArray.length !== 0) {
          mgr.setIndicatorParameters(name, valueArray);
          let value = mgr.getIndicatorParameters(name);
          let cookieArray = [];
          index = 0;
          $("#chart_parameter_settings :input").each(function () {
            if ($(this).attr("name") === name) {
              if ($(this).val() !== "" && $(this).val() !== null && $(this).val() !== undefined) {
                $(this).val(value[index].getValue());
                cookieArray.push(value[index].getValue());
              }
              index++;
            }
          });
          let tmp = ChartSettings.get();
          tmp.indics[name] = cookieArray;
          ChartSettings.save();
          mgr.redraw('All', false);
        }
      });
      // 指标参数设置的默认值按钮的点击事件
      $("#chart_parameter_settings button").click(function () {
        let name = $(this).parents("tr").children("th").html();
        let index = 0;
        let value = ChartManager.instance.getIndicatorParameters(name);
        let valueArray = [];
        $(this).parent().prev().children('input').each(function () {
          if (value !== null && index < value.length) {
            $(this).val(value[index].getDefaultValue());
            valueArray.push(value[index].getDefaultValue());
          }
          index++;
        });
        ChartManager.instance.setIndicatorParameters(name, valueArray);
        let tmp = ChartSettings.get();
        tmp.indics[name] = valueArray;
        ChartSettings.save();
        ChartManager.instance.redraw('All', false);
      });
      // 切换全屏
      $('body').on('click', '#sizeIcon', function () {
        Kline.instance.isSized = !Kline.instance.isSized;
        if (Kline.instance.isSized) {
          $(Kline.instance.element).css({
            position: 'fixed',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
            zIndex: '10000'
          });

          Control.onSize();
          $('html,body').css({
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          });
        } else {
          $(Kline.instance.element).attr('style', '');

          $('html,body').attr('style', '');

          Control.onSize(Kline.instance.width, Kline.instance.height);
          $(Kline.instance.element).css({
            visibility: 'visible',
            height: Kline.instance.height + 'px'
          });
        }
      });
    })

  }

}
Kline.created = false;
Kline.instance = null;
