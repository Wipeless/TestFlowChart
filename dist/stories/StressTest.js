"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var React = require("react");
var src_1 = require("../src");
var components_1 = require("./components");
exports.StressTestDemo = function () {
    var xyGrid = lodash_1.flatten(lodash_1.range(0, 1500, 300).map(function (x) { return lodash_1.range(0, 1000, 150).map(function (y) { return ({ x: x, y: y }); }); }));
    var chart = {
        offset: {
            x: 0,
            y: 0,
        },
        nodes: lodash_1.keyBy(xyGrid.map(function (_a) {
            var x = _a.x, y = _a.y;
            return ({
                id: "node-" + x + "-" + y,
                type: 'default',
                position: { x: x + 100, y: y + 100 },
                ports: {
                    port1: {
                        id: 'port1',
                        type: 'top',
                    },
                    port2: {
                        id: 'port2',
                        type: 'bottom',
                    },
                    port3: {
                        id: 'port3',
                        type: 'right',
                    },
                    port4: {
                        id: 'port4',
                        type: 'left',
                    },
                },
            });
        }), 'id'),
        links: lodash_1.keyBy(lodash_1.compact(lodash_1.flatMap(xyGrid, function (_a, idx) {
            var x = _a.x, y = _a.y;
            var next = xyGrid[idx + 1];
            if (next) {
                return [{
                        id: "link-" + x + "-" + y + "-a",
                        from: {
                            nodeId: "node-" + x + "-" + y,
                            portId: 'port2',
                        },
                        to: {
                            nodeId: "node-" + next.x + "-" + next.y,
                            portId: 'port3',
                        },
                    }, {
                        id: "link-" + x + "-" + y + "-b",
                        from: {
                            nodeId: "node-" + x + "-" + y,
                            portId: 'port2',
                        },
                        to: {
                            nodeId: "node-" + next.x + "-" + next.y,
                            portId: 'port4',
                        },
                    }];
            }
            return undefined;
        })), 'id'),
        selected: {},
        hovered: {},
    };
    return (React.createElement(components_1.Page, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: chart })));
};
//# sourceMappingURL=StressTest.js.map