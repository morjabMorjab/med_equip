<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Seller;
use App\Models\User;

class SellerSeeder extends Seeder
{
    public function run(): void
    {
        $sellerUsers = User::where('role', 'seller')->get();
        
        $sellersData = [
            [
                'shop_name' => 'آشپزخانه سنتی مریم',
                'shop_description' => 'تخصص در طبخ غذاهای محلی خوزستان با بیش از ۱۵ سال تجربه',
                'shop_logo' => 'https://picsum.photos/200/200?random=10',
                'shop_banner' => 'https://picsum.photos/800/300?random=11',
                'business_types' => ['food', 'traditional'],
                'is_verified' => true,
                'verified_at' => now(),
                'rating' => 4.8,
                'total_sales' => 150,
                'commission_rate' => 8.5,
                'working_hours' => [
                    'saturday' => ['09:00', '22:00'],
                    'sunday' => ['09:00', '22:00'],
                    'monday' => ['09:00', '22:00'],
                    'tuesday' => ['09:00', '22:00'],
                    'wednesday' => ['09:00', '22:00'],
                    'thursday' => ['09:00', '22:00'],
                    'friday' => ['10:00', '20:00']
                ]
            ],
            [
                'shop_name' => 'ماهی تازه حسن',
                'shop_description' => 'فروش انواع ماهی تازه از خلیج فارس و کارون',
                'shop_logo' => 'https://picsum.photos/200/200?random=12',
                'shop_banner' => 'https://picsum.photos/800/300?random=13',
                'business_types' => ['fish'],
                'is_verified' => true,
                'verified_at' => now(),
                'rating' => 4.6,
                'total_sales' => 89,
                'commission_rate' => 10.0,
                'working_hours' => [
                    'saturday' => ['06:00', '14:00'],
                    'sunday' => ['06:00', '14:00'],
                    'monday' => ['06:00', '14:00'],
                    'tuesday' => ['06:00', '14:00'],
                    'wednesday' => ['06:00', '14:00'],
                    'thursday' => ['06:00', '14:00'],
                    'friday' => ['closed']
                ]
            ],
            [
                'shop_name' => 'خرمای اصیل زهرا',
                'shop_description' => 'فروش انواع خرمای مرغوب خوزستان',
                'shop_logo' => 'https://picsum.photos/200/200?random=14',
                'shop_banner' => 'https://picsum.photos/800/300?random=15',
                'business_types' => ['dates', 'traditional'],
                'is_verified' => true,
                'verified_at' => now(),
                'rating' => 4.9,
                'total_sales' => 203,
                'commission_rate' => 7.5,
                'working_hours' => [
                    'saturday' => ['08:00', '20:00'],
                    'sunday' => ['08:00', '20:00'],
                    'monday' => ['08:00', '20:00'],
                    'tuesday' => ['08:00', '20:00'],
                    'wednesday' => ['08:00', '20:00'],
                    'thursday' => ['08:00', '20:00'],
                    'friday' => ['09:00', '18:00']
                ]
            ],
            [
                'shop_name' => 'کبابی محمد',
                'shop_description' => 'تخصص در کباب ماهی و غذاهای دریایی',
                'shop_logo' => 'https://picsum.photos/200/200?random=16',
                'shop_banner' => 'https://picsum.photos/800/300?random=17',
                'business_types' => ['fish', 'food'],
                'is_verified' => true,
                'verified_at' => now(),
                'rating' => 4.7,
                'total_sales' => 127,
                'commission_rate' => 9.0,
                'working_hours' => [
                    'saturday' => ['16:00', '24:00'],
                    'sunday' => ['16:00', '24:00'],
                    'monday' => ['16:00', '24:00'],
                    'tuesday' => ['16:00', '24:00'],
                    'wednesday' => ['16:00', '24:00'],
                    'thursday' => ['16:00', '24:00'],
                    'friday' => ['17:00', '24:00']
                ]
            ]
        ];

        foreach ($sellerUsers as $index => $user) {
            if (isset($sellersData[$index])) {
                $data = $sellersData[$index];
                $data['user_id'] = $user->id;
                Seller::create($data);
            }
        }
    }
}
