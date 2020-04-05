"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var src_1 = require("../src");
var components_1 = require("./components");
var exampleChartState_1 = require("./misc/exampleChartState");
var CanvasOuterCustom = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  background-size: 10px 10px;\n  background-color: #4f6791;\n  background-image:\n    linear-gradient(90deg,hsla(0,0%,100%,.1) 1px,transparent 0),\n    linear-gradient(180deg,hsla(0,0%,100%,.1) 1px,transparent 0);\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  cursor: not-allowed;\n"], ["\n  position: relative;\n  background-size: 10px 10px;\n  background-color: #4f6791;\n  background-image:\n    linear-gradient(90deg,hsla(0,0%,100%,.1) 1px,transparent 0),\n    linear-gradient(180deg,hsla(0,0%,100%,.1) 1px,transparent 0);\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  cursor: not-allowed;\n"])));
exports.CustomCanvasOuterDemo = function () {
    return (React.createElement(components_1.Page, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: exampleChartState_1.chartSimple, Components: {
                CanvasOuter: CanvasOuterCustom,
            } })));
};
var templateObject_1;
//# sourceMappingURL=CustomCanvasOuter.js.map