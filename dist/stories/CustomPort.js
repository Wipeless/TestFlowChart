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
var PortDefaultOuter = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 24px;\n  height: 24px;\n  background: cornflowerblue;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  width: 24px;\n  height: 24px;\n  background: cornflowerblue;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])));
var PortCustom = function (props) { return (React.createElement(PortDefaultOuter, null,
    props.port.properties && props.port.properties.value === 'yes' && (React.createElement("svg", { style: { width: '24px', height: '24px' }, viewBox: "0 0 24 24" },
        React.createElement("path", { fill: "white", d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }))),
    props.port.properties && props.port.properties.value === 'no' && (React.createElement("svg", { style: { width: '24px', height: '24px' }, viewBox: "0 0 24 24" },
        React.createElement("path", { fill: "white", d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))),
    !props.port.properties && (React.createElement("svg", { style: { width: '24px', height: '24px' }, viewBox: "0 0 24 24" },
        React.createElement("path", { fill: "white", d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }))))); };
exports.CustomPortDemo = function () {
    return (React.createElement(components_1.Page, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: exampleChartState_1.chartSimple, Components: {
                Port: PortCustom,
            } })));
};
var templateObject_1;
//# sourceMappingURL=CustomPort.js.map