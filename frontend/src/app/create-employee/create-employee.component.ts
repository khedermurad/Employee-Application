import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit{

  employee: Employee = new Employee();
  employeeService = inject(EmployeeService)
  router = inject(Router)

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (data) => {
        console.log(data);
        this.goToEmployeeList();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }


}
