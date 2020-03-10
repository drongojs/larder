import Color from 'color';
import { Theme } from '@drongo/ux/theme';
interface Props {
    foreground: Color;
    background: Color;
    border: Color;
    theme: Theme;
    block: boolean;
    enabled: boolean;
    disabled: boolean;
}
declare const _default: (props: Props) => Readonly<import("@vue/composition-api").Ref<Readonly<any>>>;
export default _default;
