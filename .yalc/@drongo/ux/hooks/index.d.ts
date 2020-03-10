import { Ref } from '@vue/composition-api';
export declare type MaybeRef<T> = T | Ref<T>;
export declare const unwrap: <T>(x: MaybeRef<T>) => T;
