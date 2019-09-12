import Kline from './kline'

export class Theme {
    constructor(){
        this._colors=[];
        this._fonts=[];
    }
    getColor(which) {
        return this._colors[which];
    }
    getFont(which) {
        return this._fonts[which];
    }
}
Theme.theme_color_id = 0;
Theme.theme_font_id = 0;
Theme.Color = {
    Positive: Theme.theme_color_id++,
    Negative: Theme.theme_color_id++,
    PositiveDark: Theme.theme_color_id++,
    NegativeDark: Theme.theme_color_id++,
    Unchanged: Theme.theme_color_id++,
    Background: Theme.theme_color_id++,
    Cursor: Theme.theme_color_id++,
    RangeMark: Theme.theme_color_id++,
    Indicator0: Theme.theme_color_id++,
    Indicator1: Theme.theme_color_id++,
    Indicator2: Theme.theme_color_id++,
    Indicator3: Theme.theme_color_id++,
    Indicator4: Theme.theme_color_id++,
    Indicator5: Theme.theme_color_id++,
    Grid0: Theme.theme_color_id++,
    Grid1: Theme.theme_color_id++,
    Grid2: Theme.theme_color_id++,
    Grid3: Theme.theme_color_id++,
    Grid4: Theme.theme_color_id++,
    TextPositive: Theme.theme_color_id++,
    TextNegative: Theme.theme_color_id++,
    Text0: Theme.theme_color_id++,
    Text1: Theme.theme_color_id++,
    Text2: Theme.theme_color_id++,
    Text3: Theme.theme_color_id++,
    Text4: Theme.theme_color_id++,
    LineColorNormal: Theme.theme_color_id++,
    LineColorSelected: Theme.theme_color_id++,
    CircleColorFill: Theme.theme_color_id++,
    CircleColorStroke: Theme.theme_color_id++
};
Theme.Font = {
    Default: Theme.theme_font_id++
};

export class DarkTheme extends Theme {

    constructor() {
        super();
        this._colors = [];

        this._colors[Theme.Color.Positive] = "#19b34c";
        this._colors[Theme.Color.Negative] = "#990e0e";
        this._colors[Theme.Color.PositiveDark] = "#004718";
        this._colors[Theme.Color.NegativeDark] = "#3b0e08";

        this._colors[Theme.Color.Unchanged] = "#fff";
        this._colors[Theme.Color.Background] = "#161616";
        this._colors[Theme.Color.Cursor] = "#aaa";
        this._colors[Theme.Color.RangeMark] = "#f9ee30";
        this._colors[Theme.Color.Indicator0] = "#ddd";
        this._colors[Theme.Color.Indicator1] = "#f9ee30";
        this._colors[Theme.Color.Indicator2] = "#f600ff";
        this._colors[Theme.Color.Indicator3] = "#6bf";
        this._colors[Theme.Color.Indicator4] = "#a5cf81";
        this._colors[Theme.Color.Indicator5] = "#e18b89";
        this._colors[Theme.Color.Grid0] = "#555";
        this._colors[Theme.Color.Grid1] = "#555";
        this._colors[Theme.Color.Grid3] = "#888";
        this._colors[Theme.Color.Grid4] = "#aaa";
        this._colors[Theme.Color.TextPositive] = "#1bd357";
        this._colors[Theme.Color.TextNegative] = "#ff6f5e";
        this._colors[Theme.Color.Text0] = "#444";
        this._colors[Theme.Color.Text1] = "#666";
        this._colors[Theme.Color.Text2] = "#888";
        this._colors[Theme.Color.Text3] = "#aaa";
        this._colors[Theme.Color.Text4] = "#ccc";
        this._colors[Theme.Color.LineColorNormal] = "#a6a6a6";
        this._colors[Theme.Color.LineColorSelected] = "#ffffff";
        this._colors[Theme.Color.CircleColorFill] = "#161616";
        this._colors[Theme.Color.CircleColorStroke] = "#ffffff";
        this._fonts = [];
        this._fonts[Theme.Font.Default] = "12px Tahoma";
    }

}


export class LightTheme extends Theme {

    constructor() {
        super();
        this._colors = [];

        this._colors[Theme.Color.Positive] = "#53b37b";
        this._colors[Theme.Color.Negative] = "#db5542";
        this._colors[Theme.Color.PositiveDark] = "#66d293";
        this._colors[Theme.Color.NegativeDark] = "#ffadaa";

        this._colors[Theme.Color.Unchanged] = "#fff";
        this._colors[Theme.Color.Background] = "#f6f6f6";
        this._colors[Theme.Color.Cursor] = "#aaa";
        this._colors[Theme.Color.RangeMark] = "#f27935";
        this._colors[Theme.Color.Indicator0] = "#d27972";
        this._colors[Theme.Color.Indicator1] = "#ffb400";
        this._colors[Theme.Color.Indicator2] = "#e849b9";
        this._colors[Theme.Color.Indicator3] = "#1478c8";
        this._colors[Theme.Color.Grid0] = "#aaa";
        this._colors[Theme.Color.Grid1] = "#aaa";
        this._colors[Theme.Color.Grid3] = "#bbb";
        this._colors[Theme.Color.Grid4] = "#aaa";
        this._colors[Theme.Color.TextPositive] = "#53b37b";
        this._colors[Theme.Color.TextNegative] = "#db5542";
        this._colors[Theme.Color.Text0] = "#ccc";
        this._colors[Theme.Color.Text1] = "#aaa";
        this._colors[Theme.Color.Text2] = "#888";
        this._colors[Theme.Color.Text3] = "#666";
        this._colors[Theme.Color.Text4] = "#444";
        this._colors[Theme.Color.LineColorNormal] = "#8c8c8c";
        this._colors[Theme.Color.LineColorSelected] = "#393c40";
        this._colors[Theme.Color.CircleColorFill] = "#f6f6f6";
        this._colors[Theme.Color.CircleColorStroke] = "#393c40";
        this._fonts = [];
        this._fonts[Theme.Font.Default] = "12px Tahoma";
    }

}
