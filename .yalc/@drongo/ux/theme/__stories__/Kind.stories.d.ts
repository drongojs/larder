import Provider from '../components/Provider.vue';
declare const _default: {
    title: string;
};
export default _default;
export declare const basic: () => {
    props: {
        type: {
            default: string;
        };
        invert: {
            default: boolean;
        };
    };
    components: {
        Provider: import("vue").VueConstructor<Provider>;
        Child: import("vue").ComponentOptions<Provider, {
            style: {
                readonly backgroundColor: string;
                readonly color: string;
                readonly borderStyle: string;
                readonly borderWidth: string;
                readonly borderColor: string;
            };
        }, never, never, {
            kind: SymbolConstructor;
            invert: BooleanConstructor;
        }, import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
            kind: SymbolConstructor;
            invert: BooleanConstructor;
        }, false>> & import("vue").VueConstructor<Provider> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
            kind: SymbolConstructor;
            invert: BooleanConstructor;
        }, true>, {
            style: {
                readonly backgroundColor: string;
                readonly color: string;
                readonly borderStyle: string;
                readonly borderWidth: string;
                readonly borderColor: string;
            };
        }, import("@vue/composition-api/dist/component/componentProps").ExtractPropTypes<{
            kind: SymbolConstructor;
            invert: BooleanConstructor;
        }, false>>);
    };
    computed: {
        kind(this: any): Symbol;
    };
    template: string;
};
