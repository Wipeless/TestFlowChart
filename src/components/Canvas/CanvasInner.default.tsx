import styled from "styled-components";
import { IConfig, IOnCanvasClick } from "../../";

export interface ICanvasInnerDefaultProps {
  config: IConfig;
  children: any;
  onClick: IOnCanvasClick;
  tabIndex: number;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const CanvasInnerDefault = styled.div<ICanvasInnerDefaultProps>`
  position: relative;
  outline: none;
  width: 10000px;
  height: 10000px;
  cursor: move;
` as any;
