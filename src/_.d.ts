/**
 * HELPER functions
 * @module src/_
 */

// TODO - be more specific for Union types !!!
declare module _ {
  export function noOp(): any;
	export function repl(a:any[]|string, r:any[]|boolean|number, s?:any[]|boolean|number): string; // array or string, array or 0, array or 0
	export function replBase(a:any[], r:any[]|boolean|number, s?:any[]|boolean|number, baseI?:number): string;
	export function hash(str:string): string;
	export function r(a:string[], j:number, f:string): any; // returns RegExp
	export function mapFn(key:string): () => any; // TODO returned takes interface
	export function toObj(o:Object, s): Object;
	export function toObjValues(zip, o?:Object): Object;
	export function toObjDeep(arr:any[], keys:string[]): Object;
	export function has(k:any, ao?:any): boolean;
	export function hasL(a:any, l?:number): number;
	export function any(a:any): boolean;
	export function str(s:any): boolean;
	export function nr(n:any): boolean;
	export function obj(o:any): boolean;
	export function shallow(o): Object;
	export function first(a:any): any;
	export function last(a:any): any;
	export function values(o, key?:string): any;
	export function toTitlecase(str:string): string;
	export function toCamelCase(str:string): string;
	export function toReadable(str:string): string;
	export function toNames(str:string): string;
  export function setPos(token, p, pr): Object;
  export function tokenFn(rules, type, noFallback, countStart): () => any;
}
export = _;
