import { CSSProperties, ReactNode } from 'react';
export interface StyleExtendable {
    className?: string;
    style?: CSSProperties;
}
export declare type Extendable<T = ReactNode> = StyleExtendable & {
    children?: T;
};
