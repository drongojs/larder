import { ComponentType, ReactElement, ReactNode } from 'react';
declare type Props<T> = {
    Component: ComponentType<any> | string;
    Stub?: ComponentType<T>;
    stub?: ReactElement;
    children?: ReactNode;
} & Partial<T>;
export default function Harness<T>({ Component, Stub, stub: stubElement, children, ...props }: Props<T>): JSX.Element;
export {};
