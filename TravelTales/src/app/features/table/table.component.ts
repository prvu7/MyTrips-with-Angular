import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../core/trip/trip.interface';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTripsFromJson();
  }

  loadTripsFromJson(): void {
    this.http.get<Trip[]>('http://localhost:3000/trips').subscribe({
      next: (trips) => {
        this.trips = trips;
      },
      error: (error) => {
        console.error('Error loading trips:', error);
      }
    });
  }
} 