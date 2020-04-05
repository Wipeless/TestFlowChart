import * as React from "react";
import { IPosition } from "../..";
export interface IPinchZoomPanProps {
    initialTop: number;
    initialLeft: number;
    initialScale: string;
    minScale: string;
    maxScale: number;
    children: any;
}
export interface IPinchZoomPanState {
    top: number;
    scale: number;
    left: number;
}
export declare class PinchZoomPan extends React.Component<IPinchZoomPanProps, IPinchZoomPanState> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        initialTop: any;
        initialLeft: any;
        initialScale: any;
    } | null;
    container: any;
    image: any;
    lastPanPointerPosition: any;
    animation: any;
    mouseDown: boolean;
    minScale: any;
    lastPinchMidpoint: IPosition;
    lastPinchLength: number;
    lastUnzoomedNegativeSpace: any;
    lastPointerUpTimeStamp: any;
    constructor(props: IPinchZoomPanProps);
    handleTouchStart(event: TouchEvent): void;
    handleTouchMove(event: TouchEvent): void;
    handleTouchEnd(event: TouchEvent): void | null;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): 0 | 1 | -1 | null;
    handleMouseUp(event: MouseEvent): void;
    handleMouseWheel(event: WheelEvent): void;
    handleWindowResize(): void;
    handleImageLoad(): void;
    pointerDown(clientPosition: any): void;
    pan(pointerClientPosition: any): 0 | 1 | -1;
    pointerUp(timeStamp: any): void;
    move(top: number, left: number, tolerance: number, speed?: number): void;
    pinchStart(touches: TouchList): void;
    pinchChange(touches: TouchList): void;
    zoomIn(midpoint: any): void;
    zoomOut(midpoint: any): void;
    zoom(scale: any, midpoint: any, tolerance: number, speed?: number): void;
    applyTransform(requestedTop: number, requestedLeft: number, requestedScale: any, tolerance: number, speed?: number): void;
    getValidTransform(top: number, left: number, scale: number, tolerance: number): {
        scale: number;
        top: number;
        left: number;
    };
    transformToProps(speed?: number): void;
    ensureValidTransform(speed?: number): void;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    ensureConstraints(): void;
    applyConstraints(): void;
    calculateNegativeSpace(scale?: number): {
        width: number;
        height: number;
    };
    calculateAutofitScale(): number;
}
