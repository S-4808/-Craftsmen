
import { Category, Craftsman } from './types';

export const CATEGORIES: Category[] = [
  { id: 'elec', nameAr: 'الكهرباء والإنارة', nameEn: 'Electric & Lighting', icon: 'zap', color: 'bg-yellow-500' },
  { id: 'plumb', nameAr: 'السباكة والصرف', nameEn: 'Plumbing', icon: 'droplet', color: 'bg-blue-500' },
  { id: 'carp', nameAr: 'النجارة والأثاث', nameEn: 'Carpentry', icon: 'hammer', color: 'bg-amber-700' },
  { id: 'paint', nameAr: 'الدهان والديكور', nameEn: 'Painting', icon: 'paint-bucket', color: 'bg-pink-500' },
  { id: 'ac', nameAr: 'التكييف والتبريد', nameEn: 'AC & Cooling', icon: 'wind', color: 'bg-cyan-500' },
  { id: 'clean', nameAr: 'النظافة والتعقيم', nameEn: 'Cleaning', icon: 'sparkles', color: 'bg-emerald-500' },
];

export const MOCK_CRAFTSMEN: Craftsman[] = [
  {
    id: '1',
    name: 'أحمد الدهمشي',
    avatar: 'https://picsum.photos/seed/ahmed/200/200',
    specialty: 'فني كهرباء عام',
    subSpecialties: ['تركيب إنارة', 'إصلاح أجهزة'],
    city: 'الرياض',
    neighborhood: 'النخيل',
    verified: true,
    rating: 4.8,
    reviewCount: 124,
    hourlyRate: 75,
    bio: 'خبير في صيانة الشبكات الكهربائية المنزلية مع خبرة تزيد عن 10 سنوات في الرياض.',
    portfolio: ['https://picsum.photos/400/300?1', 'https://picsum.photos/400/300?2'],
    ratings: [
      {
        workQuality: 5,
        punctuality: 4,
        professionalism: 5,
        priceValue: 5,
        cleanliness: 5,
        overall: 4.8,
        comment: 'عمل متقن وسريع، الكهربائي أحمد محترف جداً.',
        customerName: 'سارة م.',
        date: '2023-10-25'
      }
    ]
  },
  {
    id: '2',
    name: 'خالد العنزي',
    avatar: 'https://picsum.photos/seed/khaled/200/200',
    specialty: 'سباك عام',
    subSpecialties: ['تسريبات المياه', 'سخانات'],
    city: 'جدة',
    neighborhood: 'الصفا',
    verified: true,
    rating: 4.5,
    reviewCount: 89,
    hourlyRate: 60,
    bio: 'متخصص في كشف تسريبات المياه وإصلاح الأعطال المعقدة في السباكة.',
    portfolio: ['https://picsum.photos/400/300?3'],
    ratings: []
  },
  {
    id: '3',
    name: 'فهد المطيري',
    avatar: 'https://picsum.photos/seed/fahad/200/200',
    specialty: 'فني تكييف',
    subSpecialties: ['تكييف مركزي', 'شحن فريون'],
    city: 'الرياض',
    neighborhood: 'الملز',
    verified: false,
    rating: 3.9,
    reviewCount: 45,
    hourlyRate: 100,
    bio: 'صيانة فورية لجميع أنواع المكيفات السبلت والشباك.',
    portfolio: [],
    ratings: []
  }
];
