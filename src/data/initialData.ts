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
  },
  {
    id: 'food-3',
    title: 'Pancit Molo',
    nativeTitle: 'Pancit Molo Sang Iloilo',
    province: 'Iloilo',
    originPlace: 'Molo Heritage District, Iloilo City',
    description: 'Despite the name "Pancit," this beloved specialty is a silky dumpling soup. Silken wonton pockets stuffed with seasoned minced pork and fresh prawns simmer in a golden chicken-pork broth with chopped scallions and fried garlic.',
    culturalBackground: 'Hailing from Molo, famously known as the "Athens of the Philippines" for its intellectual history. The dish reflects the Chinese-Filipino trade relations in Parian (now Molo), adapting traditional wonton soup to suit the delicate Filipino palate.',
    photo: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-3',
      name: 'Patricia Nicole Dela Cruz',
      role: 'Content Curator & Editorial Lead',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0103',
      quote: 'Pancit Molo is comfort food refined into an art form. Each handmade parcel tells a tale of family banquets in ancestral mansions.'
    },
    flavorProfile: ['Delicate & Soothing Broth', 'Tender Dumpling Wrap', 'Savory Pork & Shrimp Filling', 'Crispy Golden Garlic'],
    keyIngredients: [
      'Dumpling Filling: Ground Lean Pork, Minced Fresh Shrimps, Jicama (Singkamas), Egg, & Scallions',
      'Ultra-Thin Wonton Wrapper Sheets (folded triangularly into caps)',
      'Clear Simmered Native Chicken & Pork Bone Broth',
      'Shredded Poached Chicken Breast',
      'Toasted Golden Minced Garlic',
      'Fresh Spring Onions & A Dash of White Pepper'
    ],
    bestPairing: 'Crunchy Ilonggo Biscocho de Sevilla, fresh Pan de Sal, or Pan de Suelo toasted to perfection',
    rating: 4.85,
    reviewCount: 110,
    funFact: 'It is called "pancit" because in the early colonial era, noodle makers in Molo used wonton skin strips instead of long noodle strands!'
  },
  {
    id: 'food-4',
    title: 'KBL (Kadyos, Baboy, Langka)',
    nativeTitle: 'Kadyos, Baboy, kag Langka nga may Batwan',
    province: 'Iloilo',
    originPlace: 'Central Iloilo & Antique Highlands',
    description: 'The quintessential hearty Ilonggo stew combining three soul ingredients: earthy dark pigeon peas (kadyos), chargrilled smoked pork belly (baboy), and tender unripe jackfruit (langka), perfected with the tartness of indigenous batwan fruit.',
    culturalBackground: 'A beloved family staple across Panay Island that cannot be replicated anywhere else because of the indigenous *batwan* fruit and *kadyos* beans. It represents the farm-to-table communal heritage of rural Western Visayas.',
    photo: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-4',
      name: 'Joshua Miguel Tan',
      role: 'Heritage Gastronomy Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0104',
      quote: 'Without batwan, you cannot call it genuine KBL. It is the sour soul that binds our land, farm, and hearth together.'
    },
    flavorProfile: ['Pleasantly Sour (Batwan)', 'Smoky Charred Pork', 'Creamy Starchy Kadyos Beans', 'Tender Langka Texture'],
    keyIngredients: [
      'Kadyos (Fresh or Dried Black Pigeon Peas, imparting the iconic purple-violet tint)',
      'Baboy (Charcoal-Grilled Smoked Pork Belly or Pata / Pork Knuckles)',
      'Langka (Firm Unripe Green Jackfruit cubes, boiled until tender)',
      'Batwan Fruit (Garcinia binucao, fresh green indigenous souring agent)',
      'Tanglad (Lemongrass Stalks bruised for aroma)',
      'Water, Onions, Patis (Fish Sauce), & Siling Haba (Green Finger Chilies)'
    ],
    bestPairing: 'Heaping mounds of warm Steamed Native White or Red Rice and crisp Fried Dried Fish (uga / pinabalat) or salted egg',
    rating: 4.9,
    reviewCount: 134,
    funFact: 'The Batwan (Garcinia binucao) is native only to the Visayas and provides a clean, fruity sourness without the harsh acidity of vinegar or tamarind.'
  },
  {
    id: 'food-5',
    title: 'Guimaras Mango Pizza & Fresh Mangoes',
    nativeTitle: 'Mananam nga Mangga sang Guimaras',
    province: 'Guimaras',
    originPlace: 'Jordan & Buenavista, Guimaras Island',
    description: 'Featuring the certified sweetest mangoes in the world: ripe, golden Guimaras carabao mango slices baked over a crisp pizza crust, paired with melted mozzarella, sweet cashew nuts, bell pepper strips, and fragrant mint.',
    culturalBackground: 'Guimaras Island enforces strict agricultural quarantine laws to safeguard its pristine mango groves. The island produces mangoes with an average Brix sweetness level of 16-18°, served in high-end state dinners worldwide and creatively reimagined by local island diners.',
    photo: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-5',
      name: 'Sophia Angela Gomez',
      role: 'Creative Media & Visual Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0105',
      quote: 'Guimaras took nature’s sweetest gift and turned it into iconic culinary creativity—proving food tourism can be daring and unforgettable.'
    },
    flavorProfile: ['Luscious Island Sweetness', 'Creamy Cheese Melt', 'Crunchy Cashew Nuts', 'Refreshing Mint Zest'],
    keyIngredients: [
      'Fresh Golden Guimaras Carabao Mangoes (Sliced Ripe Cheeks)',
      'Artisan Crisp Thin Pizza Dough Crust',
      'Mango-Infused Cream Sauce / Puree Base',
      'Melted Mozzarella & Mild Cheddar Cheese',
      'Crushed Roasted Guimaras Cashew Nuts (Kasuy)',
      'Thinly Sliced Green Bell Peppers & Fresh Sweet Basil'
    ],
    bestPairing: 'Ice-cold Fresh Guimaras Mango Shake (made with pure mango flesh and condensed milk) or chilled Calamansi-infused Buko Juice',
    rating: 4.88,
    reviewCount: 165,
    funFact: 'Guimaras mangoes are so famous and protected that bringing any outside mango varieties onto the island is prohibited by provincial law!'
  },
  {
    id: 'food-6',
    title: 'Bacolod Piaya & Napoleones',
    nativeTitle: 'Piaya kag Matam-is nga Napoleones',
    province: 'Negros Occidental',
    originPlace: 'Silay Heritage City & Bacolod City',
    description: 'Negros Occidental’s sweet dual signature: Piaya, a griddled unleavened flatbread stuffed with sticky muscovado sugar and roasted sesame seeds, alongside Napoleones, a delicate multi-layered puff pastry filled with vanilla custard and finished with a sugar glaze.',
    culturalBackground: 'Known as the "Sugar Capital of the Philippines," Negros Occidental’s opulent hacienda heritage gave rise to exquisite confectioneries. Pastry masters in Silay and Bacolod perfected these treats as sweet tokens (pasalubong) for travelers.',
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-6',
      name: 'Christian Dave Ramos',
      role: 'Tourism Promotion & Public Liaison',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0106',
      quote: 'Every bite of warm Piaya and flaky Napoleones carries the sweet historic legacy of our sugarcane fields and ancestral sugar barons.'
    },
    flavorProfile: ['Rich Caramelized Muscovado', 'Flaky Buttery Crust', 'Nutty Toasted Sesame', 'Silky Vanilla Custard'],
    keyIngredients: [
      'Piaya: Unleavened Flour Dough, Lard/Shortening, Pure Dark Negros Muscovado Sugar Syrup, Toasted White Sesame Seeds (Griddled on a flat pan)',
      'Napoleones: Thousand-Layer French-Style Puff Pastry (Mille-Feuille style), Butter Laminations',
      'Napoleones Filling: Smooth Egg Yolk Vanilla Custard Cream (Pastry Cream)',
      'Napoleones Topping: Thin Sweet White Sugar Glaze / Icing'
    ],
    bestPairing: 'Freshly brewed Negros Native Drip Coffee (Kape Robusta/Arabica blend) or Rich Tsokolate de Batirol made from local cacao tablea',
    rating: 4.92,
    reviewCount: 178,
    funFact: 'Original Piaya is baked freshly on heavy cast iron griddles right in front of pasalubong shoppers, producing a delicious caramelized aroma.'
  },
  {
    id: 'food-7',
    title: 'Roxas Diwal & Steamed Seafood Platter',
    nativeTitle: 'Diwal kag Presko nga Pasayan sang Roxas',
    province: 'Capiz',
    originPlace: 'Baybay Beach, Roxas City (Seafood Capital)',
    description: 'The rare and legendary "Angel Wings" clam (Diwal), harvested from the clean coastal beds of Capiz. Grilled over open fire with garlic, butter, and calamansi, served alongside sweet rock oysters (talaba) and steamed king blue crabs.',
    culturalBackground: 'Roxas City earned its official title as the "Seafood Capital of the Philippines" thanks to its brackish rivers, mangrove estuaries, and Sibuyan Sea currents that produce the sweetest, freshest marine harvest in Southeast Asia.',
    photo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-7',
      name: 'Mary Joy Fernandez',
      role: 'Marine Cuisine & Coastal Heritage Specialist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0107',
      quote: 'Capiz seafood is unmatched because nature provided us with clean bays and pristine mangroves where treasures like Diwal thrive.'
    },
    flavorProfile: ['Sweet Briny Sea Essence', 'Melted Garlic Butter', 'Smoky Charred Shell', 'Succulent Juicy Flesh'],
    keyIngredients: [
      'Live Angel Wing Clams (Diwal / Pholas orientalis) cleaned and halved',
      'Fresh Rock Oysters (Talaba) from Panay River estuary',
      'Alimango (Mud Crabs) or Kasag (Blue Crabs)',
      'Clarified Pure Butter or Garlic-Infused Oil',
      'Finely Minced Toasted Garlic & Native Calamansi Juice',
      'Capiz Flake Sea Salt & Sliced Red Bird\'s Eye Chili'
    ],
    bestPairing: 'Fresh Garlic Butter Sinangag, Chilled Buko Juice fresh from the shell, and a side dip of Pinakurat spiced vinegar with crushed ginger and onions',
    rating: 4.94,
    reviewCount: 142,
    funFact: 'Diwal shells resemble outstretched angel wings when opened! Due to strict conservation seasons, catching them is carefully regulated to maintain sustainability.'
  },
  {
    id: 'food-8',
    title: 'Aklan Chicken Binakol',
    nativeTitle: 'Binakol nga Manok sa Butong',
    province: 'Aklan',
    originPlace: 'Kalibo & Numancia, Aklan',
    description: 'A deeply aromatic native chicken soup slowly simmered inside a freshly cut bamboo trunk or young green coconut (*butong*). The broth blends sweet coconut water with lemongrass, crushed ginger, and tender green papaya slices.',
    culturalBackground: 'An ancient indigenous culinary technique passed down through generations in Panay and Aklan. Cooking inside bamboo or green coconut shells infuses natural sweetness and prevents any moisture loss, creating a comforting restorative broth.',
    photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    submitter: {
      id: 'member-8',
      name: 'Ethan Gabriel Villanueva',
      role: 'Field Documentation & Community Coordinator',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      studentNumber: '2024-04-0108',
      quote: 'Binakol connects us back to our roots—cooking in harmony with the coconut palms and bamboo groves of our island.'
    },
    flavorProfile: ['Naturally Sweet Coconut Broth', 'Pungent Fresh Ginger Heat', 'Aromatic Lemongrass Notes', 'Tender Native Chicken'],
    keyIngredients: [
      'Native Free-Range Chicken (Darag or native chicken, chopped with bone-in for richness)',
      'Fresh Buko Juice (Coconut Water) & Shaved Young Coconut Strips (Butong)',
      'Whole Green Coconut Shells or Freshly Cut Bamboo Trunks (Cooking vessel)',
      'Lemongrass Stalks (Tanglad) tied into tight bundles',
      'Fresh Crushed Ginger (Luya) & Garlic',
      'Green Unripe Papaya or Sayote Wedges',
      'Siling Labuyo Leaves (Chili Pepper Leaves) & Red Chilies'
    ],
    bestPairing: 'Fragrant Steamed Rice wrapped in banana leaves (Puso / Balisong) and a dipping sauce of Patis with calamansi and siling labuyo',
    rating: 4.87,
    reviewCount: 96,
    funFact: 'Traditional Aklanon elders cook Binakol directly buried over hot river stones and charcoal to extract the sweetest flavor from the coconut meat.'
  }
];

