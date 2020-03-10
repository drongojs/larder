import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Label: import("vue").VueConstructor<Provider>;
        Input: import("vue").VueConstructor<Provider>;
    };
    props: {
        text: {
            default: string;
        };
        required: {
            default: boolean;
        };
        xkind: {
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
        value: string;
    };
    template: string;
};
