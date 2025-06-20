export interface Trip {
  cityName: string;
  country: string;
  visitDate: string;
  description: string;
  imageUrl: string;
  tags: string[];
  status: 'vizitat' | 'urmeaza';
}