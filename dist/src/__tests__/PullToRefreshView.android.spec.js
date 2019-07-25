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
var sinon_1 = __importDefault(require("sinon"));
var PullToRefreshView_android_1 = require("../PullToRefreshView.android");
describe("PullToRefreshView android spec", function () {
    it("App show PullToRefreshView android", function () {
        var stub = sinon_1.default.stub();
        var props = {
            isRefreshing: false,
            onRefresh: stub,
            contentComponent: react_1.default.createElement(react_native_1.ScrollView, null),
            pullAnimHeight: 70,
            pullAnimYValues: { from: -50, to: 10 },
        };
        var wrapper = enzyme_1.shallow(react_1.default.createElement(PullToRefreshView_android_1.PullToRefreshView, __assign({}, props)));
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=PullToRefreshView.android.spec.js.map