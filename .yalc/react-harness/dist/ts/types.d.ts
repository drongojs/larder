import { createElement, ReactElement, ComponentType } from 'react';
export declare type CreateElement = typeof createElement;
export declare type Stub = {
    Component: ComponentType<any> | string;
    Stub?: ComponentType<any>;
    stub?: ReactElement<any>;
    props?: object;
};
export interface Context {
    stubs: Stub[];
}
