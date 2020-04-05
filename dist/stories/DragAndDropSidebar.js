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
var Message = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmargin: 10px;\npadding: 10px;\nbackground: rgba(0,0,0,0.05);\n"], ["\nmargin: 10px;\npadding: 10px;\nbackground: rgba(0,0,0,0.05);\n"])));
exports.DragAndDropSidebar = function () { return (React.createElement(components_1.Page, null,
    React.createElement(components_1.Content, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: exampleChartState_1.chartSimple })),
    React.createElement(components_1.Sidebar, null,
        React.createElement(Message, null, "Drag and drop these items onto the canvas."),
        React.createElement(components_1.SidebarItem, { type: "top/bottom", ports: {
                port1: {
                    id: 'port1',
                    type: 'top',
                    properties: {
                        custom: 'property',
                    },
                },
                port2: {
                    id: 'port1',
                    type: 'bottom',
                    properties: {
                        custom: 'property',
                    },
                },
            }, properties: {
                custom: 'property',
            } }),
        React.createElement(components_1.SidebarItem, { type: "bottom-only", ports: {
                port1: {
                    id: 'port1',
                    type: 'bottom',
                    properties: {
                        custom: 'property',
                    },
                },
            } }),
        React.createElement(components_1.SidebarItem, { type: "left-right", ports: {
                port1: {
                    id: 'port1',
                    type: 'left',
                    properties: {
                        custom: 'property',
                    },
                },
                port2: {
                    id: 'port2',
                    type: 'right',
                    properties: {
                        custom: 'property',
                    },
                },
            } }),
        React.createElement(components_1.SidebarItem, { type: "all-sides", ports: {
                port1: {
                    id: 'port1',
                    type: 'left',
                },
                port2: {
                    id: 'port2',
                    type: 'right',
                },
                port3: {
                    id: 'port3',
                    type: 'top',
                },
                port4: {
                    id: 'port4',
                    type: 'bottom',
                },
            } }),
        React.createElement(components_1.SidebarItem, { type: "lots-of-ports", ports: {
                port1: {
                    id: 'port1',
                    type: 'left',
                },
                port2: {
                    id: 'port2',
                    type: 'right',
                },
                port3: {
                    id: 'port3',
                    type: 'top',
                },
                port4: {
                    id: 'port4',
                    type: 'bottom',
                },
                port5: {
                    id: 'port5',
                    type: 'left',
                },
                port6: {
                    id: 'port6',
                    type: 'right',
                },
                port7: {
                    id: 'port7',
                    type: 'top',
                },
                port8: {
                    id: 'port8',
                    type: 'bottom',
                },
                port9: {
                    id: 'port9',
                    type: 'left',
                },
                port10: {
                    id: 'port10',
                    type: 'right',
                },
                port11: {
                    id: 'port11',
                    type: 'top',
                },
                port12: {
                    id: 'port12',
                    type: 'bottom',
                },
            } })))); };
var templateObject_1;
//# sourceMappingURL=DragAndDropSidebar.js.map