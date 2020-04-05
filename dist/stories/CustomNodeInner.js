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
var Outer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 30px;\n"], ["\n  padding: 30px;\n"])));
var Input = styled_components_1.default.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid cornflowerblue;\n  width: 100%;\n"], ["\n  padding: 10px;\n  border: 1px solid cornflowerblue;\n  width: 100%;\n"
    /**
     * Create the custom component,
     * Make sure it has the same prop signature
     */
])));
/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
var NodeInnerCustom = function (_a) {
    var node = _a.node;
    if (node.type === 'output-only') {
        return (React.createElement(Outer, null,
            React.createElement("p", null, "Use Node inner to customise the content of the node")));
    }
    else {
        return (React.createElement(Outer, null,
            React.createElement("p", null, "Add custom displays for each node.type"),
            React.createElement("p", null, "You may need to stop event propagation so your forms work."),
            React.createElement("br", null),
            React.createElement(Input, { placeholder: "Add forms etc if required", onClick: function (e) { return e.stopPropagation(); }, onMouseUp: function (e) { return e.stopPropagation(); }, onMouseDown: function (e) { return e.stopPropagation(); } })));
    }
};
exports.CustomNodeInnerDemo = function () {
    return (React.createElement(components_1.Page, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: exampleChartState_1.chartSimple, Components: {
                NodeInner: NodeInnerCustom,
            } })));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=CustomNodeInner.js.map