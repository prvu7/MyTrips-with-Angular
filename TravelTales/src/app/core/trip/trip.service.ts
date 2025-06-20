import { Injectable } from '@angular/core';
import { Trip } from './trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private trips: Trip[] = [
    {
      cityName: 'Paris',
      country: 'France',
      visitDate: '15 March 2024',
      description: 'A memorable trip to the City of Lights, with visits to the Eiffel Tower and the Louvre Museum.',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000',
      tags: ['Museums', 'Architecture', 'Good Food'],
      status: 'vizitat'
    },
    {
      cityName: 'Rome',
      country: 'Italy',
      visitDate: '20 February 2024',
      description: 'Exploring the Colosseum and the Vatican, in the heart of ancient Rome.',
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000',
      tags: ['History', 'Good Food', 'Local Traditions'],
      status: 'vizitat'
    },
    {
      cityName: 'Barcelona',
      country: 'Spain',
      visitDate: '10 January 2024',
      description: 'Modern architecture and beautiful beaches in the capital of Catalonia.',
      imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1000',
      tags: ['Architecture', 'Beaches', 'Nightlife'],
      status: 'vizitat'
    },
    {
      cityName: 'Amsterdam',
      country: 'Netherlands',
      visitDate: '5 December 2023',
      description: 'Picturesque canals and world-renowned museums in the capital of the Netherlands.',
      imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1000',
      tags: ['Museums', 'Cultural Events', 'Hospitality'],
      status: 'vizitat'
    }
  ];

  getTrips(): Trip[] {
    return this.trips;
  }

  addTrip(trip: Trip): void {
    this.trips.unshift(trip);
  }

  updateTrip(index: number, trip: Trip): void {
    if (index > -1 && index < this.trips.length) {
      this.trips[index] = trip;
    }
  }
}
