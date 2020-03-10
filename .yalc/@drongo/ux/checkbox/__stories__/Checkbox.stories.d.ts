import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Checkbox: import("vue").VueConstructor<Provider>;
    };
    props: {
        value: {
            default: boolean;
        };
        label: {
            default: string;
        };
        disabled: {
            default: boolean;
        };
        type: {
            default: string;
        };
        invert: {
            default: boolean;
        };
    };
    computed: {
        kind(this: any): symbol;
    };
    template: string;
};
export declare const clickable: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Checkbox: import("vue").VueConstructor<Provider>;
    };
    props: {
        label: {
            default: string;
        };
        disabled: {
            default: boolean;
        };
        type: {
            default: string;
        };
        invert: {
            default: boolean;
        };
    };
    computed: {
        kind(this: any): symbol;
    };
    data(): {
        value: boolean;
    };
    template: string;
};
