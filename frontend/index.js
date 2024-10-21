import { backend } from 'declarations/backend';

let employees = [];

async function refreshEmployees() {
  employees = await backend.getAllEmployees();
  displayEmployees();
}

function displayEmployees() {
  const employeeList = document.getElementById('employees');
  employeeList.innerHTML = '';
  employees.forEach(employee => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${employee.name} - ${employee.email} - ${employee.department} - ${employee.position}
      <button onclick="editEmployee(${employee.id})">Edit</button>
      <button onclick="deleteEmployee(${employee.id})">Delete</button>
    `;
    employeeList.appendChild(li);
  });
}

async function submitEmployee() {
  const idInput = document.getElementById('employeeId');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const departmentInput = document.getElementById('department');
  const positionInput = document.getElementById('position');

  const name = nameInput.value;
  const email = emailInput.value;
  const department = departmentInput.value;
  const position = positionInput.value;

  if (idInput.value) {
    // Update existing employee
    const id = parseInt(idInput.value);
    await backend.updateEmployee(id, name, email, department, position);
  } else {
    // Add new employee
    await backend.addEmployee(name, email, department, position);
  }

  // Clear form
  idInput.value = '';
  nameInput.value = '';
  emailInput.value = '';
  departmentInput.value = '';
  positionInput.value = '';

  refreshEmployees();
}

window.editEmployee = function(id) {
  const employee = employees.find(e => e.id === id);
  if (employee) {
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('position').value = employee.position;
  }
}

window.deleteEmployee = async function(id) {
  await backend.deleteEmployee(id);
  refreshEmployees();
}

document.getElementById('submitEmployee').addEventListener('click', submitEmployee);

// Initial load
refreshEmployees();
