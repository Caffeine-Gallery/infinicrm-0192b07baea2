import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";

actor {
  // Define the Employee type
  public type Employee = {
    id: Nat;
    name: Text;
    email: Text;
    department: Text;
    position: Text;
  };

  // Create a stable variable to store the next employee ID
  private stable var nextId: Nat = 1;

  // Create a stable variable to store employee data for upgrades
  private stable var employeeEntries: [(Nat, Employee)] = [];

  // Create a HashMap to store employees
  private var employees = HashMap.HashMap<Nat, Employee>(0, Nat.equal, Nat.hash);

  // Function to add a new employee
  public func addEmployee(name: Text, email: Text, department: Text, position: Text) : async Nat {
    let id = nextId;
    let employee: Employee = {
      id;
      name;
      email;
      department;
      position;
    };
    employees.put(id, employee);
    nextId += 1;
    id
  };

  // Function to get an employee by ID
  public query func getEmployee(id: Nat) : async ?Employee {
    employees.get(id)
  };

  // Function to update an employee
  public func updateEmployee(id: Nat, name: Text, email: Text, department: Text, position: Text) : async Bool {
    switch (employees.get(id)) {
      case (null) { false };
      case (?employee) {
        let updatedEmployee: Employee = {
          id;
          name;
          email;
          department;
          position;
        };
        employees.put(id, updatedEmployee);
        true
      };
    }
  };

  // Function to delete an employee
  public func deleteEmployee(id: Nat) : async Bool {
    switch (employees.remove(id)) {
      case (null) { false };
      case (?employee) { true };
    }
  };

  // Function to get all employees
  public query func getAllEmployees() : async [Employee] {
    Iter.toArray(employees.vals())
  };

  // Upgrade hooks
  system func preupgrade() {
    employeeEntries := Iter.toArray(employees.entries());
  };

  system func postupgrade() {
    employees := HashMap.fromIter<Nat, Employee>(employeeEntries.vals(), 0, Nat.equal, Nat.hash);
    employeeEntries := [];
  };
}
