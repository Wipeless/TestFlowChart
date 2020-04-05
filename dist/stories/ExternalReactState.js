"use strict";
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
var src_1 = require("../src");
var actions = require("../src/container/actions");
var components_1 = require("./components");
var exampleChartState_1 = require("./misc/exampleChartState");
/**
 * State is external to the <FlowChart> Element
 *
 * You could easily move this state it Redux or similar by creating your own callback actions
 */
var ExternalReactState = /** @class */ (function (_super) {
    __extends(ExternalReactState, _super);
    function ExternalReactState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = lodash_1.cloneDeep(exampleChartState_1.chartSimple);
        return _this;
    }
    ExternalReactState.prototype.render = function () {
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
            React.createElement(src_1.FlowChart, { chart: chart, callbacks: stateActions })));
    };
    return ExternalReactState;
}(React.Component));
exports.ExternalReactState = ExternalReactState;
//# sourceMappingURL=ExternalReactState.js.map