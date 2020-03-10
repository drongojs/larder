import Color from 'color';
import { Theme } from '@drongo/ux/theme';
interface Props {
    theme: Theme;
    background: Color;
    foreground: Color;
    border: Color;
    disabled: boolean;
    unchecked: boolean;
}
declare const _default: (props: Props) => Readonly<import("@vue/composition-api").Ref<Readonly<any>>>;
export default _default;
