import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Button: import("vue").VueConstructor<Provider>;
    };
    props: {
        block: {
            default: boolean;
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
        text: {
            default: string;
        };
    };
    computed: {
        kind(this: any): symbol;
    };
    methods: {
        handleClick(): void;
    };
    template: string;
};
