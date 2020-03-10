import Color from 'color';
import { Theme } from '@drongo/ux/theme';
interface Props {
    theme: Theme;
    background: Color;
    foreground: Color;
}
declare const _default: (props: Props) => {
    default: {
        root: {
            color: string;
        };
    };
};
export default _default;