export const INITIAL_DINERS: LocalDiner[] = [
  {
    id: 'diner-1',
    name: "Netong's Original Special La Paz Batchoy",
    province: 'Iloilo',
    city: 'Iloilo City',
    specialty: 'Extra Special La Paz Batchoy with Miswa & Egg',
    photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    address: 'Inside La Paz Public Market, Huervana St, La Paz, Iloilo City',
    priceLevel: '₱',
    rating: 4.9,
    tag: 'Heritage Institution',
    mapCoords: { x: 42, y: 55 },
    reviews: [
      {
        id: 'rev-1',
        author: 'Chef Rolando Cruz',
        rating: 5,
        date: 'September 2026',
        comment: 'The gold standard of Batchoy! The broth is so thick with bone marrow, and the chicharon stays shockingly crisp. A must-visit whenever in Iloilo.',
        recommendedDish: 'Super Special Batchoy + Puto'
      },
      {
        id: 'rev-2',
        author: 'Katrina V.',
        rating: 5,
        date: 'August 2026',
        comment: 'Authentic market atmosphere! Ask for extra hot soup and enjoy with a bottle of cold soda.',
        recommendedDish: 'Special Batchoy with Raw Egg'
      }
    ]
  },
  {
    id: 'diner-2',
    name: "Aida's Manokan & Chicken Inasal",
    province: 'Negros Occidental',
    city: 'Bacolod City',
    specialty: 'Chargrilled Pecho Pak & Isol with Chicken Oil',
    photo: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    address: 'Manokan Country, Father M. Ferrero St, Bacolod, Negros Occidental',
    priceLevel: '₱₱',
    rating: 4.95,
    tag: 'Bacolod Legend',
    mapCoords: { x: 62, y: 58 },
    reviews: [
      {
        id: 'rev-3',
        author: 'Dennis Bernardo',
        rating: 5,
        date: 'September 2026',
        comment: 'Best inasal on the planet! The chicken skin has the perfect char, and the garlic rice soaked in orange chicken oil is addictive.',
        recommendedDish: 'Paa Inasal & Garlic Rice'
      }
    ]
  },
  {
    id: 'diner-3',
    name: 'The Pitstop Restaurant',
    province: 'Guimaras',
    city: 'Jordan',
    specialty: 'Original Mango Pizza & Mango Beef Bulalo',
    photo: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80',
    address: 'Chavez Building, San Miguel, Jordan, Guimaras',
    priceLevel: '₱₱',
    rating: 4.8,
    tag: 'Island Innovator',
    mapCoords: { x: 48, y: 68 },
    reviews: [
      {
        id: 'rev-4',
        author: 'Elena Soriano',
        rating: 5,
        date: 'August 2026',
        comment: 'Sounds unusual at first, but the sweet ripe Guimaras mangoes complement the salty cheese and cashew crust flawlessly!',
        recommendedDish: 'Guimaras Mango Pizza'
      }
    ]
  },
  {
    id: 'diner-4',
    name: 'Roxas Baybay Seafood Boulevard',
    province: 'Capiz',
    city: 'Roxas City',
    specialty: 'Charcoal Butter Diwal & Steamed Blue Crabs',
    photo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    address: 'Baybay Beach Boardwalk, Roxas City, Capiz',
    priceLevel: '₱₱',
    rating: 4.92,
    tag: 'Seafood Haven',
    mapCoords: { x: 50, y: 28 },
    reviews: [
      {
        id: 'rev-5',
        author: 'Marcus Aurel',
        rating: 5,
        date: 'September 2026',
        comment: 'Freshly pulled from the sea only hours ago. You choose your seafood by the kilo, and they grill it right at the beach shore.',
        recommendedDish: 'Grilled Diwal with Garlic Butter'
      }
    ]
  },
  {
    id: 'diner-5',
    name: "Ramboy's Liempo & Binakol",
    province: 'Aklan',
    city: 'Kalibo',
    specialty: 'Native Chicken Binakol in Fresh Coconut',
    photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    address: 'Toting Reyes St, Kalibo, Aklan',
    priceLevel: '₱₱',
    rating: 4.85,
    tag: 'Aklan Culinary Landmark',
    mapCoords: { x: 34, y: 22 },
    reviews: [
      {
        id: 'rev-6',
        author: 'Lianne Tan',
        rating: 5,
        date: 'July 2026',
        comment: 'The coconut broth has a subtle sweetness that cuts through the savory chicken so smoothly. Comfort food at its finest.',
        recommendedDish: 'Chicken Binakol sa Buko'
      }
    ]
  },
  {
    id: 'diner-6',
    name: 'El Ideal Bakery since 1927',
    province: 'Negros Occidental',
    city: 'Silay City',
    specialty: 'Guava Pie, Fresh Piaya & Senorita',
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    address: '118 Rizal St, Silay City Heritage Zone, Negros Occidental',
    priceLevel: '₱',
    rating: 4.9,
    tag: 'Centennial Heritage',
    mapCoords: { x: 65, y: 50 },
    reviews: [
      {
        id: 'rev-7',
        author: 'Paolo Mendoza',
        rating: 5,
        date: 'August 2026',
        comment: 'Nearly a century old! Sitting inside this Spanish-era heritage bakery with fresh warm piaya and brewed coffee is pure nostalgia.',
        recommendedDish: 'Freshly griddled Muscovado Piaya'
      }
    ]
  }
];

