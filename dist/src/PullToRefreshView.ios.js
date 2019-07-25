"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var recompose_1 = require("recompose");
var native_1 = __importDefault(require("styled-components/native"));
var PullAnimation_1 = require("./PullAnimation");
var PullToRefreshProps_1 = require("./PullToRefreshProps");
var BaseComponent = function (_a) {
    var _b = _a.backgroundColor, backgroundColor = _b === void 0 ? PullToRefreshProps_1.defaultPTRBackgroundColor : _b, scrollY = _a.scrollY, isRefreshing = _a.isRefreshing, _c = _a.minPullDistance, minPullDistance = _c === void 0 ? PullToRefreshProps_1.defaultMinPullDistance : _c, contentComponent = _a.contentComponent, onResponderRelease = _a.onResponderRelease, isScrollFree = _a.isScrollFree, onScrollEvent = _a.onScrollEvent, refScrollComponent = _a.refScrollComponent, pullAnimHeight = _a.pullAnimHeight, pullAnimYValues = _a.pullAnimYValues, children = _a.children;
    return (react_1.default.createElement(ScrollContainer, { backgroundColor: backgroundColor },
        react_1.default.createElement(PullAnimationContainer, { style: {
                backgroundColor: PullToRefreshProps_1.pullAnimatedBackgroundColor,
                height: scrollY.interpolate({
                    inputRange: [-minPullDistance, 0],
                    outputRange: [minPullDistance, 0],
                }),
            } },
            react_1.default.createElement(PullAnimation_1.PullAnimation, { yValues: pullAnimYValues, styleProps: { height: pullAnimHeight }, scrollY: scrollY, isRefreshing: isRefreshing, minPullDistance: minPullDistance }, children)),
        react_1.default.createElement(ScrollContentView, null, react_1.default.cloneElement(contentComponent, {
            scrollEnabled: isScrollFree,
            scrollEventThrottle: 16,
            onScroll: onScrollEvent,
            onResponderRelease: onResponderRelease,
            ref: refScrollComponent,
        }))));
};
exports.PullToRefreshView = recompose_1.compose(recompose_1.withState("shouldTriggerRefresh", "setShouldTriggerRefresh", false), recompose_1.withState("scrollY", "setScrollY", new react_native_1.Animated.Value(0)), recompose_1.withState("isScrollFree", "setIsScrollFree", true), recompose_1.withHandlers(function () {
    var scrollContentRef;
    return {
        refScrollComponent: function () { return function (innerRef) {
            scrollContentRef = innerRef;
        }; },
        onResponderRelease: function (_a) {
            var isRefreshing = _a.isRefreshing, shouldTriggerRefresh = _a.shouldTriggerRefresh, minPullDistance = _a.minPullDistance, setIsScrollFree = _a.setIsScrollFree, onRefresh = _a.onRefresh;
            return function () {
                if (!isRefreshing && shouldTriggerRefresh) {
                    scrollContentRef.scrollTo({ y: -minPullDistance });
                    setIsScrollFree(false);
                    onRefresh();
                }
            };
        },
        onScrollEvent: function (_a) {
            var isScrollFree = _a.isScrollFree, onScroll = _a.onScroll, scrollY = _a.scrollY, minPullDistance = _a.minPullDistance, onTriggerToRefresh = _a.onTriggerToRefresh, shouldTriggerRefresh = _a.shouldTriggerRefresh, setShouldTriggerRefresh = _a.setShouldTriggerRefresh, isRefreshing = _a.isRefreshing;
            return function (event) {
                onScroll && onScroll(event);
                scrollY.setValue(event.nativeEvent.contentOffset.y);
                if (!isScrollFree) {
                    return;
                }
                if (event.nativeEvent.contentOffset.y <= -minPullDistance) {
                    onTriggerToRefresh && onTriggerToRefresh(true);
                    setShouldTriggerRefresh(true);
                }
                else if (!isRefreshing && shouldTriggerRefresh) {
                    onTriggerToRefresh && onTriggerToRefresh(false);
                    setShouldTriggerRefresh(false);
                }
            };
        },
        innerScrollTo: function () { return function (y) {
            scrollContentRef.scrollTo({ y: y });
        }; },
    };
}), recompose_1.lifecycle({
    componentDidUpdate: function (prevProps) {
        var _a = this.props, isRefreshing = _a.isRefreshing, innerScrollTo = _a.innerScrollTo, setIsScrollFree = _a.setIsScrollFree, _b = _a.isReachEnd, isReachEnd = _b === void 0 ? false : _b, toPosition = _a.toPosition, scrollY = _a.scrollY;
        if (prevProps.isRefreshing !== isRefreshing) {
            if (!isRefreshing) {
                if (!isReachEnd) {
                    innerScrollTo(0);
                }
                setIsScrollFree(true);
            }
        }
        if (prevProps.toPosition !== toPosition) {
            innerScrollTo(scrollY._value + toPosition);
        }
    },
}))(BaseComponent);
var ScrollContainer = native_1.default.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  z-index: -100;\n  background-color: ", ";\n"], ["\n  flex: 1;\n  z-index: -100;\n  background-color: ", ";\n"])), function (props) { return props.backgroundColor; });
var PullAnimationContainer = native_1.default(react_native_1.Animated.View)(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
var ScrollContentView = native_1.default.View(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n"], ["\n  background-color: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=PullToRefreshView.ios.js.map