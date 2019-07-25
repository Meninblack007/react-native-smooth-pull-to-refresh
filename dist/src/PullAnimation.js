"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
react_native_1.UIManager.setLayoutAnimationEnabledExperimental && react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
exports.PullAnimation = function (_a) {
    var styleProps = _a.styleProps, isRefreshing = _a.isRefreshing, scrollY = _a.scrollY, minPullDistance = _a.minPullDistance, yValues = _a.yValues, children = _a.children;
    return (react_1.default.createElement(react_native_1.Animated.View, { style: [
            styleProps,
            {
                top: scrollY.interpolate({
                    inputRange: [-minPullDistance, 0],
                    outputRange: [yValues.to || yValues.to === 0 ? yValues.to : yValues.from, yValues.from],
                    extrapolate: "clamp",
                }),
                position: "absolute",
            },
        ] }, react_1.default.Children.map(children, function (child) {
        return react_1.default.cloneElement(child, {
            isRefreshing: isRefreshing,
            scrollY: scrollY,
            minPullDistance: minPullDistance,
        });
    })));
};
//# sourceMappingURL=PullAnimation.js.map