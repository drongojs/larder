import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Icon: import("vue").VueConstructor<Provider>;
    };
    props: {
        size: {
            default: string;
        };
        icon: {
            default: string;
        };
        spin: {
            default: boolean;
        };
        pulse: {
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
