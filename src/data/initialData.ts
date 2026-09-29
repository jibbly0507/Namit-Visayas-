import { FoodItem, LocalDiner, TravelSpot, ReferenceItem, SiteConfig } from '../types';

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-1',
    title: 'La Paz Batchoy',
    nativeTitle: 'Espesyal nga La Paz Batchoy',
    province: 'Iloilo',
    originPlace: 'La Paz Public Market, Iloilo City',
    description: 'The crowning jewel of Iloilo’s culinary heritage: fresh miki egg noodles bathed in an umami-rich, slow-simmered bone marrow broth, generously topped with crispy chicharon, crushed pork cracklings, tender pork slices, liver, and golden fried garlic.',
    culturalBackground: 'Originated in the 1930s inside the bustling La Paz Market in Iloilo City. It reflects the vibrant cultural fusion of Chinese-Filipino merchants, Spanish culinary influences, and native Ilonggo ingenuity, creating a comforting bowl of broth, noodles, chicharon, and offal that has defined Ilonggo hospitality for generations.',
    photo: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80',
    submitter: {
      id: 'member-1',
      name: 'Althea Mae Santos',
      role: 'Group Leader & Tourism Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0101',
      quote: 'Western Visayas food is not just nourishment; every steaming bowl of Batchoy carries the warmth and hospitality of the Ilonggo spirit.'
    },
    flavorProfile: ['Rich Bone Marrow Umami', 'Crispy Chicharon Crunch', 'Toasted Garlic Aroma', 'Savory Caldo Broth'],
    keyIngredients: [
      'Fresh Miki (Yellow Round Egg Noodles)',
      'Slow-Simmered Pork & Beef Bone Marrow Caldo',
      'Pork Slices, Tenderloin, & Boiled Pork Liver',
      'Guinamos (Native Fermented Shrimp Paste for broth depth)',
      'Crisp Pork Chicharon (Crushed Cracklings)',
      'Fried Golden Garlic Flakes & Chopped Scallions',
      'Fresh Raw Egg Yolk (dropped into boiling broth)'
    ],
    bestPairing: 'Warm Puto Manapla (steamed rice cake wrapped in banana leaves) and extra steaming caldo refills',
    rating: 4.9,
    reviewCount: 148,
    funFact: 'Traditional batchoy stalls in Iloilo offer free unlimited refills of the hot, flavorful caldo (broth)!'
  },
  {
    id: 'food-2',
    title: 'Bacolod Chicken Inasal',
    nativeTitle: 'Manok nga Inasal sa Bacolod',
    province: 'Negros Occidental',
    originPlace: 'Manokan Country, Bacolod City',
    description: 'Iconic chargrilled chicken marinated in a vibrant blend of calamansi, spiced coconut sinamak vinegar, lemongrass, and ginger, basted over glowing charcoal with golden achuete (annatto) oil.',
    culturalBackground: 'Born from the vibrant street-side barbecue stalls of Bacolod in the 1970s. Inasal is a sensory fiesta—traditionally enjoyed with your bare hands (kamayan) alongside garlic rice drizzled with golden chicken oil and spicy sinamak dip.',
    photo: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-2',
      name: 'Mark Justine Reyes',
      role: 'Culinary Research Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0102',
      quote: 'The secret of genuine Bacolod Inasal lies in the smoky charcoal embers and the tangy embrace of real sugarcane sinamak.'
    },
    flavorProfile: ['Smoky Charcoal Char', 'Tangy Calamansi & Sinamak', 'Aromatic Lemongrass', 'Savory Annatto Oil'],
    keyIngredients: [
      'Native Chicken Cut (Paa - Leg Quarter or Pecho - Breast with Wing)',
      'Sinamak (Spiced Coconut & Sugarcane Vinegar steeped with langkawas & chilies)',
      'Fresh Calamansi Juice & Crushed Native Garlic',
      'Bruised Tanglad (Lemongrass Stalks)',
      'Grated Ginger Knobs & Brown Sugar',
      'Golden Basting Oil (Lard, Annatto / Achuete Seeds, Margarine, & Garlic)'
    ],
    bestPairing: 'Hot Sinangag (Garlic Rice) generously drizzled with orange chicken basting oil, paired with a dip of Sinamak, calamansi, toyomansi, and crushed red siling labuyo (eaten kamayan-style)',
    rating: 4.95,
    reviewCount: 192,
    funFact: 'Chicken Inasal was officially declared as an Important Cultural Property of Bacolod City by local ordinance in 2022.'
  }
];

// Helper function iti baba para iti YouTube URL processing
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : urlOrId;
}
  return trimmed;
}
