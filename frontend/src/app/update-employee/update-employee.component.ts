import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit{

  id!: number;
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  employee: Employee = new Employee();

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubmit(){
    this.employeeService.updateEmployee(this.id, this.employee).subscribe({
      next: (data) => {
        this.goToEmployeeList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
  
}
