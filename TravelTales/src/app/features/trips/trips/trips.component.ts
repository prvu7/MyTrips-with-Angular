import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Trip {
  cityName: string;
  country: string;
  visitDate: string;
  description: string;
  imageUrl: string;
  tags: string[];
  status: 'vizitat' | 'urmeaza';
}

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
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
    status: 'urmeaza' // Default status
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

  trips: Trip[] = [
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
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select image files only.');
        return;
      }

      // Check file size (max 5MB)
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
    event.stopPropagation(); // Prevent the click from triggering the file input
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
        this.trips[this.editingIndex] = formattedTrip;
      } else {
        this.trips.unshift(formattedTrip);
      }
      
      this.closeModal();
    }
  }
}