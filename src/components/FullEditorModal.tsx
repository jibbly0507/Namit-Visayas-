import React, { useState, useEffect } from 'react';
import { FoodItem, LocalDiner, TravelSpot, ReferenceItem, Province, SiteConfig } from '../types';
import { extractYouTubeId } from '../data/initialData';
import { compressImageFile, compressAvatarFile } from '../utils/imageCompression';
import {
  X,
  Upload,
  Image,
  User,
  Check,
  RefreshCw,
  MapPin,
  Compass,
  BookOpen,
  Utensils,
  Plus,
  Trash2,
  SlidersHorizontal,
  Youtube,
  FileText,
  Users,
  Loader2,
} from 'lucide-react';

export type EditorTab = 'foods' | 'members' | 'site' | 'diners' | 'spots' | 'references';

interface FullEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Foods
  foodItems: FoodItem[];
  selectedFoodId?: string;
  onSaveFoodItem: (item: FoodItem) => void;
  onAddFoodItem?: (item: FoodItem) => void;
  onDeleteFoodItem?: (id: string) => void;
  // Site Config
  siteConfig: SiteConfig;
  onSaveSiteConfig: (config: SiteConfig) => void;
  // Diners
  diners: LocalDiner[];
  selectedDinerId?: string;
  onSaveDiner: (diner: LocalDiner) => void;
  onAddDiner: (diner: LocalDiner) => void;
  onDeleteDiner: (id: string) => void;
  // Travel Spots
  travelSpots: TravelSpot[];
  selectedSpotId?: string;
  onSaveTravelSpot: (spot: TravelSpot) => void;
  onAddTravelSpot: (spot: TravelSpot) => void;
  onDeleteTravelSpot: (id: string) => void;
  // References
  references: ReferenceItem[];
  selectedRefId?: string;
  onSaveReference: (ref: ReferenceItem) => void;
  onAddReference: (ref: ReferenceItem) => void;
  onDeleteReference: (id: string) => void;
  // Reset
  onResetAll: () => void;
  initialTab?: EditorTab;
}

