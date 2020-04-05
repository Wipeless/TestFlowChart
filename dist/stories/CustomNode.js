"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var src_1 = require("../src");
var components_1 = require("./components");
var exampleChartState_1 = require("./misc/exampleChartState");
var DarkBox = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  padding: 30px;\n  background: #3e3e3e;\n  color: white;\n  border-radius: 10px;\n"], ["\n  position: absolute;\n  padding: 30px;\n  background: #3e3e3e;\n  color: white;\n  border-radius: 10px;\n"])));
var Circle = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  padding: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #d30000;\n  color: white;\n  border-radius: 50%;\n"], ["\n  position: absolute;\n  width: 150px;\n  height: 150px;\n  padding: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #d30000;\n  color: white;\n  border-radius: 50%;\n"
    /**
     * Create the custom component,
     * Make sure it has the same prop signature
     * You'll need to add {...otherProps} so the event listeners are added to your component
     */
])));
/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
var NodeCustom = function (_a) {
    var node = _a.node, children = _a.children, otherProps = __rest(_a, ["node", "children"]);
    if (node.type === 'output-only') {
        return (React.createElement(DarkBox, __assign({}, otherProps), children));
    }
    else {
        return (React.createElement(Circle, __assign({}, otherProps), children));
    }
};
exports.CustomNodeDemo = function () {
    return (React.createElement(components_1.Page, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: exampleChartState_1.chartSimple, Components: {
                Node: NodeCustom,
            } })));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=CustomNode.js.map