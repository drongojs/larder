import { Icon } from '@drongo/ux/icon';
declare const _default: import("vue").ComponentOptions<Icon, {
    computedDisabled: boolean | undefined;
    computedKind: symbol;
    hasIcon: boolean;
    iconProps: {
        readonly icon: string;
        readonly pulse: boolean;
    } | {
        readonly icon: string;
        readonly pulse?: undefined;
    } | undefined;
}, never, never, {
    disabled: {
        type: BooleanConstructor;
    };
    kind: {
        type: SymbolConstructor;
        default: () => symbol;
    };
    invert: {
        type: BooleanConstructor;
        default: boolean;
    };
}, import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
    };
    kind: {
        type: SymbolConstructor;
        default: () => symbol;
    };
    invert: {
        type: BooleanConstructor;
        default: boolean;
    };
}, false>> & import("vue").VueConstructor<Icon> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
    };
    kind: {
        type: SymbolConstructor;
        default: () => symbol;
    };
    invert: {
        type: BooleanConstructor;
        default: boolean;
    };
}, true>, {
    computedDisabled: boolean | undefined;
    computedKind: symbol;
    hasIcon: boolean;
    iconProps: {
        readonly icon: string;
        readonly pulse: boolean;
    } | {
        readonly icon: string;
        readonly pulse?: undefined;
    } | undefined;
}, import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
    };
    kind: {
        type: SymbolConstructor;
        default: () => symbol;
    };
    invert: {
        type: BooleanConstructor;
        default: boolean;
    };
}, false>>);
export default _default;