export const TRAVEL_SPOTS: TravelSpot[] = [
  {
    id: 'spot-1',
    name: 'Calle Real & Heritage District',
    province: 'Iloilo',
    location: 'JM Basa St, City Proper, Iloilo City',
    description: 'A gorgeously restored pedestrian heritage promenade lined with neoclassical and art deco Commonwealth-era commercial buildings, ancestral arcades, and bustling trade shops.',
    culinaryConnection: 'Walking distance to Roberto’s Siopao (famous for Queen Siopao) and easy jeepney ride to La Paz Market for authentic Batchoy.',
    photo: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80',
    funFact: 'Calle Real was the bustling financial center of the Visayas during the golden era of the Philippine sugar boom.',
    travelTip: 'Visit during late afternoon when the street turns pedestrian-friendly and colonial facades are bathed in warm golden light.'
  },
  {
    id: 'spot-2',
    name: 'The Ruins & Hacienda Mansions',
    province: 'Negros Occidental',
    location: 'Talisay City & Silay City, Negros Occidental',
    description: 'The "Taj Mahal of the Philippines," a grand Italianate neo-Romanesque mansion built by sugar baron Don Mariano Ledesma Lacson for his beloved wife Maria Braga.',
    culinaryConnection: 'Silay City features 30+ preserved heritage mansions, many housing ancestral kitchens serving authentic heirloom sweets, Napoleones, and empanadas.',
    photo: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
    funFact: 'The mansion was constructed using a concrete mixture reinforced with egg whites to create a porcelain-smooth finish that glows at sunset.',
    travelTip: 'Try the sugarcane juice freshly pressed right on site while enjoying the evening violin serenades.'
  },
  {
    id: 'spot-3',
    name: 'San Lorenzo Wind Farm & Mango Orchards',
    province: 'Guimaras',
    location: 'San Lorenzo & Jordan, Guimaras',
    description: 'Towering 27 wind turbines standing proudly over emerald rolling hills, coconut groves, and sprawling protected mango plantations overlooking the Iloilo Strait.',
    culinaryConnection: 'Tourists can pick sweet mangoes straight from the orchard trees or sample mango ketchup, mango empanada, and mango beer.',
    photo: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    funFact: 'The National Mango Research and Development Center in Guimaras maintains the genetic germplasm bank for Philippine mango varieties.',
    travelTip: 'Time your trip during the annual Manggahan Festival in May for the legendary "Eat-All-You-Can Mango" challenge!'
  },
  {
    id: 'spot-4',
    name: 'Baybay Beach & Pan-ay Church',
    province: 'Capiz',
    location: 'Roxas City & Pan-ay, Capiz',
    description: 'A 7-kilometer stretch of dark grey volcanic sand lined with seaside open-air seafood pavilions, just 15 minutes away from Pan-ay Church which houses the largest church bell in Asia.',
    culinaryConnection: 'The beachside boulevard is the epicentre of fresh catch: grilled diwal, steamed talaba, sizzling squid, and sweet Capiz crabs.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    funFact: 'The historic bell of Pan-ay Church was cast from 70 sacks of gold and silver coins donated by local townsfolk in 1878.',
    travelTip: 'Pair your sunset stroll with fresh green coconuts and grilled squid skewers from local vendors along the shoreline.'
  },
  {
    id: 'spot-5',
    name: 'Tibiao River & Kawa Hot Bath',
    province: 'Antique',
    location: 'Tibiao, Antique',
    description: 'Soak in oversized iron cauldrons (*kawa*) originally used to crystallize raw muscovado sugar, now warmed over wood fires and filled with mountain spring water, fragrant ginger roots, and herbal leaves.',
    culinaryConnection: 'Antique is renowned for native *Porbidang Manok*, native *Binabak* (crushed river shrimp steamed in banana leaves), and artisanal muscovado sugar.',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    funFact: 'Antique remains the heartland of the ancient Kinaray-a language, the oldest recorded spoken language on Panay Island.',
    travelTip: 'Experience the white-water river kayaking before relaxing into your herbal kawa bath!'
  },
  {
    id: 'spot-6',
    name: 'Boracay Island & Aklan River Eco-Park',
    province: 'Aklan',
    location: 'Malay & Kalibo, Aklan',
    description: 'World-famous 4-kilometer powdery White Beach, crystal turquoise waters, and vibrant night markets, flanked by the lush Bakhawan Eco-Park mangrove reserve in Kalibo.',
    culinaryConnection: 'Famous for Boracay’s legendary street snacks like the spicy Chori Burger, Calamansi Muffins at Real Coffee, and roadside Chicken Binakol in Kalibo.',
    photo: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    funFact: 'The Bakhawan Eco-Park is recognized by the United Nations as one of the most successful mangrove reforestation projects in Asia.',
    travelTip: 'Try the traditional tamilok (woodworm delicacy) at the mangrove boardwalk if you are feeling culinary adventurous!'
  }
];

