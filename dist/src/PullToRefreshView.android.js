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
    var _b = _a.backgroundColor, backgroundColor = _b === void 0 ? PullToRefreshProps_1.pullAnimatedBackgroundColor : _b, refScrollComponent = _a.refScrollComponent, minHeight = _a.minHeight, refreshHeight = _a.refreshHeight, isScrollFree = _a.isScrollFree, onScrollEvent = _a.onScrollEvent, onLayout = _a.onLayout, onMomentumScrollEnd = _a.onMomentumScrollEnd, onScrollEndDrag = _a.onScrollEndDrag, isRefreshing = _a.isRefreshing, scrollY = _a.scrollY, minPullDistance = _a.minPullDistance, pullAnimHeight = _a.pullAnimHeight, pullAnimYValues = _a.pullAnimYValues, children = _a.children, contentComponent = _a.contentComponent;
    return (react_1.default.createElement(ScrollContainer, { backgroundColor: backgroundColor },
        react_1.default.createElement(react_native_1.ScrollView, { ref: refScrollComponent, contentContainerStyle: { minHeight: minHeight }, scrollEnabled: isScrollFree, onScroll: onScrollEvent, onLayout: onLayout, onMomentumScrollEnd: onMomentumScrollEnd, onScrollEndDrag: onScrollEndDrag },
            react_1.default.createElement(RefreshContainer, { backgroundColor: PullToRefreshProps_1.defaultPTRBackgroundColor, height: refreshHeight },
                react_1.default.createElement(PullAnimation_1.PullAnimation, { yValues: pullAnimYValues, styleProps: { height: pullAnimHeight }, scrollY: scrollY.interpolate({
                        inputRange: [0, minPullDistance],
                        outputRange: [0, -minPullDistance],
                    }), isRefreshing: isRefreshing, minPullDistance: minPullDistance }, children)),
            react_1.default.cloneElement(contentComponent, {
                scrollEnabled: false,
            }))));
};
exports.PullToRefreshView = recompose_1.compose(recompose_1.withState("scrollY", "setScrollY", new react_native_1.Animated.Value(0)), recompose_1.withState("shouldTriggerRefresh", "setShouldTriggerRefresh", false), recompose_1.withState("minHeight", "setMinHeight", 0), recompose_1.withState("refreshHeight", "setRefreshHeight", 1), recompose_1.withState("isScrollFree", "setIsScrollFree", false), recompose_1.withHandlers(function () {
    var scrollContentRef;
    return {
        refScrollComponent: function () { return function (innerRef) {
            scrollContentRef = innerRef;
        }; },
        onLayout: function (_a) {
            var setMinHeight = _a.setMinHeight, refreshHeight = _a.refreshHeight;
            return function (event) {
                layoutScrollHeight = event.nativeEvent.layout.height;
                setMinHeight(layoutScrollHeight + refreshHeight);
            };
        },
        onScrollEvent: function (_a) {
            var onScroll = _a.onScroll, minPullDistance = _a.minPullDistance, refreshHeight = _a.refreshHeight, setMinHeight = _a.setMinHeight, setRefreshHeight = _a.setRefreshHeight, scrollY = _a.scrollY, shouldTriggerRefresh = _a.shouldTriggerRefresh, onTriggerToRefresh = _a.onTriggerToRefresh, setShouldTriggerRefresh = _a.setShouldTriggerRefresh, isRefreshing = _a.isRefreshing;
            return function (event) {
                if (refreshHeight === 1 && event.nativeEvent.velocity.y < 0) {
                    var minHeight = layoutScrollHeight + minPullDistance;
                    setMinHeight(minHeight);
                    setRefreshHeight(minPullDistance);
                }
                onScroll && onScroll(event);
                scrollY.setValue(minPullDistance - event.nativeEvent.contentOffset.y);
                var distance = scrollY._value;
                if (distance > 5) {
                    if (distance === minPullDistance) {
                        if (!shouldTriggerRefresh) {
                            onTriggerToRefresh && onTriggerToRefresh(true);
                            setShouldTriggerRefresh(true);
                        }
                    }
                    else if (!isRefreshing && shouldTriggerRefresh) {
                        onTriggerToRefresh && onTriggerToRefresh(false);
                        setShouldTriggerRefresh(false);
                    }
                }
            };
        },
        onMomentumScrollEnd: function (_a) {
            var isRefreshing = _a.isRefreshing, scrollY = _a.scrollY, refreshHeight = _a.refreshHeight;
            return function (event) {
                if (!isRefreshing && scrollY._value >= 0) {
                    scrollContentRef.scrollTo({ y: refreshHeight });
                }
            };
        },
        onScrollEndDrag: function (_a) {
            var isRefreshing = _a.isRefreshing, scrollY = _a.scrollY, minPullDistance = _a.minPullDistance, shouldTriggerRefresh = _a.shouldTriggerRefresh, refreshHeight = _a.refreshHeight, onRefresh = _a.onRefresh;
            return function (event) {
                if (isRefreshing) {
                    return;
                }
                var distance = scrollY._value;
                if (distance >= minPullDistance) {
                    if (!isRefreshing && shouldTriggerRefresh) {
                        onRefresh();
                    }
                }
                else if (distance >= 0) {
                    scrollContentRef.scrollTo({ y: refreshHeight });
                }
            };
        },
        innerScrollTo: function () { return function (y, animated) {
            if (animated === void 0) { animated = true; }
            scrollContentRef.scrollTo({ y: y, animated: animated });
        }; },
    };
}), recompose_1.lifecycle({
    componentDidMount: function () {
        var _this = this;
        setTimeout(function () { return _this.props.setIsScrollFree(true); }, 100);
    },
    componentDidUpdate: function (prevProps) {
        var _a = this.props, isRefreshing = _a.isRefreshing, minHeight = _a.minHeight, refreshHeight = _a.refreshHeight, scrollY = _a.scrollY, isReachEnd = _a.isReachEnd, innerScrollTo = _a.innerScrollTo, toPosition = _a.toPosition;
        if (prevProps.isRefreshing !== isRefreshing) {
            if (!isRefreshing && !isReachEnd) {
                if (scrollY._value >= 0) {
                    innerScrollTo(refreshHeight);
                }
                scrollY.setValue(0);
            }
        }
        if (prevProps.minHeight !== minHeight) {
            setTimeout(function () { return innerScrollTo(refreshHeight, false); });
        }
        if (prevProps.toPosition !== toPosition) {
            innerScrollTo(scrollY._value + toPosition);
        }
    },
}))(BaseComponent);
var layoutScrollHeight = 0;
var ScrollContainer = native_1.default.View(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  background-color: ", ";\n"], ["\n  flex: 1;\n  background-color: ", ";\n"])), function (props) { return props.backgroundColor; });
var RefreshContainer = native_1.default.View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: ", ";\n  background-color: ", ";\n  overflow: visible;\n"], ["\n  height: ", ";\n  background-color: ", ";\n  overflow: visible;\n"])), function (props) { return props.height; }, function (props) { return props.backgroundColor; });
var templateObject_1, templateObject_2;
//# sourceMappingURL=PullToRefreshView.android.js.map