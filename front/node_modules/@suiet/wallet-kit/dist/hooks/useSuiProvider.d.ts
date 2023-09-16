import { JsonRpcProvider } from '@mysten/sui.js';
export declare type SuiProvider = JsonRpcProvider;
export declare function useSuiProvider(endpoint: string): SuiProvider;