export const REFERENCES_DATA: ReferenceItem[] = [
  {
    id: 'ref-1',
    title: 'Department of Tourism Region VI: Western Visayas Flavors & Destinations',
    authorOrSource: 'Department of Tourism (DOT) Western Visayas Regional Office',
    year: '2024–2026',
    category: 'Official Tourism Portal',
    description: 'Official tourism portal providing regional culinary circuit mappings, provincial festival schedules, and cultural heritage documentation across Iloilo, Negros Occidental, Guimaras, Capiz, Aklan, and Antique.',
    linkText: 'visitwesternvisayas.com / Philippines Tourism Portal'
  },
  {
    id: 'ref-2',
    title: 'Flavors of Western Visayas: Traditional Foodways and Heirloom Cooking',
    authorOrSource: 'National Commission for Culture and the Arts (NCCA) & Heritage Culinary Archives',
    year: '2023',
    category: 'Culinary Lore & History',
    description: 'Authoritative cultural texts documenting native batwan souring fruit, kadyos pigeon peas, charcoal-grilled chicken inasal methods in Bacolod, and wonton pastry heritage in Molo.',
    linkText: 'ncca.gov.ph Culinary Heritage Registry'
  },
  {
    id: 'ref-3',
    title: 'Culinary Photography & Visual Assets Credit',
    authorOrSource: 'Unsplash Photographers & Philippine Food Photography Archives',
    year: '2024–2026',
    category: 'Photo Credit & Imagery',
    description: 'High-definition food photography and destination visuals credited to creative commons photographers and local food journalists documenting authentic Philippine noodles, charcoal grills, coastal seafood, and tropical orchards.',
    linkText: 'Unsplash Creative Commons Open License'
  },
  {
    id: 'ref-4',
    title: 'Western Visayas Video Reel: Tourism & Promotion Video Reference',
    authorOrSource: 'YouTube Tourism & Promotion Video Reference (PB1_maFyzp8)',
    year: '2024',
    category: 'Heritage Documentation',
    description: 'Featured video header capturing the coastal beauty, heritage streets of Calle Real, festive culture, and vibrant food markets of Region VI.',
    linkText: 'youtu.be/PB1_maFyzp8'
  },
  {
    id: 'ref-5',
    title: 'Capiz Provincial Tourism and Cultural Affairs Office: Diwal Protection & Seafood Registry',
    authorOrSource: 'Provincial Government of Capiz, Roxas City',
    year: '2025',
    category: 'Official Tourism Portal',
    description: 'Verified historical descriptions of Angel Wing Clams (Diwal / Pholas orientalis) in Baybay Beach and Roxas City’s legal designation as the Seafood Capital of the Philippines.',
    linkText: 'capiz.gov.ph / Roxas City Seafood Profile'
  },
  {
    id: 'ref-6',
    title: 'Guimaras Mango Growers and Agricultural Heritage Board',
    authorOrSource: 'Provincial Government of Guimaras & National Mango Research Center',
    year: '2025',
    category: 'Culinary Lore & History',
    description: 'Geographic and agricultural background for Guimaras Carabao Mangoes, sweetness certification standards, and local innovations including artisan mango pizza.',
    linkText: 'guimaras.gov.ph Tourism & Agricultural Profile'
  }
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  welcomeGreeting: 'Maayong adlaw! Welcome to Western Visayas',
  siteTitle: 'Namit 4 Visayas',
  siteSubtitle: '"Maayong pag-abot sa amon banwa!" Step into Region VI—where the heart of Philippine hospitality meets legendary heirloom flavors across Panay Island, Guimaras, and Negros Occidental.',
  youtubeVideoUrl: 'https://youtu.be/PB1_maFyzp8?si=hA7uVw8YDI7fIi5u',
  videoCaption: 'Discover the sights, heritage streets, and cultural wonders of Western Visayas',
  galleryIntroStory: 'Maayong pag-abot! Step into Western Visayas—a blessed archipelago of verdant hills, azure seas, and sunlit sugarlands where food is the very heartbeat of home. From the soothing warmth of slow-simmered Ilonggo broth to the smoky sizzle of Bacolod barbecues, the sweetness of Guimaras groves, and the bountiful seafood of Capiz shores, every single dish carries the deep affection, generosity, and pride of the Visayan table.',
  manifestoTitle: 'Group 4 Curatorial Commitment',
  manifestoText: 'Every proponent contributed primary culinary research, community interviews, and photo curation to deliver an authentic tourism promotion platform celebrating the deep heritage of Region VI.',
};

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return 'PB1_maFyzp8';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}
