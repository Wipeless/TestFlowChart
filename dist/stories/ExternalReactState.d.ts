import * as React from 'react';
/**
 * State is external to the <FlowChart> Element
 *
 * You could easily move this state it Redux or similar by creating your own callback actions
 */
export declare class ExternalReactState extends React.Component {
    state: import("./types/chart").IChart;
    render(): JSX.Element;
}
