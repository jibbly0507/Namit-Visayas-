import React, { useState, useEffect } from 'react';
import { FoodItem, LocalDiner, DinerReview, TravelSpot, ReferenceItem, SiteConfig } from './types';
import {
  INITIAL_FOOD_ITEMS,
  INITIAL_DINERS,
  TRAVEL_SPOTS,
  REFERENCES_DATA,
  DEFAULT_SITE_CONFIG,
} from './data/initialData';
import { savePersistentData, loadPersistentData, clearPersistentData } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FoodGallery } from './components/FoodGallery';
import { FoodDetailModal } from './components/FoodDetailModal';
import { InteractiveMap } from './components/InteractiveMap';
import { DinerReviewModal } from './components/DinerReviewModal';
import { TravelSpots } from './components/TravelSpots';
import { AboutUs } from './components/AboutUs';
import { ReferencesSection } from './components/ReferencesSection';
import { FullEditorModal, EditorTab } from './components/FullEditorModal';
import { QuickPhotoModal } from './components/QuickPhotoModal';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';

const STORAGE_KEY_FOODS = 'namit4visayas_foods_v1';
const STORAGE_KEY_DINERS = 'namit4visayas_diners_v1';
const STORAGE_KEY_SPOTS = 'namit4visayas_spots_v1';
const STORAGE_KEY_REFS = 'namit4visayas_refs_v1';
const STORAGE_KEY_SITE = 'namit4visayas_site_config_v1';

