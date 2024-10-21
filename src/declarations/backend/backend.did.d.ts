import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Employee {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'department' : string,
  'position' : string,
}
export interface _SERVICE {
  'addEmployee' : ActorMethod<[string, string, string, string], bigint>,
  'deleteEmployee' : ActorMethod<[bigint], boolean>,
  'getAllEmployees' : ActorMethod<[], Array<Employee>>,
  'getEmployee' : ActorMethod<[bigint], [] | [Employee]>,
  'updateEmployee' : ActorMethod<
    [bigint, string, string, string, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
