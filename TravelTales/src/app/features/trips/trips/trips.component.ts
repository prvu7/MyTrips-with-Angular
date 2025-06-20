import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../../core/trip/trip.interface';
import { TripService } from '../../../core/trip/trip.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']  
})
export class TripsComponent {
  @ViewChild('imageInput') imageInput!: ElementRef;
  
  showModal: boolean = false;
  isEditing: boolean = false;
  editingIndex: number = -1;
  newTrip: Trip = {
    cityName: '',
    country: '',
    visitDate: '',
    description: '',
    imageUrl: '',
    tags: [],
    status: 'urmeaza'
  };
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  newTag: string = '';

  readonly tagSymbols: { [key: string]: string } = {
    'Good Food': '🍽️',
    'Hospitality': '🏨',
    'Cultural Events': '🎭',
    'Architecture': '🏛️',
    'Nature': '🌿',
    'History': '📜',
    'Shopping': '🛍️',
    'Nightlife': '🌃',
    'Beaches': '🏖️',
    'Museums': '🏛️',
    'Parks': '🌳',
    'Local Traditions': '🎪'
  };

  readonly availableTags = [
    'Good Food',
    'Hospitality',
    'Cultural Events',
    'Architecture',
    'Nature',
    'History',
    'Shopping',
    'Nightlife',
    'Beaches',
    'Museums',
    'Parks',
    'Local Traditions'
  ];

  private readonly months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  trips: Trip[] = [];

  constructor(private tripService: TripService) {
    // Retrieve trips from the service
    this.trips = this.tripService.getTrips();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = this.months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  parseDate(dateString: string): string {
    const [day, month, year] = dateString.split(' ');
    const monthIndex = this.months.indexOf(month);
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(parseInt(day)).padStart(2, '0')}`;
  }

  openModal() {
    this.isEditing = false;
    this.editingIndex = -1;
    this.showModal = true;
  }

  editTrip(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    const trip = this.trips[index];
    this.newTrip = {
      ...trip,
      visitDate: this.parseDate(trip.visitDate)
    };
    this.imagePreview = trip.imageUrl;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.editingIndex = -1;
    this.resetForm();
  }

  resetForm() {
    this.newTrip = {
      cityName: '',
      country: '',
      visitDate: '',
      description: '',
      imageUrl: '',
      tags: [],
      status: 'urmeaza'
    };
    this.selectedImage = null;
    this.imagePreview = null;
    this.newTag = '';
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select image files only.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image is too large. Maximum allowed size is 5MB.');
        return;
      }

      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.newTrip.imageUrl = this.imagePreview;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.selectedImage = null;
    this.imagePreview = null;
    this.newTrip.imageUrl = '';
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
  }

  addTag() {
    if (this.newTag && !this.newTrip.tags.includes(this.newTag)) {
      this.newTrip.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.newTrip.tags = this.newTrip.tags.filter(t => t !== tag);
  }

  onSubmit() {
    if (this.newTrip.cityName && this.newTrip.country && this.newTrip.visitDate && this.newTrip.description && this.newTrip.imageUrl) {
      const formattedTrip = {
        ...this.newTrip,
        visitDate: this.formatDate(this.newTrip.visitDate)
      };

      if (this.isEditing && this.editingIndex !== -1) {
        this.tripService.updateTrip(this.editingIndex, formattedTrip);
      } else {
        this.tripService.addTrip(formattedTrip);
      }
      
      this.closeModal();
    }
  }
}
