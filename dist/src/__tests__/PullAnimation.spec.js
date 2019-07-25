"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var PullAnimation_1 = require("../PullAnimation");
describe("PullAnimation spec", function () {
    it("App show PullAnimation", function () {
        var props = {
            yValues: { from: -50, to: 10 },
            isRefreshing: false,
            minPullDistance: 70,
            scrollY: new react_native_1.Animated.Value(0),
        };
        var wrapper = enzyme_1.shallow(react_1.default.createElement(PullAnimation_1.PullAnimation, __assign({}, props)));
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=PullAnimation.spec.js.map