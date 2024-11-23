// import { type } from './auto-imports';
declare module 'ApiMap' {
    type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
    type ApiMap = Record<string, [ApiMethod, string]>;
}