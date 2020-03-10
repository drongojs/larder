import { InjectionKey, Ref } from '@vue/composition-api';
import { Theme } from '../core';
export declare const ThemeProvideKey: InjectionKey<Ref<Theme>>;
export declare const KindKey: unique symbol;
export declare const InvertKey: unique symbol;
export declare const DEFAULT_THEME: Theme;
export declare const Kind: {
    PRIMARY: symbol;
    SECONDARY: symbol;
    TERTIARY: symbol;
    SUCCESS: symbol;
    WARNING: symbol;
    DANGER: symbol;
    DEFAULT: symbol;
    NONE: symbol;
};
