import Color from 'color';
interface Kind {
    color: Color;
    contrast: Color;
}
export interface Theme {
    palette: {
        primary: Kind;
        secondary: Kind;
        tertiary: Kind;
        success: Kind;
        warning: Kind;
        danger: Kind;
        default: Kind;
        grey: Kind;
        black: Kind;
        folder: Kind;
        none: Kind;
    };
    spacing: number;
    curvature: number;
    font: {
        size: number;
        family: string;
    };
}
export {};
