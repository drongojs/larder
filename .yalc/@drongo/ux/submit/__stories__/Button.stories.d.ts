import { Provider } from '../../theme';
declare const _default: {
    title: string;
};
export default _default;
export declare const asSubmit: () => {
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Submit: import("vue").VueConstructor<Provider>;
    };
    setup(): {
        shouldSucceed: import("@vue/composition-api").Ref<boolean>;
        handleSubmit: (evt?: Event | undefined) => void;
        handleToggle: () => void;
    };
    template: string;
};
