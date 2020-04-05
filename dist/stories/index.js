"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@storybook/react");
var React = require("react");
var CustomCanvasOuter_1 = require("./CustomCanvasOuter");
var CustomNode_1 = require("./CustomNode");
var CustomNodeInner_1 = require("./CustomNodeInner");
var CustomPort_1 = require("./CustomPort");
var DragAndDropSidebar_1 = require("./DragAndDropSidebar");
var ExternalReactState_1 = require("./ExternalReactState");
var InternalReactState_1 = require("./InternalReactState");
var SelectedSidebar_1 = require("./SelectedSidebar");
var StressTest_1 = require("./StressTest");
react_1.storiesOf('State', module)
    .add('Internal React State', InternalReactState_1.InternalReactState)
    .add('External React State', function () { return React.createElement(ExternalReactState_1.ExternalReactState, null); });
react_1.storiesOf('Custom Components', module)
    .add('Node', CustomNode_1.CustomNodeDemo)
    .add('Node Inner', CustomNodeInner_1.CustomNodeInnerDemo)
    .add('Port', CustomPort_1.CustomPortDemo)
    .add('Canvas Outer', CustomCanvasOuter_1.CustomCanvasOuterDemo);
react_1.storiesOf('Stress Testing', module)
    .add('default', StressTest_1.StressTestDemo);
react_1.storiesOf('Sidebar', module)
    .add('Drag and Drop', DragAndDropSidebar_1.DragAndDropSidebar)
    .add('Selected Sidebar', function () { return React.createElement(SelectedSidebar_1.SelectedSidebar, null); });
//# sourceMappingURL=index.js.map