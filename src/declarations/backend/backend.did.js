export const idlFactory = ({ IDL }) => {
  const Employee = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'department' : IDL.Text,
    'position' : IDL.Text,
  });
  return IDL.Service({
    'addEmployee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'deleteEmployee' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllEmployees' : IDL.Func([], [IDL.Vec(Employee)], ['query']),
    'getEmployee' : IDL.Func([IDL.Nat], [IDL.Opt(Employee)], ['query']),
    'updateEmployee' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
