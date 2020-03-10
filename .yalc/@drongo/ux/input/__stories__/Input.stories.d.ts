import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    props: {
        type: {
            default: string;
        };
        xkind: {
            default: string;
        };
        invert: {
            default: boolean;
        };
        disabled: {
            default: boolean;
        };
    };
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Input: import("vue").VueConstructor<Provider>;
    };
    computed: {
        kind(this: any): symbol;
    };
    data(): {
        value: string;
    };
    template: string;
};
export declare const withIcon: () => {
    props: {
        type: {
            default: string;
        };
        xkind: {
            default: string;
        };
        invert: {
            default: boolean;
        };
        disabled: {
            default: boolean;
        };
    };
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Input: import("vue").VueConstructor<Provider>;
    };
    computed: {
        kind(this: any): symbol;
    };
    data(): {
        value: string;
    };
    template: string;
};
export declare const withAutoIcon: () => {
    props: {
        type: {
            default: string;
        };
        xkind: {
            default: string;
        };
        invert: {
            default: boolean;
        };
        disabled: {
            default: boolean;
        };
    };
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Input: import("vue").VueConstructor<Provider>;
    };
    computed: {
        kind(this: any): symbol;
    };
    data(): {
        value: string;
    };
    template: string;
};
