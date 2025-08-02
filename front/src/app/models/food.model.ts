export interface Chef {
  id: number;
  name: string;
}

export interface Food {
  id: number;
  name: string;
  description: string;
  rating: number; // امتیاز
  ratings_count: number; // تعداد امتیاز دهندگان
  image_url: string;
  chef: Chef;
}