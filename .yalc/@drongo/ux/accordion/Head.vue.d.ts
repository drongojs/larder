import { css } from '@drongo/styles';
import { Icon } from '@drongo/ux/icon';
declare const _default: import("vue").ComponentOptions<Icon, {
    styles: {
        [x: string]: any;
    };
    css: typeof css;
    icon: "caret-down" | "caret-up";
    handleClick: () => void;
}, never, never, {
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, false>> & import("vue").VueConstructor<Icon> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, true>, {
    styles: {
        [x: string]: any;
    };
    css: typeof css;
    icon: "caret-down" | "caret-up";
    handleClick: () => void;
}, import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
}, false>>);
export default _default;
