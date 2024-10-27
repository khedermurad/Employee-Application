import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];

  employeeService = inject(EmployeeService)
  router = inject(Router)
  
  ngOnInit(){
    this.getEmployees()
  }


  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe({
      next: (data) =>{
        this.employees = data;
      },
      error: (error: any) => {
        console.error("Fehler beim Abrufen der Mitarbeiterdaten", error);
      }      
    }
    )
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployees();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

}
