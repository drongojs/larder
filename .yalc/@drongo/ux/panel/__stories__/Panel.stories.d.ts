import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Panel: import("vue").VueConstructor<Provider>;
    };
    props: {
        block: {
            default: boolean;
        };
        vblock: {
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
