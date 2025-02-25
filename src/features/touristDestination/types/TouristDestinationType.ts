export interface TouristDestinationType {
  id: string;
  name: string;
  description: string;
  newImages: File[];
  images: (File|string)[];
}
