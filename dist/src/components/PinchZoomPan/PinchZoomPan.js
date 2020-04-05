"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var SNAP_TOLERANCE = 0.001;
var OVER_TRANSFORMATION_TOLERANCE = 0.05;
var DOUBLE_TAP_THRESHOLD = 300;
var ANIMATION_SPEED = 0.1;
var snapToTarget = function (value, target, tolerance) {
    var withinRange = Math.abs(target - value) < tolerance;
    return withinRange ? target : value;
};
var rangeBind = function (lowerBound, upperBound, value) {
    return Math.min(upperBound, Math.max(lowerBound, value));
};
var invert = function (value) { return value * -1; };
var getRelativePosition = function (_a, relativeToElement) {
    var clientX = _a.clientX, clientY = _a.clientY;
    var rect = relativeToElement.getBoundingClientRect();
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
};
var getMidpoint = function (pointA, pointB) { return ({
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2
}); };
var getDistanceBetweenPoints = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
};
var PinchZoomPan = /** @class */ (function (_super) {
    __extends(PinchZoomPan, _super);
    function PinchZoomPan(props) {
        var _this = _super.call(this, props) || this;
        _this.handleTouchStart = _this.handleTouchStart.bind(_this);
        _this.handleTouchMove = _this.handleTouchMove.bind(_this);
        _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
        _this.handleMouseDown = _this.handleMouseDown.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseUp = _this.handleMouseUp.bind(_this);
        _this.handleMouseWheel = _this.handleMouseWheel.bind(_this);
        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
        _this.handleImageLoad = _this.handleImageLoad.bind(_this);
        return _this;
    }
    PinchZoomPan.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.initialTop !== prevState.initialTop ||
            nextProps.initialLeft !== prevState.initialLeft ||
            nextProps.initialScale !== prevState.initialScale) {
            return {
                initialTop: nextProps.initialTop,
                initialLeft: nextProps.initialLeft,
                initialScale: nextProps.initialScale
            };
        }
        else {
            return null;
        }
    };
    // event handlers
    PinchZoomPan.prototype.handleTouchStart = function (event) {
        this.animation && cancelAnimationFrame(this.animation);
        var touches = event.touches;
        if (touches.length === 2) {
            this.pinchStart(touches);
            this.lastPanPointerPosition = null;
        }
        else if (touches.length === 1) {
            this.pointerDown(touches[0]);
        }
    };
    PinchZoomPan.prototype.handleTouchMove = function (event) {
        var touches = event.touches;
        if (touches.length === 2) {
            // suppress viewport scaling
            event.preventDefault();
            this.pinchChange(touches);
        }
        else if (touches.length === 1) {
            var swipingDown = this.pan(touches[0]) > 0;
            if (swipingDown && this.state.top < 0) {
                // suppress pull-down-refresh since swiping down will reveal the hidden overflow of the image
                event.preventDefault();
            }
        }
    };
    PinchZoomPan.prototype.handleTouchEnd = function (event) {
        if (event.touches && event.touches.length > 0)
            return null;
        // We allow transient +/-5% over-pinching.
        // Animate the bounce back to constraints if applicable.
        this.ensureValidTransform(ANIMATION_SPEED);
        this.pointerUp(event.timeStamp);
        // suppress mouseUp, in case of tap
        return event.preventDefault();
    };
    PinchZoomPan.prototype.handleMouseDown = function (event) {
        this.animation && cancelAnimationFrame(this.animation);
        this.mouseDown = true;
        this.pointerDown(event);
    };
    PinchZoomPan.prototype.handleMouseMove = function (event) {
        if (!this.mouseDown)
            return null;
        return this.pan(event);
    };
    PinchZoomPan.prototype.handleMouseUp = function (event) {
        this.pointerUp(event.timeStamp);
        if (this.mouseDown) {
            this.mouseDown = false;
        }
    };
    PinchZoomPan.prototype.handleMouseWheel = function (event) {
        this.animation && cancelAnimationFrame(this.animation);
        var point = getRelativePosition(event, this.container);
        if (event.deltaY > 0) {
            if (this.state.scale > this.minScale) {
                this.zoomOut(point);
                event.preventDefault();
            }
        }
        else if (event.deltaY < 0) {
            if (this.state.scale < this.props.maxScale) {
                this.zoomIn(point);
                event.preventDefault();
            }
        }
    };
    PinchZoomPan.prototype.handleWindowResize = function () {
        this.ensureConstraints();
    };
    PinchZoomPan.prototype.handleImageLoad = function () {
        this.ensureConstraints();
    };
    // actions
    PinchZoomPan.prototype.pointerDown = function (clientPosition) {
        this.lastPanPointerPosition = getRelativePosition(clientPosition, this.container);
    };
    PinchZoomPan.prototype.pan = function (pointerClientPosition) {
        var pointerPosition = getRelativePosition(pointerClientPosition, this.container);
        var translateX = pointerPosition.x - this.lastPanPointerPosition.x;
        var translateY = pointerPosition.y - this.lastPanPointerPosition.y;
        var top = this.state.top + translateY;
        var left = this.state.left + translateX;
        // use 0 tolerance to prevent over-panning (doesn't look good)
        this.move(top, left, 0);
        this.lastPanPointerPosition = pointerPosition;
        return translateY > 0
            ? 1 // swiping down
            : translateY < 0
                ? -1 // swiping up
                : 0;
    };
    PinchZoomPan.prototype.pointerUp = function (timeStamp) {
        if (this.lastPointerUpTimeStamp &&
            this.lastPointerUpTimeStamp + DOUBLE_TAP_THRESHOLD > timeStamp) {
            // reset
            this.transformToProps(ANIMATION_SPEED);
        }
        this.lastPointerUpTimeStamp = timeStamp;
    };
    PinchZoomPan.prototype.move = function (top, left, tolerance, speed) {
        if (speed === void 0) { speed = 0; }
        this.applyTransform(top, left, this.state.scale, tolerance, speed);
    };
    PinchZoomPan.prototype.pinchStart = function (touches) {
        var pointA = getRelativePosition(touches[0], this.container);
        var pointB = getRelativePosition(touches[1], this.container);
        this.lastPinchLength = getDistanceBetweenPoints(pointA, pointB);
    };
    PinchZoomPan.prototype.pinchChange = function (touches) {
        var pointA = getRelativePosition(touches[0], this.container);
        var pointB = getRelativePosition(touches[1], this.container);
        var length = getDistanceBetweenPoints(pointA, pointB);
        var scale = (this.state.scale * length) / this.lastPinchLength;
        var midpoint = getMidpoint(pointA, pointB);
        this.zoom(scale, midpoint, OVER_TRANSFORMATION_TOLERANCE);
        this.lastPinchMidpoint = midpoint;
        this.lastPinchLength = length;
    };
    PinchZoomPan.prototype.zoomIn = function (midpoint) {
        midpoint = midpoint || {
            x: this.container.offsetWidth / 2,
            y: this.container.offsetHeight / 2
        };
        this.zoom(this.state.scale * 1.05, midpoint, 0);
    };
    PinchZoomPan.prototype.zoomOut = function (midpoint) {
        midpoint = midpoint || {
            x: this.container.offsetWidth / 2,
            y: this.container.offsetHeight / 2
        };
        this.zoom(this.state.scale * 0.95, midpoint, 0);
    };
    PinchZoomPan.prototype.zoom = function (scale, midpoint, tolerance, speed) {
        if (speed === void 0) { speed = 0; }
        scale = this.getValidTransform(0, 0, scale, tolerance).scale;
        var incrementalScalePercentage = (this.state.scale - scale) / this.state.scale;
        var translateY = (midpoint.y - this.state.top) * incrementalScalePercentage;
        var translateX = (midpoint.x - this.state.left) * incrementalScalePercentage;
        var top = this.state.top + translateY;
        var left = this.state.left + translateX;
        this.applyTransform(top, left, scale, tolerance, speed);
    };
    // state validation and transformation methods
    PinchZoomPan.prototype.applyTransform = function (requestedTop, requestedLeft, requestedScale, tolerance, speed) {
        var _this = this;
        if (speed === void 0) { speed = 0; }
        var _a = this.getValidTransform(requestedTop, requestedLeft, requestedScale, tolerance), top = _a.top, left = _a.left, scale = _a.scale;
        if (this.state.scale === scale &&
            this.state.top === top &&
            this.state.left === left) {
            return;
        }
        if (speed > 0) {
            var frame_1 = function () {
                var translateY = top - _this.state.top;
                var translateX = left - _this.state.left;
                var translateScale = scale - _this.state.scale;
                var nextTransform = {
                    top: snapToTarget(_this.state.top + speed * translateY, top, SNAP_TOLERANCE),
                    left: snapToTarget(_this.state.left + speed * translateX, left, SNAP_TOLERANCE),
                    scale: snapToTarget(_this.state.scale + speed * translateScale, scale, SNAP_TOLERANCE)
                };
                _this.setState(nextTransform, function () { return (_this.animation = requestAnimationFrame(frame_1)); });
            };
            this.animation = requestAnimationFrame(frame_1);
        }
        else {
            this.setState({
                top: top,
                left: left,
                scale: scale
            });
        }
    };
    PinchZoomPan.prototype.getValidTransform = function (top, left, scale, tolerance) {
        var transform = {
            scale: scale || 1,
            top: top || 0,
            left: left || 0
        };
        var lowerBoundFactor = 1.0 - tolerance;
        var upperBoundFactor = 1.0 + tolerance;
        transform.scale = rangeBind(this.minScale * lowerBoundFactor, this.props.maxScale * upperBoundFactor, transform.scale);
        // get dimensions by which scaled image overflows container
        var negativeSpace = this.calculateNegativeSpace(transform.scale);
        var overflow = {
            width: Math.max(0, invert(negativeSpace.width)),
            height: Math.max(0, invert(negativeSpace.height))
        };
        // prevent moving by more than the overflow
        // example: overflow.height = 100, tolerance = 0.05 => top is constrained between -105 and +5
        transform.top = rangeBind(invert(overflow.height) * upperBoundFactor, overflow.height * upperBoundFactor - overflow.height, transform.top);
        transform.left = rangeBind(invert(overflow.width) * upperBoundFactor, overflow.width * upperBoundFactor - overflow.width, transform.left);
        return transform;
    };
    PinchZoomPan.prototype.transformToProps = function (speed) {
        if (speed === void 0) { speed = 0; }
        var scale = this.props.initialScale === "auto"
            ? this.calculateAutofitScale()
            : this.props.initialScale;
        this.applyTransform(this.props.initialTop, this.props.initialLeft, scale, 0, speed);
    };
    PinchZoomPan.prototype.ensureValidTransform = function (speed) {
        if (speed === void 0) { speed = 0; }
        this.applyTransform(this.state.top, this.state.left, this.state.scale, 0, speed);
    };
    // lifecycle methods
    PinchZoomPan.prototype.render = function () {
        var _this = this;
        var childElement = React.Children.only(this.props.children);
        var originalRef = childElement.ref;
        var composedRef = function (element) {
            _this.image = element;
            if (typeof originalRef === "function") {
                originalRef(element);
            }
        };
        return (React.createElement("div", { style: {
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "100%"
            } }, React.cloneElement(childElement, {
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
            onMouseDown: this.handleMouseDown,
            onMouseMove: this.handleMouseMove,
            onMouseUp: this.handleMouseUp,
            onWheel: this.handleMouseWheel,
            onDragStart: function (event) { return event.preventDefault(); },
            onLoad: this.handleImageLoad,
            ref: composedRef,
            style: {
                cursor: "pointer",
                transform: "translate3d(" + this.state.left + "px, " + this.state.top + "px, 0) scale(" + this.state.scale + ")",
                transformOrigin: "0 0"
            }
        })));
    };
    PinchZoomPan.prototype.componentDidMount = function () {
        this.image.addEventListener("touchmove", this.handleTouchMove, {
            passive: false
        });
        window.addEventListener("resize", this.handleWindowResize);
        // Using the child image's original parent enables flex items, e.g., dimensions not explicitly set
        this.container = this.image.parentNode.parentNode;
        if (this.image.offsetWidth && this.image.offsetHeight) {
            this.applyConstraints();
            this.transformToProps();
        }
    };
    PinchZoomPan.prototype.componentDidUpdate = function () {
        if (this.image.offsetWidth && this.image.offsetHeight) {
            this.ensureConstraints();
            if (typeof this.state.scale === "undefined") {
                // reset to new props
                this.transformToProps();
            }
        }
    };
    PinchZoomPan.prototype.componentWillUnmount = function () {
        this.image.removeEventListener("touchmove", this.handleTouchMove);
        window.removeEventListener("resize", this.handleWindowResize);
    };
    // sizing methods
    PinchZoomPan.prototype.ensureConstraints = function () {
        if (this.image.offsetWidth && this.image.offsetHeight) {
            var negativeSpace = this.calculateNegativeSpace(1);
            if (!this.lastUnzoomedNegativeSpace ||
                negativeSpace.height !== this.lastUnzoomedNegativeSpace.height ||
                negativeSpace.width !== this.lastUnzoomedNegativeSpace.width) {
                // image and/or container dimensions have been set / updated
                this.applyConstraints();
                this.forceUpdate();
            }
        }
    };
    PinchZoomPan.prototype.applyConstraints = function () {
        var minScale = this.props.minScale
            ? this.calculateAutofitScale()
            : this.props.minScale;
        if (this.minScale !== minScale) {
            this.minScale = minScale;
            this.ensureValidTransform();
        }
        this.lastUnzoomedNegativeSpace = this.calculateNegativeSpace(1);
    };
    PinchZoomPan.prototype.calculateNegativeSpace = function (scale) {
        if (scale === void 0) { scale = this.state.scale; }
        // get difference in dimension between container and scaled image
        var width = this.container.offsetWidth - scale * this.image.offsetWidth;
        var height = this.container.offsetHeight - scale * this.image.offsetHeight;
        return {
            width: width,
            height: height
        };
    };
    PinchZoomPan.prototype.calculateAutofitScale = function () {
        var autofitScale = 1;
        if (this.image.offsetWidth > 0) {
            autofitScale = Math.min(this.container.offsetWidth / this.image.offsetWidth, autofitScale);
        }
        if (this.image.offsetHeight > 0) {
            autofitScale = Math.min(this.container.offsetHeight / this.image.offsetHeight, autofitScale);
        }
        return autofitScale;
    };
    return PinchZoomPan;
}(React.Component));
exports.PinchZoomPan = PinchZoomPan;
//# sourceMappingURL=pinchZoomPan.js.map