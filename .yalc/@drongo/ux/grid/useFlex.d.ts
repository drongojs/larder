interface Props {
    flex: boolean;
    block: boolean;
    grow: boolean;
    shrink: boolean;
    wrap: boolean;
    direction: 'row' | 'column' | 'initial' | 'inherit' | 'unset' | 'row-reverse' | 'column-reverse';
    align: 'initial' | 'inherit' | 'unset' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    justify: 'initial' | 'inherit' | 'unset' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    basis: string | undefined;
}
declare const _default: (_props: Partial<Props>) => Readonly<import("@vue/composition-api").Ref<Readonly<any>>>;
export default _default;
