import { Ref } from '@vue/composition-api';
export declare const useWindowWidth: () => Ref<number>;
export declare const getBreakpoints: (width: Ref<number>) => {
    isMinXs: boolean;
    isMinSm: boolean;
    isMinMd: boolean;
    isMinLg: boolean;
    isMinXl: boolean;
    isMaxXs: boolean;
    isMaxSm: boolean;
    isMaxMd: boolean;
    isMaxLg: boolean;
    isMaxXl: boolean;
};