export default function App() {
  // 1. Food items state with dual IndexedDB + localStorage persistence
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FOODS);
      if (saved) {
        const parsed: FoodItem[] = JSON.parse(saved);
        return parsed.map((item) => {
          const defaultItem = INITIAL_FOOD_ITEMS.find((init) => init.id === item.id);
          if (!defaultItem) return item;
          return {
            ...item,
            flavorProfile: item.flavorProfile || defaultItem.flavorProfile,
            keyIngredients: item.keyIngredients || defaultItem.keyIngredients,
            bestPairing: item.bestPairing || defaultItem.bestPairing,
            culturalBackground: item.culturalBackground || defaultItem.culturalBackground,
            funFact: item.funFact || defaultItem.funFact,
          };
        });
      }
    } catch (e) {
      console.warn('Failed to load foods from localStorage', e);
    }
    return INITIAL_FOOD_ITEMS;
  });

  // 2. Site Configuration state
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SITE);
      if (saved) return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to load site config from localStorage', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  // 3. Local Diners state
  const [diners, setDiners] = useState<LocalDiner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DINERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load diners from localStorage', e);
    }
    return INITIAL_DINERS;
  });

  // 4. Travel Spots state
  const [travelSpots, setTravelSpots] = useState<TravelSpot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SPOTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load travel spots from localStorage', e);
    }
    return TRAVEL_SPOTS;
  });

  // 5. References state
  const [references, setReferences] = useState<ReferenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REFS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load references from localStorage', e);
    }
    return REFERENCES_DATA;
  });

  // Load from IndexedDB on startup (in case photos exceeded localStorage quota)
  useEffect(() => {
    let isMounted = true;
    const restoreFromStorage = async () => {
      try {
        const idbFoods = await loadPersistentData<FoodItem[]>(STORAGE_KEY_FOODS, []);
        if (isMounted && idbFoods && idbFoods.length > 0) {
          setFoodItems((prev) => {
            // Check if idbFoods has custom photos or items
            const hasCustomPhotos = idbFoods.some((f, idx) => f.photo !== INITIAL_FOOD_ITEMS[idx]?.photo);
            return hasCustomPhotos ? idbFoods : prev;
          });
        }

        const idbSite = await loadPersistentData<SiteConfig | null>(STORAGE_KEY_SITE, null);
        if (isMounted && idbSite) setSiteConfig(idbSite);

        const idbDiners = await loadPersistentData<LocalDiner[]>(STORAGE_KEY_DINERS, []);
        if (isMounted && idbDiners && idbDiners.length > 0) setDiners(idbDiners);

        const idbSpots = await loadPersistentData<TravelSpot[]>(STORAGE_KEY_SPOTS, []);
        if (isMounted && idbSpots && idbSpots.length > 0) setTravelSpots(idbSpots);

        const idbRefs = await loadPersistentData<ReferenceItem[]>(STORAGE_KEY_REFS, []);
        if (isMounted && idbRefs && idbRefs.length > 0) setReferences(idbRefs);
      } catch (err) {
        console.warn('Could not restore from IndexedDB:', err);
      }
    };

    restoreFromStorage();
    return () => {
      isMounted = false;
    };
  }, []);

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState('hero');

  // Modals & Active Selections
  const [detailModalItem, setDetailModalItem] = useState<FoodItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorInitialTab, setEditorInitialTab] = useState<EditorTab>('foods');
  const [editorSelectedFoodId, setEditorSelectedFoodId] = useState<string | undefined>(undefined);
  const [editorSelectedDinerId, setEditorSelectedDinerId] = useState<string | undefined>(undefined);
  const [editorSelectedSpotId, setEditorSelectedSpotId] = useState<string | undefined>(undefined);
  const [editorSelectedRefId, setEditorSelectedRefId] = useState<string | undefined>(undefined);

  // Dedicated Quick Photo Modal Target
  const [quickPhotoTarget, setQuickPhotoTarget] = useState<{
    item: FoodItem;
    mode: 'food' | 'avatar';
  } | null>(null);

  const [selectedDiner, setSelectedDiner] = useState<LocalDiner | null>(diners[0] || null);
  const [reviewDinerTarget, setReviewDinerTarget] = useState<LocalDiner | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Active batchoy item (reflects user's custom edits or updated default)
  const batchoyItem =
    foodItems.find(
      (f) => f.id === 'food-1' || f.title.toLowerCase().includes('batchoy')
    ) || foodItems[0];

  // Persistent save effects
  useEffect(() => {
    savePersistentData(STORAGE_KEY_FOODS, foodItems);
  }, [foodItems]);

  useEffect(() => {
    savePersistentData(STORAGE_KEY_SITE, siteConfig);
  }, [siteConfig]);

  useEffect(() => {
    savePersistentData(STORAGE_KEY_DINERS, diners);
  }, [diners]);

  useEffect(() => {
    savePersistentData(STORAGE_KEY_SPOTS, travelSpots);
  }, [travelSpots]);

  useEffect(() => {
    savePersistentData(STORAGE_KEY_REFS, references);
  }, [references]);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open Master Editor to specific tab / item
  const openEditor = (tab: EditorTab = 'foods', itemId?: string) => {
    setEditorInitialTab(tab);
    if (tab === 'foods' || tab === 'members') {
      setEditorSelectedFoodId(itemId || foodItems[0]?.id);
    } else if (tab === 'diners') {
      setEditorSelectedDinerId(itemId || diners[0]?.id);
    } else if (tab === 'spots') {
      setEditorSelectedSpotId(itemId || travelSpots[0]?.id);
    } else if (tab === 'references') {
      setEditorSelectedRefId(itemId || references[0]?.id);
    }
    setIsEditorOpen(true);
  };

  // Open Quick Photo Modal
  const openQuickPhoto = (item: FoodItem, mode: 'food' | 'avatar' = 'food') => {
    setQuickPhotoTarget({ item, mode });
  };

  // 1. Food Handlers
  const handleSaveFoodItem = (updatedItem: FoodItem) => {
    setFoodItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    if (detailModalItem?.id === updatedItem.id) {
      setDetailModalItem(updatedItem);
    }
    // Also save immediately to storage
    const nextFoods = foodItems.map((item) => (item.id === updatedItem.id ? updatedItem : item));
    savePersistentData(STORAGE_KEY_FOODS, nextFoods);
  };

  const handleAddFoodItem = (newItem: FoodItem) => {
    setFoodItems((prev) => {
      const next = [...prev, newItem];
      savePersistentData(STORAGE_KEY_FOODS, next);
      return next;
    });
  };

  const handleDeleteFoodItem = (id: string) => {
    setFoodItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      savePersistentData(STORAGE_KEY_FOODS, next);
      return next;
    });
  };

  // 2. Site Config Handler
  const handleSaveSiteConfig = (updatedConfig: SiteConfig) => {
    setSiteConfig(updatedConfig);
    savePersistentData(STORAGE_KEY_SITE, updatedConfig);
  };

  // 3. Diner Handlers
  const handleSaveDiner = (updatedDiner: LocalDiner) => {
    setDiners((prev) =>
      prev.map((d) => (d.id === updatedDiner.id ? updatedDiner : d))
    );
    if (selectedDiner?.id === updatedDiner.id) {
      setSelectedDiner(updatedDiner);
    }
  };

  const handleAddDiner = (newDiner: LocalDiner) => {
    setDiners((prev) => [...prev, newDiner]);
    setSelectedDiner(newDiner);
  };

  const handleDeleteDiner = (id: string) => {
    setDiners((prev) => prev.filter((d) => d.id !== id));
    if (selectedDiner?.id === id) {
      setSelectedDiner(diners.find((d) => d.id !== id) || null);
    }
  };

  // 4. Travel Spot Handlers
  const handleSaveTravelSpot = (updatedSpot: TravelSpot) => {
    setTravelSpots((prev) =>
      prev.map((s) => (s.id === updatedSpot.id ? updatedSpot : s))
    );
  };

  const handleAddTravelSpot = (newSpot: TravelSpot) => {
    setTravelSpots((prev) => [...prev, newSpot]);
  };

  const handleDeleteTravelSpot = (id: string) => {
    setTravelSpots((prev) => prev.filter((s) => s.id !== id));
  };

  // 5. Reference Handlers
  const handleSaveReference = (updatedRef: ReferenceItem) => {
    setReferences((prev) =>
      prev.map((r) => (r.id === updatedRef.id ? updatedRef : r))
    );
  };

  const handleAddReference = (newRef: ReferenceItem) => {
    setReferences((prev) => [...prev, newRef]);
  };

  const handleDeleteReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
  };

  // Reset to original Visayas defaults
  const handleResetAll = async () => {
    if (
      window.confirm(
        'Reset all food dishes, team members, site stories, video header, diners, travel spots, and references to original Western Visayas defaults?'
      )
    ) {
      setFoodItems(INITIAL_FOOD_ITEMS);
      setSiteConfig(DEFAULT_SITE_CONFIG);
      setDiners(INITIAL_DINERS);
      setTravelSpots(TRAVEL_SPOTS);
      setReferences(REFERENCES_DATA);
      setSelectedDiner(INITIAL_DINERS[0]);
      await clearPersistentData([
        STORAGE_KEY_FOODS,
        STORAGE_KEY_SITE,
        STORAGE_KEY_DINERS,
        STORAGE_KEY_SPOTS,
        STORAGE_KEY_REFS,
      ]);
      setIsEditorOpen(false);
      setQuickPhotoTarget(null);
    }
  };

  // Submit a new review for a diner
  const handleSubmitDinerReview = (dinerId: string, newReview: DinerReview) => {
    setDiners((prev) =>
      prev.map((diner) => {
        if (diner.id !== dinerId) return diner;
        const updatedReviews = [newReview, ...diner.reviews];
        const sum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const avg = Math.round((sum / updatedReviews.length) * 100) / 100;
        return {
          ...diner,
          rating: avg,
          reviews: updatedReviews,
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#24211D] flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => openEditor('foods')}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section with Western Visayas Video Header & Maayong adlaw banner */}
        <Hero
          batchoyItem={batchoyItem}
          siteConfig={siteConfig}
          onExploreFood={() => handleNavigate('gallery')}
          onOpenMap={() => handleNavigate('map')}
          onEditHeader={() => openEditor('site')}
          onEditDish={(item) => openQuickPhoto(item, 'food')}
        />

        {/* 8 Regional Food Dishes */}
        <FoodGallery
          items={foodItems}
          introStory={siteConfig.galleryIntroStory}
          onSelectItem={(item) => setDetailModalItem(item)}
          onEditItem={(item) => openQuickPhoto(item, 'food')}
          onEditStory={() => openEditor('site')}
          onAddNewDish={() => openEditor('foods')}
        />

        {/* Interactive Diner Map & Community Rating System */}
        <InteractiveMap
          diners={diners}
          selectedDiner={selectedDiner}
          onSelectDiner={(diner) => setSelectedDiner(diner)}
          onOpenReviewModal={(diner) => setReviewDinerTarget(diner)}
          onEditDiner={(diner) => openEditor('diners', diner.id)}
          onAddNewDiner={() => openEditor('diners')}
        />

        {/* Travel Spots with Cultural Fun Facts & Food Pairings */}
        <TravelSpots
          spots={travelSpots}
          onEditSpot={(spot) => openEditor('spots', spot.id)}
          onAddNewSpot={() => openEditor('spots')}
        />

        {/* About Us: Group 4 Members Directory with Formal 1x1 Photos */}
        <AboutUs
          items={foodItems}
          manifestoTitle={siteConfig.manifestoTitle}
          manifestoText={siteConfig.manifestoText}
          onSelectFood={(item) => {
            handleNavigate('gallery');
            setDetailModalItem(item);
          }}
          onEditMember={(item) => openQuickPhoto(item, 'avatar')}
          onEditManifesto={() => openEditor('site')}
        />

        {/* Practical Exam References & Online Credits */}
        <ReferencesSection
          references={references}
          onEditReference={(ref) => openEditor('references', ref.id)}
          onAddNewReference={() => openEditor('references')}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCustomizer={() => openEditor('foods')}
      />

      {/* Modals */}
      {/* 1. Food Detail Modal */}
      <FoodDetailModal
        item={detailModalItem}
        onClose={() => setDetailModalItem(null)}
        onEdit={(item) => {
          openQuickPhoto(item, 'food');
        }}
      />

      {/* 2. Dedicated Instant Quick Photo Modal (Foolproof Photo Upload & Auto-Save) */}
      <QuickPhotoModal
        isOpen={Boolean(quickPhotoTarget)}
        item={quickPhotoTarget?.item || null}
        mode={quickPhotoTarget?.mode || 'food'}
        onClose={() => setQuickPhotoTarget(null)}
        onSavePhoto={(updatedItem) => {
          handleSaveFoodItem(updatedItem);
          if (quickPhotoTarget) {
            setQuickPhotoTarget({ ...quickPhotoTarget, item: updatedItem });
          }
        }}
        onOpenFullEditor={(item) => {
          setQuickPhotoTarget(null);
          openEditor('foods', item.id);
        }}
      />

      {/* 3. Master Full Website Customizer & Editor Modal */}
      <FullEditorModal
        isOpen={isEditorOpen}
        initialTab={editorInitialTab}
        onClose={() => setIsEditorOpen(false)}
        // Foods
        foodItems={foodItems}
        selectedFoodId={editorSelectedFoodId}
        onSaveFoodItem={handleSaveFoodItem}
        onAddFoodItem={handleAddFoodItem}
        onDeleteFoodItem={handleDeleteFoodItem}
        // Site Config
        siteConfig={siteConfig}
        onSaveSiteConfig={handleSaveSiteConfig}
        // Diners
        diners={diners}
        selectedDinerId={editorSelectedDinerId}
        onSaveDiner={handleSaveDiner}
        onAddDiner={handleAddDiner}
        onDeleteDiner={handleDeleteDiner}
        // Travel Spots
        travelSpots={travelSpots}
        selectedSpotId={editorSelectedSpotId}
        onSaveTravelSpot={handleSaveTravelSpot}
        onAddTravelSpot={handleAddTravelSpot}
        onDeleteTravelSpot={handleDeleteTravelSpot}
        // References
        references={references}
        selectedRefId={editorSelectedRefId}
        onSaveReference={handleSaveReference}
        onAddReference={handleAddReference}
        onDeleteReference={handleDeleteReference}
        // Reset All
        onResetAll={handleResetAll}
      />

      {/* 4. Diner Review & Rating Modal */}
      <DinerReviewModal
        diner={reviewDinerTarget}
        onClose={() => setReviewDinerTarget(null)}
        onSubmitReview={handleSubmitDinerReview}
      />

      {/* 5. Cultural Showreel Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}