export const FullEditorModal: React.FC<FullEditorModalProps> = ({
  isOpen,
  onClose,
  foodItems,
  selectedFoodId,
  onSaveFoodItem,
  onAddFoodItem,
  onDeleteFoodItem,
  siteConfig,
  onSaveSiteConfig,
  diners,
  selectedDinerId,
  onSaveDiner,
  onAddDiner,
  onDeleteDiner,
  travelSpots,
  selectedSpotId,
  onSaveTravelSpot,
  onAddTravelSpot,
  onDeleteTravelSpot,
  references,
  selectedRefId,
  onSaveReference,
  onAddReference,
  onDeleteReference,
  onResetAll,
  initialTab = 'foods',
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>(initialTab);
  const [statusMsg, setStatusMsg] = useState('');
  const [isPhotoOptimizing, setIsPhotoOptimizing] = useState(false);

  // 1. Food State
  const [curFoodId, setCurFoodId] = useState<string>(selectedFoodId || foodItems[0]?.id || '');
  const curFood = foodItems.find((f) => f.id === curFoodId) || foodItems[0];

  const [foodTitle, setFoodTitle] = useState('');
  const [foodNativeTitle, setFoodNativeTitle] = useState('');
  const [foodProvince, setFoodProvince] = useState<Province>('Iloilo');
  const [foodOriginPlace, setFoodOriginPlace] = useState('');
  const [foodPhoto, setFoodPhoto] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodCulturalBackground, setFoodCulturalBackground] = useState('');
  const [foodIngredients, setFoodIngredients] = useState('');
  const [foodBestPairing, setFoodBestPairing] = useState('');
  const [foodFunFact, setFoodFunFact] = useState('');
  const [foodRating, setFoodRating] = useState(4.9);
  const [foodReviewCount, setFoodReviewCount] = useState(120);

  // 2. Member State
  const [curMemberFoodId, setCurMemberFoodId] = useState<string>(selectedFoodId || foodItems[0]?.id || '');
  const curMemberFood = foodItems.find((f) => f.id === curMemberFoodId) || foodItems[0];
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberAvatar, setMemberAvatar] = useState('');
  const [memberQuote, setMemberQuote] = useState('');
  const [memberStudentNumber, setMemberStudentNumber] = useState('');

  // 3. Site Settings State
  const [welcomeGreeting, setWelcomeGreeting] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [siteSubtitle, setSiteSubtitle] = useState('');
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState('');
  const [videoCaption, setVideoCaption] = useState('');
  const [galleryIntroStory, setGalleryIntroStory] = useState('');
  const [manifestoTitle, setManifestoTitle] = useState('');
  const [manifestoText, setManifestoText] = useState('');

  // 4. Diner State
  const [curDinerId, setCurDinerId] = useState<string>(selectedDinerId || diners[0]?.id || '');
  const curDiner = diners.find((d) => d.id === curDinerId) || diners[0];

  const [dinerName, setDinerName] = useState('');
  const [dinerProvince, setDinerProvince] = useState<Province>('Iloilo');
  const [dinerCity, setDinerCity] = useState('');
  const [dinerSpecialty, setDinerSpecialty] = useState('');
  const [dinerPhoto, setDinerPhoto] = useState('');
  const [dinerAddress, setDinerAddress] = useState('');
  const [dinerPriceLevel, setDinerPriceLevel] = useState<'₱' | '₱₱' | '₱₱₱'>('₱₱');
  const [dinerRating, setDinerRating] = useState(4.9);
  const [dinerTag, setDinerTag] = useState('');

  // 5. Travel Spot State
  const [curSpotId, setCurSpotId] = useState<string>(selectedSpotId || travelSpots[0]?.id || '');
  const curSpot = travelSpots.find((s) => s.id === curSpotId) || travelSpots[0];

  const [spotName, setSpotName] = useState('');
  const [spotProvince, setSpotProvince] = useState<Province>('Iloilo');
  const [spotLocation, setSpotLocation] = useState('');
  const [spotDescription, setSpotDescription] = useState('');
  const [spotCulinaryConnection, setSpotCulinaryConnection] = useState('');
  const [spotPhoto, setSpotPhoto] = useState('');
  const [spotFunFact, setSpotFunFact] = useState('');
  const [spotTravelTip, setSpotTravelTip] = useState('');

  // 6. Reference State
  const [curRefId, setCurRefId] = useState<string>(selectedRefId || references[0]?.id || '');
  const curRef = references.find((r) => r.id === curRefId) || references[0];

  const [refTitle, setRefTitle] = useState('');
  const [refAuthor, setRefAuthor] = useState('');
  const [refYear, setRefYear] = useState('');
  const [refCategory, setRefCategory] = useState<ReferenceItem['category']>('Official Tourism Portal');
  const [refDescription, setRefDescription] = useState('');
  const [refLinkText, setRefLinkText] = useState('');
  const [refUrl, setRefUrl] = useState('');

  // Sync initial tab & selection when opened or props update
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (selectedFoodId) {
      setCurFoodId(selectedFoodId);
      setCurMemberFoodId(selectedFoodId);
    }
  }, [selectedFoodId]);

  useEffect(() => {
    if (selectedDinerId) {
      setCurDinerId(selectedDinerId);
    }
  }, [selectedDinerId]);

  useEffect(() => {
    if (selectedSpotId) {
      setCurSpotId(selectedSpotId);
    }
  }, [selectedSpotId]);

  useEffect(() => {
    if (selectedRefId) {
      setCurRefId(selectedRefId);
    }
  }, [selectedRefId]);

  // Populate food fields
  useEffect(() => {
    if (curFood) {
      setFoodTitle(curFood.title || '');
      setFoodNativeTitle(curFood.nativeTitle || '');
      setFoodProvince(curFood.province || 'Iloilo');
      setFoodOriginPlace(curFood.originPlace || '');
      setFoodPhoto(curFood.photo || '');
      setFoodDescription(curFood.description || '');
      setFoodCulturalBackground(curFood.culturalBackground || '');
      setFoodIngredients(curFood.keyIngredients?.join('\n') || '');
      setFoodBestPairing(curFood.bestPairing || '');
      setFoodFunFact(curFood.funFact || '');
      setFoodRating(curFood.rating || 4.9);
      setFoodReviewCount(curFood.reviewCount || 100);
    }
  }, [curFoodId, curFood]);

  // Populate member fields
  useEffect(() => {
    if (curMemberFood) {
      setMemberName(curMemberFood.submitter?.name || '');
      setMemberRole(curMemberFood.submitter?.role || '');
      setMemberAvatar(curMemberFood.submitter?.avatar || '');
      setMemberQuote(curMemberFood.submitter?.quote || '');
      setMemberStudentNumber(curMemberFood.submitter?.studentNumber || '');
    }
  }, [curMemberFoodId, curMemberFood]);

  // Populate site config
  useEffect(() => {
    if (siteConfig) {
      setWelcomeGreeting(siteConfig.welcomeGreeting || '');
      setSiteTitle(siteConfig.siteTitle || '');
      setSiteSubtitle(siteConfig.siteSubtitle || '');
      setYoutubeVideoUrl(siteConfig.youtubeVideoUrl || '');
      setVideoCaption(siteConfig.videoCaption || '');
      setGalleryIntroStory(siteConfig.galleryIntroStory || '');
      setManifestoTitle(siteConfig.manifestoTitle || '');
      setManifestoText(siteConfig.manifestoText || '');
    }
  }, [siteConfig, isOpen]);

  // Populate diner fields
  useEffect(() => {
    if (curDiner) {
      setDinerName(curDiner.name || '');
      setDinerProvince(curDiner.province || 'Iloilo');
      setDinerCity(curDiner.city || '');
      setDinerSpecialty(curDiner.specialty || '');
      setDinerPhoto(curDiner.photo || '');
      setDinerAddress(curDiner.address || '');
      setDinerPriceLevel(curDiner.priceLevel || '₱₱');
      setDinerRating(curDiner.rating || 5);
      setDinerTag(curDiner.tag || '');
    }
  }, [curDinerId, curDiner]);

  // Populate spot fields
  useEffect(() => {
    if (curSpot) {
      setSpotName(curSpot.name || '');
      setSpotProvince(curSpot.province || 'Iloilo');
      setSpotLocation(curSpot.location || '');
      setSpotDescription(curSpot.description || '');
      setSpotCulinaryConnection(curSpot.culinaryConnection || '');
      setSpotPhoto(curSpot.photo || '');
      setSpotFunFact(curSpot.funFact || '');
      setSpotTravelTip(curSpot.travelTip || '');
    }
  }, [curSpotId, curSpot]);

  // Populate reference fields
  useEffect(() => {
    if (curRef) {
      setRefTitle(curRef.title || '');
      setRefAuthor(curRef.authorOrSource || '');
      setRefYear(curRef.year || '');
      setRefCategory(curRef.category || 'Official Tourism Portal');
      setRefDescription(curRef.description || '');
      setRefLinkText(curRef.linkText || '');
      setRefUrl(curRef.url || '');
    }
  }, [curRefId, curRef]);

  const notifySaved = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // Safe Compressed Image Upload Helper
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'food' | 'avatar' | 'diner' | 'spot',
    onUrlReady: (url: string) => void,
    autoSaveCallback?: (compressedUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsPhotoOptimizing(true);
      const compressed = type === 'avatar'
        ? await compressAvatarFile(file)
        : await compressImageFile(file, 1200, 1200, 0.82);

      onUrlReady(compressed);
      if (autoSaveCallback) {
        autoSaveCallback(compressed);
      }
      notifySaved('✓ Photo compressed & saved permanently!');
    } catch (err) {
      console.warn('Fallback to file reader', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          onUrlReady(res);
          if (autoSaveCallback) autoSaveCallback(res);
          notifySaved('✓ Photo saved!');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsPhotoOptimizing(false);
    }
  };

  // 1. Save Food
  const handleSaveFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curFood) return;
    const parsedIngredients = foodIngredients
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated: FoodItem = {
      ...curFood,
      title: foodTitle.trim() || curFood.title,
      nativeTitle: foodNativeTitle.trim() || curFood.nativeTitle,
      province: foodProvince as any,
      originPlace: foodOriginPlace.trim() || curFood.originPlace,
      photo: foodPhoto.trim() || curFood.photo,
      description: foodDescription.trim() || curFood.description,
      culturalBackground: foodCulturalBackground.trim() || curFood.culturalBackground,
      keyIngredients: parsedIngredients.length > 0 ? parsedIngredients : curFood.keyIngredients,
      bestPairing: foodBestPairing.trim() || curFood.bestPairing,
      funFact: foodFunFact.trim() || curFood.funFact,
      rating: foodRating,
      reviewCount: foodReviewCount,
    };
    onSaveFoodItem(updated);
    notifySaved(`✓ Saved delicacy "${updated.title}" successfully!`);
  };

  // Add New Food
  const handleAddNewFood = () => {
    const newId = `food-${Date.now()}`;
    const newFood: FoodItem = {
      id: newId,
      title: 'New Western Visayas Delicacy',
      nativeTitle: 'Namit nga Pagkaon',
      province: 'Iloilo',
      originPlace: 'Iloilo City',
      description: 'A delicious heirloom specialty celebrating the authentic flavors of Region VI.',
      culturalBackground: 'Traditional heirloom recipe passed through Visayan generations.',
      photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      submitter: {
        id: `member-${Date.now()}`,
        name: 'Group 4 Proponent',
        role: 'Food Researcher',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        quote: 'Food connects people to cultural heritage.',
      },
      flavorProfile: ['Savory', 'Umami', 'Comforting'],
      keyIngredients: ['Local fresh ingredients', 'Heirloom Visayan seasonings'],
      bestPairing: 'Warm steamed rice and fresh kalamansi dip',
      rating: 5.0,
      reviewCount: 45,
      funFact: 'Cherished by locals across the Visayan islands.',
    };
    if (onAddFoodItem) {
      onAddFoodItem(newFood);
      setCurFoodId(newId);
      notifySaved('New food delicacy created! You can now customize all its details.');
    }
  };

  // 2. Save Member
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curMemberFood) return;
    const updated: FoodItem = {
      ...curMemberFood,
      submitter: {
        ...curMemberFood.submitter,
        name: memberName.trim() || curMemberFood.submitter.name,
        role: memberRole.trim() || curMemberFood.submitter.role,
        avatar: memberAvatar.trim() || curMemberFood.submitter.avatar,
        quote: memberQuote.trim() || curMemberFood.submitter.quote,
        studentNumber: memberStudentNumber.trim() || curMemberFood.submitter.studentNumber,
      },
    };
    onSaveFoodItem(updated);
    notifySaved(`✓ Saved member profile for "${memberName}"!`);
  };

  // 3. Save Site Config
  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      welcomeGreeting: welcomeGreeting.trim() || siteConfig.welcomeGreeting,
      siteTitle: siteTitle.trim() || siteConfig.siteTitle,
      siteSubtitle: siteSubtitle.trim() || siteConfig.siteSubtitle,
      youtubeVideoUrl: youtubeVideoUrl.trim() || siteConfig.youtubeVideoUrl,
      videoCaption: videoCaption.trim() || siteConfig.videoCaption,
      galleryIntroStory: galleryIntroStory.trim() || siteConfig.galleryIntroStory,
      manifestoTitle: manifestoTitle.trim() || siteConfig.manifestoTitle,
      manifestoText: manifestoText.trim() || siteConfig.manifestoText,
    };
    onSaveSiteConfig(updated);
    notifySaved('✓ Site header, greeting banner, and cultural stories saved!');
  };

  // 4. Save Diner
  const handleSaveDiner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curDiner) return;
    const updated: LocalDiner = {
      ...curDiner,
      name: dinerName.trim() || curDiner.name,
      province: dinerProvince as any,
      city: dinerCity.trim() || curDiner.city,
      specialty: dinerSpecialty.trim() || curDiner.specialty,
      photo: dinerPhoto.trim() || curDiner.photo,
      address: dinerAddress.trim() || curDiner.address,
      priceLevel: dinerPriceLevel,
      rating: dinerRating,
      tag: dinerTag.trim() || curDiner.tag,
    };
    onSaveDiner(updated);
    notifySaved(`✓ Saved diner "${updated.name}"!`);
  };

  // Add Diner
  const handleAddNewDiner = () => {
    const newId = `diner-${Date.now()}`;
    const newDiner: LocalDiner = {
      id: newId,
      name: 'New Heritage Diner',
      province: 'Iloilo',
      city: 'Iloilo City',
      specialty: 'Authentic Local Specialty',
      photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      address: 'Western Visayas',
      priceLevel: '₱₱',
      rating: 5,
      tag: 'Local Favorite',
      mapCoords: { x: 50, y: 50 },
      reviews: [],
    };
    onAddDiner(newDiner);
    setCurDinerId(newId);
    notifySaved('New diner added! You can now edit its details.');
  };

  // 5. Save Spot
  const handleSaveSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curSpot) return;
    const updated: TravelSpot = {
      ...curSpot,
      name: spotName.trim() || curSpot.name,
      province: spotProvince as any,
      location: spotLocation.trim() || curSpot.location,
      description: spotDescription.trim() || curSpot.description,
      culinaryConnection: spotCulinaryConnection.trim() || curSpot.culinaryConnection,
      photo: spotPhoto.trim() || curSpot.photo,
      funFact: spotFunFact.trim() || curSpot.funFact,
      travelTip: spotTravelTip.trim() || curSpot.travelTip,
    };
    onSaveTravelSpot(updated);
    notifySaved(`✓ Saved destination "${updated.name}"!`);
  };

  // Add Spot
  const handleAddNewSpot = () => {
    const newId = `spot-${Date.now()}`;
    const newSpot: TravelSpot = {
      id: newId,
      name: 'New Travel Destination',
      province: 'Iloilo',
      location: 'Western Visayas Location',
      description: 'Discover this breathtaking cultural spot in Region VI.',
      culinaryConnection: 'Pair with delicious local delicacies.',
      photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      funFact: 'Rich cultural background and history.',
      travelTip: 'Best to visit in the morning or late afternoon.',
    };
    onAddTravelSpot(newSpot);
    setCurSpotId(newId);
    notifySaved('New travel spot created!');
  };

  // 6. Save Reference
  const handleSaveReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curRef) return;
    const updated: ReferenceItem = {
      ...curRef,
      title: refTitle.trim() || curRef.title,
      authorOrSource: refAuthor.trim() || curRef.authorOrSource,
      year: refYear.trim() || curRef.year,
      category: refCategory,
      description: refDescription.trim() || curRef.description,
      linkText: refLinkText.trim() || curRef.linkText,
      url: refUrl.trim() || curRef.url,
    };
    onSaveReference(updated);
    notifySaved(`✓ Saved reference "${updated.title}"!`);
  };

  // Add Reference
  const handleAddNewReference = () => {
    const newId = `ref-${Date.now()}`;
    const newRef: ReferenceItem = {
      id: newId,
      title: 'New Online Reference / Photo Credit',
      authorOrSource: 'Author or Content Creator',
      year: '2026',
      category: 'Photo Credit & Imagery',
      description: 'Attribution description and source details for content used online.',
      linkText: 'Visit Source Link',
      url: 'https://unsplash.com',
    };
    onAddReference(newRef);
    setCurRefId(newId);
    notifySaved('New reference credit added!');
  };

  if (!isOpen) return null;

  const provinces: Province[] = ['Iloilo', 'Negros Occidental', 'Guimaras', 'Capiz', 'Aklan', 'Antique'];

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E5DACD] max-h-[94vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#E8DDCF] bg-[#FCFAF7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E65100] text-white flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1E1B18] font-['Outfit'] leading-none">
                Master Website Content Customizer
              </h3>
              <p className="text-xs text-[#7A6F62] mt-0.5">
                Every photo, text, video, member, diner, spot & reference is 100% editable & saved
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#706659] hover:text-[#1E1B18] hover:bg-[#EFE5D8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-[#FAF6F0] border-b border-[#E8DDCF] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('foods')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'foods'
                ? 'border-[#E65100] text-[#E65100] bg-white/60'
                : 'border-transparent text-[#685F53] hover:text-[#1E1B18]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Delicacies ({foodItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'members'
                ? 'border-[#E65100] text-[#E65100] bg-white/60'
                : 'border-transparent text-[#685F53] hover:text-[#1E1B18]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Members ({foodItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('site')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'site'
                ? 'border-[#E65100] text-[#E65100] bg-white/60'
                : 'border-transparent text-[#685F53] hover:text-[#1E1B18]'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>Header, Video & Story</span>
          </button>

          <button
            onClick={() => setActiveTab('diners')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'diners'
                ? 'border-[#E65100] text-[#E65100] bg-white/60'
                : 'border-transparent text-[#685F53] hover:text-[#1E1B18]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Diners & Map ({diners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('spots')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'spots'
                ? 'border-[#E65100] text-[#E65100] bg-white/60'
                : 'border-transparent text-[#685F53] hover:text-[#1E1B18]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Travel Spots ({travelSpots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'references'
                ? 'border-[#E65100] text-[#E65100] bg-white/60'
                : 'border-transparent text-[#685F53] hover:text-[#1E1B18]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>References & Credits ({references.length})</span>
          </button>
        </div>

        {/* Global Save notification */}
        {statusMsg && (
          <div className="mx-6 mt-4 p-3 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Scrollable Tab Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {/* TAB 1: FOOD ITEMS */}
          {activeTab === 'foods' && (
            <form onSubmit={handleSaveFood} className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-[#1E1B18]">Select Food Entry to Edit:</label>
                  <select
                    value={curFoodId}
                    onChange={(e) => setCurFoodId(e.target.value)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-[#DCD3C7] rounded-lg text-[#1E1B18] focus:ring-2 focus:ring-[#E65100]/30 outline-none"
                  >
                    {foodItems.map((item, idx) => (
                      <option key={item.id} value={item.id}>
                        #{idx + 1}: {item.title} ({item.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {onAddFoodItem && (
                    <button
                      type="button"
                      onClick={handleAddNewFood}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg flex items-center gap-1.5 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Dish</span>
                    </button>
                  )}

                  {onDeleteFoodItem && foodItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete food delicacy "${curFood.title}"?`)) {
                          onDeleteFoodItem(curFood.id);
                          setCurFoodId(foodItems.find((f) => f.id !== curFood.id)?.id || '');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                      title="Delete this dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Food Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BF360C]">
                  <Image className="w-4 h-4" />
                  <span>Delicacy Information & Authentic Ingredients</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Food Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={foodTitle}
                      onChange={(e) => setFoodTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Native Title (Hiligaynon/Kinaray-a)
                    </label>
                    <input
                      type="text"
                      value={foodNativeTitle}
                      onChange={(e) => setFoodNativeTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Province *
                    </label>
                    <select
                      value={foodProvince}
                      onChange={(e) => setFoodProvince(e.target.value as Province)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    >
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                    Origin Place / Town
                  </label>
                  <input
                    type="text"
                    value={foodOriginPlace}
                    onChange={(e) => setFoodOriginPlace(e.target.value)}
                    placeholder="e.g. La Paz Public Market, Iloilo City"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                  />
                </div>

                {/* Photo upload / link with instant save & compression */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1E1B18]">
                      Food Photo (Upload from Device or Paste Image Link)
                    </label>
                    <div className="flex items-center gap-2">
                      {isPhotoOptimizing && (
                        <span className="text-[11px] text-[#BF360C] font-bold flex items-center gap-1 animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Compressing & Saving...</span>
                        </span>
                      )}
                      {foodPhoto && !isPhotoOptimizing && (
                        <span className="text-[10px] text-[#0F4C3A] font-semibold">✓ Image Loaded</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={foodPhoto}
                      alt="Food preview"
                      className="w-20 h-16 object-cover rounded-lg border border-[#DCD3C7] shrink-0 bg-white"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={foodPhoto}
                          onChange={(e) => setFoodPhoto(e.target.value)}
                          placeholder="Paste image link (https://...)"
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (curFood && foodPhoto) {
                              onSaveFoodItem({ ...curFood, photo: foodPhoto });
                              notifySaved(`✓ Photo for "${curFood.title}" saved!`);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg transition-colors shrink-0 shadow-2xs"
                        >
                          Save Photo
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#F0E6D8] border border-[#DCD3C7] rounded-md transition-colors">
                          <Upload className="w-3 h-3 text-[#BF360C]" />
                          <span>{isPhotoOptimizing ? 'Optimizing & Saving...' : 'Upload Photo File (Auto-Saves)'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isPhotoOptimizing}
                            onChange={(e) =>
                              handleImageUpload(e, 'food', setFoodPhoto, (url) => {
                                if (curFood) onSaveFoodItem({ ...curFood, photo: url });
                              })
                            }
                          />
                        </label>
                        <span className="text-[10px] text-[#8C7D6D]">
                          Auto-compressed & saved immediately
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                    Food Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={foodDescription}
                    onChange={(e) => setFoodDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                    Cultural Background & Heritage Story
                  </label>
                  <textarea
                    rows={3}
                    value={foodCulturalBackground}
                    onChange={(e) => setFoodCulturalBackground(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>

                {/* Key Ingredients & Pairings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Key Ingredients (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={foodIngredients}
                      onChange={(e) => setFoodIngredients(e.target.value)}
                      placeholder="Fresh Yellow Miki&#10;Slow-simmered bone marrow broth&#10;Crispy pork chicharon..."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none font-mono"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                        Best Pairing & Serving Style
                      </label>
                      <input
                        type="text"
                        value={foodBestPairing}
                        onChange={(e) => setFoodBestPairing(e.target.value)}
                        placeholder="e.g. Warm Puto Manapla and extra hot caldo refills"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                        Fun Cultural Fact
                      </label>
                      <input
                        type="text"
                        value={foodFunFact}
                        onChange={(e) => setFoodFunFact(e.target.value)}
                        placeholder="Cultural trivia or unique folklore..."
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-sm"
                >
                  Save Delicacy Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TEAM MEMBERS & FORMAL 1x1 PROFILES */}
          {activeTab === 'members' && (
            <form onSubmit={handleSaveMember} className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] flex flex-wrap items-center justify-between gap-3">
                <label className="text-xs font-bold text-[#1E1B18]">Select Group 4 Member to Edit:</label>
                <select
                  value={curMemberFoodId}
                  onChange={(e) => setCurMemberFoodId(e.target.value)}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-[#DCD3C7] rounded-lg text-[#1E1B18] outline-none"
                >
                  {foodItems.map((item, idx) => (
                    <option key={item.id} value={item.id}>
                      Member #{idx + 1}: {item.submitter.name} ({item.title})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                  <User className="w-4 h-4" />
                  <span>Proponent Credentials & Formal 1x1 Profile Photo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Member Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Project Role
                    </label>
                    <input
                      type="text"
                      value={memberRole}
                      onChange={(e) => setMemberRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Student ID / Section
                    </label>
                    <input
                      type="text"
                      value={memberStudentNumber}
                      onChange={(e) => setMemberStudentNumber(e.target.value)}
                      placeholder="e.g. 2024-04-0101"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                {/* 1x1 Profile Photo with Auto-Save & Instant Button */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1E1B18]">
                      Formal 1x1 Circular Profile Picture (Upload from Device or Paste Link)
                    </label>
                    {isPhotoOptimizing && (
                      <span className="text-[11px] text-[#BF360C] font-bold flex items-center gap-1 animate-pulse">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Compressing & Saving...</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={memberAvatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#E65100] shrink-0 bg-white shadow-xs"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                      }}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={memberAvatar}
                          onChange={(e) => setMemberAvatar(e.target.value)}
                          placeholder="Paste image link for avatar..."
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (curMemberFood && memberAvatar) {
                              onSaveFoodItem({
                                ...curMemberFood,
                                submitter: { ...curMemberFood.submitter, avatar: memberAvatar },
                              });
                              notifySaved(`✓ 1x1 Portrait for "${curMemberFood.submitter.name}" saved!`);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg transition-colors shrink-0 shadow-2xs"
                        >
                          Save 1x1 Photo
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#F0E6D8] border border-[#DCD3C7] rounded-md transition-colors">
                          <Upload className="w-3 h-3 text-[#0F4C3A]" />
                          <span>{isPhotoOptimizing ? 'Optimizing...' : 'Upload 1x1 Photo File (Auto-Saves)'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isPhotoOptimizing}
                            onChange={(e) =>
                              handleImageUpload(e, 'avatar', setMemberAvatar, (url) => {
                                if (curMemberFood) {
                                  onSaveFoodItem({
                                    ...curMemberFood,
                                    submitter: { ...curMemberFood.submitter, avatar: url },
                                  });
                                }
                              })
                            }
                          />
                        </label>
                        <span className="text-[10px] text-[#8C7D6D]">
                          Auto-cropped & saved immediately
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                    Personal Food Reflection / Member Quote
                  </label>
                  <textarea
                    rows={2}
                    value={memberQuote}
                    onChange={(e) => setMemberQuote(e.target.value)}
                    placeholder="Short reflection about the dish or Western Visayas culture"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg shadow-sm"
                >
                  Save Member Profile
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SITE HEADER, VIDEO & STORIES */}
          {activeTab === 'site' && (
            <form onSubmit={handleSaveSiteConfig} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BF360C]">
                  <FileText className="w-4 h-4" />
                  <span>Welcome Banner & Hero Headlines</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Welcome Banner Badge (Traditional Greeting) *
                    </label>
                    <input
                      type="text"
                      required
                      value={welcomeGreeting}
                      onChange={(e) => setWelcomeGreeting(e.target.value)}
                      placeholder="e.g. Maayong adlaw! Welcome to Western Visayas"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Website Main Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      placeholder="e.g. Namit 4 Visayas"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                    Hero Subtitle & Regional Welcoming Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={siteSubtitle}
                    onChange={(e) => setSiteSubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>

                {/* YouTube Video Header Controls */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E65100]">
                    <Youtube className="w-4 h-4" />
                    <span>Western Visayas Video Header Settings</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      YouTube Video URL or Video ID
                    </label>
                    <input
                      type="text"
                      value={youtubeVideoUrl}
                      onChange={(e) => setYoutubeVideoUrl(e.target.value)}
                      placeholder="e.g. https://youtu.be/PB1_maFyzp8 or PB1_maFyzp8"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] font-mono"
                    />
                    <p className="text-[11px] text-[#7A6F62] mt-1">
                      Extracted Video ID: <strong className="text-[#BF360C]">{extractYouTubeId(youtubeVideoUrl)}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Video Bar Caption / Description
                    </label>
                    <input
                      type="text"
                      value={videoCaption}
                      onChange={(e) => setVideoCaption(e.target.value)}
                      placeholder="e.g. Discover the sights, heritage streets, and cultural wonders of Western Visayas"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                {/* Food Gallery Warm Intro Story */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                    Food Gallery Introduction Story (Warm narrative for Western Visayas) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={galleryIntroStory}
                    onChange={(e) => setGalleryIntroStory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>

                {/* Team Commitment / Manifesto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Group Manifesto Title
                    </label>
                    <input
                      type="text"
                      value={manifestoTitle}
                      onChange={(e) => setManifestoTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Group Manifesto Description
                    </label>
                    <textarea
                      rows={2}
                      value={manifestoText}
                      onChange={(e) => setManifestoText(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-sm"
                >
                  Save Header, Video & Stories
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: LOCAL DINERS */}
          {activeTab === 'diners' && (
            <form onSubmit={handleSaveDiner} className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-[#1E1B18]">Select Diner to Edit:</label>
                  <select
                    value={curDinerId}
                    onChange={(e) => setCurDinerId(e.target.value)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-[#DCD3C7] rounded-lg text-[#1E1B18] outline-none"
                  >
                    {diners.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddNewDiner}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg flex items-center gap-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Diner</span>
                  </button>

                  {diners.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete diner "${curDiner.name}"?`)) {
                          onDeleteDiner(curDiner.id);
                          setCurDinerId(diners.find((d) => d.id !== curDiner.id)?.id || '');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                      title="Delete this diner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Diner / Restaurant Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={dinerName}
                      onChange={(e) => setDinerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Province *</label>
                    <select
                      value={dinerProvince}
                      onChange={(e) => setDinerProvince(e.target.value as Province)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    >
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">City / Municipality *</label>
                    <input
                      type="text"
                      required
                      value={dinerCity}
                      onChange={(e) => setDinerCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Signature Specialty Dish
                    </label>
                    <input
                      type="text"
                      value={dinerSpecialty}
                      onChange={(e) => setDinerSpecialty(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Tag / Category</label>
                    <input
                      type="text"
                      value={dinerTag}
                      onChange={(e) => setDinerTag(e.target.value)}
                      placeholder="e.g. Heritage Landmark, Seaside Eatery"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={dinerAddress}
                    onChange={(e) => setDinerAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                  />
                </div>

                {/* Diner Photo with Instant Save & Compression */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1E1B18]">
                      Diner Photo (Upload from Device or Paste Link)
                    </label>
                    {isPhotoOptimizing && (
                      <span className="text-[11px] text-[#BF360C] font-bold flex items-center gap-1 animate-pulse">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Compressing & Saving...</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={dinerPhoto}
                      alt="Diner preview"
                      className="w-20 h-16 object-cover rounded-lg border border-[#DCD3C7] shrink-0 bg-white"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={dinerPhoto}
                          onChange={(e) => setDinerPhoto(e.target.value)}
                          placeholder="Paste image link..."
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (curDiner && dinerPhoto) {
                              onSaveDiner({ ...curDiner, photo: dinerPhoto });
                              notifySaved(`✓ Photo for diner "${curDiner.name}" saved!`);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg transition-colors shrink-0 shadow-2xs"
                        >
                          Save Photo
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#F0E6D8] border border-[#DCD3C7] rounded-md transition-colors">
                          <Upload className="w-3 h-3 text-[#BF360C]" />
                          <span>{isPhotoOptimizing ? 'Optimizing...' : 'Upload Photo File (Auto-Saves)'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isPhotoOptimizing}
                            onChange={(e) =>
                              handleImageUpload(e, 'diner', setDinerPhoto, (url) => {
                                if (curDiner) onSaveDiner({ ...curDiner, photo: url });
                              })
                            }
                          />
                        </label>
                        <span className="text-[10px] text-[#8C7D6D]">
                          Auto-compressed & saved immediately
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Price Level</label>
                    <select
                      value={dinerPriceLevel}
                      onChange={(e) => setDinerPriceLevel(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none"
                    >
                      <option value="₱">₱ (Budget Friendly)</option>
                      <option value="₱₱">₱₱ (Moderate)</option>
                      <option value="₱₱₱">₱₱₱ (Premium Dining)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Average Star Rating (1-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={dinerRating}
                      onChange={(e) => setDinerRating(parseFloat(e.target.value) || 5)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-sm"
                >
                  Save Diner Details
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: TRAVEL SPOTS */}
          {activeTab === 'spots' && (
            <form onSubmit={handleSaveSpot} className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-[#1E1B18]">Select Travel Destination:</label>
                  <select
                    value={curSpotId}
                    onChange={(e) => setCurSpotId(e.target.value)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-[#DCD3C7] rounded-lg text-[#1E1B18] outline-none"
                  >
                    {travelSpots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddNewSpot}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg flex items-center gap-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Destination</span>
                  </button>

                  {travelSpots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete travel spot "${curSpot.name}"?`)) {
                          onDeleteTravelSpot(curSpot.id);
                          setCurSpotId(travelSpots.find((s) => s.id !== curSpot.id)?.id || '');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                      title="Delete this travel spot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Spot Name *</label>
                    <input
                      type="text"
                      required
                      value={spotName}
                      onChange={(e) => setSpotName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Province *</label>
                    <select
                      value={spotProvince}
                      onChange={(e) => setSpotProvince(e.target.value as Province)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none"
                    >
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Location / Municipality</label>
                    <input
                      type="text"
                      value={spotLocation}
                      onChange={(e) => setSpotLocation(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">Spot Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={spotDescription}
                    onChange={(e) => setSpotDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Culinary Connection / Pairing</label>
                    <input
                      type="text"
                      value={spotCulinaryConnection}
                      onChange={(e) => setSpotCulinaryConnection(e.target.value)}
                      placeholder="e.g. Savor batchoy at nearby La Paz Market stalls"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Fun Fact</label>
                    <input
                      type="text"
                      value={spotFunFact}
                      onChange={(e) => setSpotFunFact(e.target.value)}
                      placeholder="Cultural trivia or historical fact..."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                {/* Spot Photo with Instant Save & Compression */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1E1B18]">
                      Spot Photo (Upload from Device or Paste Link)
                    </label>
                    {isPhotoOptimizing && (
                      <span className="text-[11px] text-[#BF360C] font-bold flex items-center gap-1 animate-pulse">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Compressing & Saving...</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={spotPhoto}
                      alt="Spot preview"
                      className="w-20 h-16 object-cover rounded-lg border border-[#DCD3C7] shrink-0 bg-white"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={spotPhoto}
                          onChange={(e) => setSpotPhoto(e.target.value)}
                          placeholder="Paste image link..."
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (curSpot && spotPhoto) {
                              onSaveTravelSpot({ ...curSpot, photo: spotPhoto });
                              notifySaved(`✓ Photo for "${curSpot.name}" saved!`);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg transition-colors shrink-0 shadow-2xs"
                        >
                          Save Photo
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#F0E6D8] border border-[#DCD3C7] rounded-md transition-colors">
                          <Upload className="w-3 h-3 text-[#BF360C]" />
                          <span>{isPhotoOptimizing ? 'Optimizing...' : 'Upload Photo File (Auto-Saves)'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isPhotoOptimizing}
                            onChange={(e) =>
                              handleImageUpload(e, 'spot', setSpotPhoto, (url) => {
                                if (curSpot) onSaveTravelSpot({ ...curSpot, photo: url });
                              })
                            }
                          />
                        </label>
                        <span className="text-[10px] text-[#8C7D6D]">
                          Auto-compressed & saved immediately
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">Traveler Tip</label>
                  <input
                    type="text"
                    value={spotTravelTip}
                    onChange={(e) => setSpotTravelTip(e.target.value)}
                    placeholder="e.g. Best visited during sunset hours..."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-sm"
                >
                  Save Travel Spot
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: REFERENCES & PHOTO CREDITS */}
          {activeTab === 'references' && (
            <form onSubmit={handleSaveReference} className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-[#1E1B18]">Select Reference Entry:</label>
                  <select
                    value={curRefId}
                    onChange={(e) => setCurRefId(e.target.value)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-[#DCD3C7] rounded-lg text-[#1E1B18] outline-none"
                  >
                    {references.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddNewReference}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#083528] rounded-lg flex items-center gap-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Reference</span>
                  </button>

                  {references.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete reference "${curRef.title}"?`)) {
                          onDeleteReference(curRef.id);
                          setCurRefId(references.find((r) => r.id !== curRef.id)?.id || '');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                      title="Delete this reference"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                      Reference / Credit Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={refTitle}
                      onChange={(e) => setRefTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Category *</label>
                    <select
                      value={refCategory}
                      onChange={(e) => setRefCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none"
                    >
                      <option value="Official Tourism Portal">Official Tourism Portal</option>
                      <option value="Culinary Lore & History">Culinary Lore & History</option>
                      <option value="Photo Credit & Imagery">Photo Credit & Imagery</option>
                      <option value="Heritage Documentation">Heritage Documentation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Author / Source *</label>
                    <input
                      type="text"
                      required
                      value={refAuthor}
                      onChange={(e) => setRefAuthor(e.target.value)}
                      placeholder="e.g. Department of Tourism (DOT) Region VI"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Year / Date</label>
                    <input
                      type="text"
                      value={refYear}
                      onChange={(e) => setRefYear(e.target.value)}
                      placeholder="e.g. 2024–2026"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433A] mb-1">Citation Description</label>
                  <textarea
                    rows={3}
                    value={refDescription}
                    onChange={(e) => setRefDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Link Display Text</label>
                    <input
                      type="text"
                      value={refLinkText}
                      onChange={(e) => setRefLinkText(e.target.value)}
                      placeholder="e.g. visitwesternvisayas.com / Tourism Archive"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433A] mb-1">Destination Web Link (URL)</label>
                    <input
                      type="url"
                      value={refUrl}
                      onChange={(e) => setRefUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-sm"
                >
                  Save Reference Credit
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3.5 bg-[#FCFAF7] border-t border-[#E8DDCF] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetAll}
            className="text-xs font-semibold text-[#BF360C] hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All to Original Western Visayas Data</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1E1B18] hover:bg-black rounded-lg transition-colors"
          >
            Close Customizer
          </button>
        </div>
      </div>
    </div>
  );
};
