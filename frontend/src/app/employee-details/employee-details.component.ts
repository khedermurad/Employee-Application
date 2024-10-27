import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  id!: number;
  employee!: Employee;

  activatedRoute = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
