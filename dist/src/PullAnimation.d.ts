import React from "react";
import { Animated, ViewStyle } from "react-native";
export interface PullAnimationProps {
    styleProps?: ViewStyle;
    yValues: {
        from?: number;
        to?: number;
    };
    isRefreshing: boolean;
    minPullDistance: number;
    scrollY: Animated.Value;
}
declare type BaseComponentProps = PullAnimationProps;
export declare const PullAnimation: React.FunctionComponent<BaseComponentProps>;
export {};
