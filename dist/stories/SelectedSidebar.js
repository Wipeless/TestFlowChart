"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var React = require("react");
var styled_components_1 = require("styled-components");
var src_1 = require("../src");
var actions = require("../src/container/actions");
var components_1 = require("./components");
var exampleChartState_1 = require("./misc/exampleChartState");
var Message = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 10px;\n  padding: 10px;\n  line-height: 1.4em;\n"], ["\n  margin: 10px;\n  padding: 10px;\n  line-height: 1.4em;\n"])));
var Button = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px 15px;\n  background: cornflowerblue;\n  color: white;\n  border-radius: 3px;\n  text-align: center;\n  transition: 0.3s ease all;\n  cursor: pointer;\n  &:hover {\n    box-shadow: 0 10px 20px rgba(0,0,0,.1);\n  }\n  &:active {\n    background: #5682d2;\n  }\n"], ["\n  padding: 10px 15px;\n  background: cornflowerblue;\n  color: white;\n  border-radius: 3px;\n  text-align: center;\n  transition: 0.3s ease all;\n  cursor: pointer;\n  &:hover {\n    box-shadow: 0 10px 20px rgba(0,0,0,.1);\n  }\n  &:active {\n    background: #5682d2;\n  }\n"])));
var SelectedSidebar = /** @class */ (function (_super) {
    __extends(SelectedSidebar, _super);
    function SelectedSidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = lodash_1.cloneDeep(exampleChartState_1.chartSimple);
        return _this;
    }
    SelectedSidebar.prototype.render = function () {
        var _this = this;
        var chart = this.state;
        var stateActions = lodash_1.mapValues(actions, function (func) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.setState(func.apply(void 0, args));
            };
        });
        return (React.createElement(components_1.Page, null,
            React.createElement(components_1.Content, null,
                React.createElement(src_1.FlowChart, { chart: chart, callbacks: stateActions })),
            React.createElement(components_1.Sidebar, null, chart.selected.type
                ? React.createElement(Message, null,
                    React.createElement("div", null,
                        "Type: ",
                        chart.selected.type),
                    React.createElement("div", null,
                        "ID: ",
                        chart.selected.id),
                    React.createElement("br", null),
                    React.createElement(Button, { onClick: function () { return stateActions.onDeleteKey(); } }, "Delete"))
                : React.createElement(Message, null, "Click on a Node, Port or Link"))));
    };
    return SelectedSidebar;
}(React.Component));
exports.SelectedSidebar = SelectedSidebar;
var templateObject_1, templateObject_2;
//# sourceMappingURL=SelectedSidebar.js.map