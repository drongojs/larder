import Color from 'color';
import { Theme } from '@drongo/ux/theme';
interface Props {
    background: Color;
    foreground: Color;
    border: Color;
    theme: Theme;
    block: boolean;
    vblock: boolean;
}
declare const _default: (props: Props) => {
    default: {
        root: {
            display: "inline-block";
            flexGrow: number;
            backgroundColor: string;
            color: string;
            borderStyle: "solid";
            borderWidth: number;
            borderColor: string;
            borderRadius: number;
            padding: number;
        };
    };
    block: {
        root: {
            display: "block";
        };
    };
    vblock: {
        root: {
            flexGrow: number;
            height: string;
        };
    };
};
export default _default;
