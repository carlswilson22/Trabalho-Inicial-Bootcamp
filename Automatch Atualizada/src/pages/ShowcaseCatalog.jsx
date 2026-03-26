import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StoreIdentifier from '../components/ui/StoreIdentifier';
import { stores } from '../data/inventoryData';
import { useAuth } from '../contexts/AuthContext';
import {
  ShieldCheck, Search, ChevronRight, Calendar, Gauge, Palette,
  MapPin, Heart, Eye, Zap, Filter, ArrowLeft, SlidersHorizontal,
  Car, Truck, Battery, ChevronDown, X, Star, RotateCcw, Tag, UserPlus, LogIn
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────
const showcaseCars = [
  {
    id: 'sc-001', name: 'Honda Civic Touring', brand: 'Honda', year: 2023,
    price: 165000, color: 'Branco Perola', mileage: 18500, storeId: 'store-1',
    image: '/image/FotoHondaCivic.jpeg',
    bodyType: 'Sedã',
    icon: Car, featured: true, seller: 'Automatch Premium', location: 'São Paulo, SP',
    description: 'Sedã premium com motor 1.5 turbo de 173cv, câmbio CVT, teto solar, bancos em couro e central multimídia de 9" com wireless Apple CarPlay.',
    tags: ['1.5 Turbo', 'Teto Solar', 'Couro'],
  },
  {
    id: 'sc-002', name: 'Jeep Compass Limited', brand: 'Jeep', year: 2023,
    price: 189900, color: 'Preto Fosco', mileage: 22000, storeId: 'store-1',
    image: 'data:image/jpeg;base64,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', bodyType: 'SUV',
    icon: Car, featured: false, seller: 'Automatch Select', location: 'Rio de Janeiro, RJ',
    description: 'SUV com motor 1.3 turbo flex de 185cv, câmbio automático de 6 marchas, tração 4x4, teto panorâmico e câmera 360°.',
    tags: ['4x4', 'Teto Panorâmico', 'Turbo Flex'],
  },
  {
    id: 'sc-003', name: 'Volkswagen Golf GTI', brand: 'Volkswagen', year: 2022,
    price: 215000, color: 'Branco Perola', mileage: 12300, storeId: 'store-1',
    image: '/images/FotoGolfGTI.jpe', bodyType: 'Hatch',
    icon: Car, featured: true, seller: 'Automatch Sport', location: 'Belo Horizonte, MG',
    description: 'Hatch esportivo com motor 2.0 TSI de 230cv, câmbio DSG de 6 marchas, suspensão esportiva e Cockpit Digital de 10.25".',
    tags: ['2.0 TSI 230cv', 'DSG', 'Cockpit Digital'],
  },
  {
    id: 'sc-004', name: 'Toyota Hilux SRX', brand: 'Toyota', year: 2022,
    price: 285000, color: 'Branco Pérola', mileage: 38000, storeId: 'store-1',
    image: '/images/FotoNovaHilux.jpeg',
    icon: Truck, featured: false, seller: 'Automatch Work', location: 'Curitiba, PR',
    description: 'Picape com motor 2.8 diesel de 204cv e 500 Nm, tração 4x4 com reduzida, cabine dupla e Toyota Safety Sense.',
    tags: ['Diesel 2.8', '4x4 Reduzida', 'Safety Sense'],
  },
  {
    id: 'sc-005', name: 'Tesla Model 3', brand: 'Tesla', year: 2024,
    price: 289000, color: 'Cinza Grafite', mileage: 5200, storeId: 'store-3',
    image: '/images/FotoTeslaModel3.jpeg', bodyType: 'Elétrico',
    icon: Battery, featured: true, seller: 'Automatch Green', location: 'São Paulo, SP',
    description: 'Sedã 100% elétrico com motor de 283cv, autonomia de 510 km (WLTP), Supercharger e Autopilot de nível 2.',
    tags: ['Elétrico 283cv', '510 km Autonomia', 'Autopilot'],
  },
  {
    id: 'sc-006', name: 'Toyota Corolla Cross XRX', brand: 'Toyota', year: 2024,
    price: 195000, color: 'Prata Supernova', mileage: 8700,
    image: '/cars/orion_suv_x7.png', bodyType: 'SUV',
    icon: Car, featured: true, seller: 'Automatch Premium', location: 'Brasília, DF',
    description: 'SUV Híbrido com motor 1.8 de 122cv + elétrico, câmbio CVT e consumo de 18,9 km/l na cidade. Painel digital 12.3".',
    tags: ['Híbrido', 'CVT', '18.9 km/l'],
  },
  {
    id: 'sc-007', name: 'BMW 320i M Sport', brand: 'BMW', year: 2022,
    price: 265000, color: 'Preto Safira', mileage: 22000,
    image: '/cars/falcon_gt_3000.png', bodyType: 'Sedã',
    icon: Car, featured: false, seller: 'Automatch Luxury', location: 'São Paulo, SP',
    description: 'Sedã premium com motor 2.0 TwinPower Turbo de 184cv, câmbio automático de 8 marchas e pacote M Sport de fábrica.',
    tags: ['2.0 Turbo', 'M Sport', 'Automática 8M'],
  },
  {
    id: 'sc-008', name: 'Hyundai HB20S Platinum Plus', brand: 'Hyundai', year: 2024,
    price: 105900, color: 'Branco Polar', mileage: 4500,
    image: '/cars/falcon_gt_3000.png', bodyType: 'Sedã',
    icon: Car, featured: false, seller: 'Automatch Easy', location: 'Campinas, SP',
    description: 'Sedã compacto com motor 1.0 turbo de 120cv, câmbio automático de 6 marchas, carregamento wireless e tela de 8".',
    tags: ['1.0 Turbo', 'Automático', 'Wireless'],
  },
  {
    id: 'sc-009', name: 'Chevrolet Tracker Premier', brand: 'Chevrolet', year: 2023,
    price: 149900, color: 'Cinza Satin Steel', mileage: 19800,
    image: '/cars/orion_suv_x7.png', bodyType: 'SUV',
    icon: Car, featured: false, seller: 'Automatch Select', location: 'Porto Alegre, RS',
    description: 'SUV compacto com motor 1.2 turbo de 133cv, câmbio automático de 6 marchas, teto solar e Wi-Fi nativo.',
    tags: ['1.2 Turbo', 'Teto Solar', 'Wi-Fi'],
  },
  {
    id: 'sc-010', name: 'Fiat Pulse Abarth', brand: 'Fiat', year: 2023,
    price: 134900, color: 'Vermelho Abarth', mileage: 15600,
    image: '/cars/solaris_compact.png', bodyType: 'Hatch',
    icon: Car, featured: false, seller: 'Automatch Sport', location: 'São Paulo, SP',
    description: 'Hatch esportivo com motor 1.3 turbo de 185cv, câmbio CVT com 7 marchas simuladas, suspensão rebaixada e escapamento esportivo.',
    tags: ['1.3 Turbo 185cv', 'Abarth', 'CVT'],
  },
  {
    id: 'sc-011', name: 'Volkswagen Nivus Highline', brand: 'Volkswagen', year: 2023,
    price: 119900, color: 'Azul Biscay', mileage: 28000,
    image: '/cars/orion_suv_x7.png', bodyType: 'SUV',
    icon: Car, featured: false, seller: 'Automatch Easy', location: 'Florianópolis, SC',
    description: 'SUV Coupé com motor 1.0 TSI de 116cv, câmbio automático de 6 marchas, painel digital e IQ.Drive de série.',
    tags: ['1.0 TSI', 'SUV Coupé', 'IQ.Drive'],
  },
  {
    id: 'sc-012', name: 'Ford Ranger Limited', brand: 'Ford', year: 2024,
    price: 315000, color: 'Cinza Carbonizado', mileage: 9800,
    image: '/cars/titan_pickup_pro.png', bodyType: 'Pickup',
    icon: Truck, featured: true, seller: 'Automatch Work', location: 'Goiânia, GO',
    description: 'Picape com motor 3.0 V6 diesel de 250cv, câmbio automático de 10 marchas, tração 4x4 e tela SYNC 4 de 12".',
    tags: ['V6 Diesel 250cv', '10 Marchas', 'SYNC 4'],
  },
  {
    id: 'sc-013', name: 'BYD Dolphin GS', brand: 'BYD', year: 2024,
    price: 149800, color: 'Azul Coral', mileage: 3200,
    image: '/cars/nebula_electric.png', bodyType: 'Elétrico',
    icon: Battery, featured: false, seller: 'Automatch Green', location: 'São Paulo, SP',
    description: 'Hatch 100% elétrico com motor de 177cv, autonomia de 401 km, carregamento rápido e tela rotativa de 12.8".',
    tags: ['Elétrico 177cv', '401 km', 'Tela Rotativa'],
  },
  {
    id: 'sc-014', name: 'Nissan Kicks Exclusive', brand: 'Nissan', year: 2023,
    price: 132000, color: 'Laranja Monarch', mileage: 16500,
    image: '/cars/solaris_compact.png', bodyType: 'Hatch',
    icon: Car, featured: false, seller: 'Automatch Select', location: 'Recife, PE',
    description: 'Crossover com motor 1.6 de 114cv, câmbio CVT, central multimídia de 8" e frenagem autônoma de emergência.',
    tags: ['1.6 CVT', 'Frenagem Autônoma', 'Multimídia 8"'],
  },
  {
    id: 'sc-015', name: 'Mercedes-Benz A 200 Sedan', brand: 'Mercedes-Benz', year: 2022,
    price: 245000, color: 'Branco Digital', mileage: 20500,
    image: '/cars/falcon_gt_3000.png', bodyType: 'Sedã',
    icon: Car, featured: false, seller: 'Automatch Luxury', location: 'São Paulo, SP',
    description: 'Sedã de luxo com motor 1.3 turbo de 163cv, câmbio DCT de 7 marchas, sistema MBUX com comando de voz e faróis full LED.',
    tags: ['1.3 Turbo', 'MBUX', 'DCT 7M'],
  },
];

const BRANDS = ['Todas', ...new Set(showcaseCars.map(c => c.brand))];
const BODY_TYPES = ['Todos', 'Sedã', 'SUV', 'Hatch', 'Pickup', 'Elétrico'];
const YEAR_OPTIONS = ['Todos', '2024', '2023', '2022', '2021', '2020'];
const KM_RANGES = [
  { label: 'Qualquer', max: Infinity },
  { label: 'Até 10.000 km', max: 10000 },
  { label: 'Até 30.000 km', max: 30000 },
  { label: 'Até 50.000 km', max: 50000 },
];
const PRICE_RANGES = [
  { label: 'Qualquer', min: 0, max: Infinity },
  { label: 'Até R$ 80.000', min: 0, max: 80000 },
  { label: 'R$ 80.000 – R$ 150.000', min: 80000, max: 150000 },
  { label: 'R$ 150.000 – R$ 200.000', min: 150000, max: 200000 },
  { label: 'Acima de R$ 200.000', min: 200000, max: Infinity },
];

// ─── CAR CARD ────────────────────────────────────────────────────────────────
const CarCard = ({ car, index, viewMode }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // ── LIST VIEW ──
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.06 }}
        className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col md:flex-row"
        onClick={() => navigate(`/encontrar/${car.id}`)}
      >
        <div className="relative w-full md:w-80 aspect-[16/10] md:aspect-auto shrink-0 overflow-hidden bg-slate-100">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {car.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" /> Destaque
            </div>
          )}
          <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md z-10">
            <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
          </button>
          
          {/* Store Branding */}
          <div className="absolute top-3 left-3 z-20">
            <StoreIdentifier storeId={car.storeId} variant="badge" />
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{car.name}</h3>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5"><car.icon className="w-3.5 h-3.5" /> {car.bodyType}</p>
            </div>
            <p className="text-2xl font-black text-brand-blue whitespace-nowrap">R$ {car.price.toLocaleString('pt-BR')}</p>
          </div>
          <div className="flex gap-4 my-3 text-xs text-slate-500 font-medium flex-wrap">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {car.year}</span>
            <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {car.mileage.toLocaleString('pt-BR')} km</span>
            <span className="flex items-center gap-1"><Palette className="w-3.5 h-3.5" /> {car.color}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {car.location}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{car.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {car.tags.map(t => <span key={t} className="text-[10px] font-bold text-brand-blue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{t}</span>)}
          </div>
        </div>
      </motion.div>
    );
  }

  // ── GRID VIEW ──
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
      onClick={() => navigate(`/encontrar/${car.id}`)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {car.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" /> Destaque
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-10">
          <p className="text-2xl font-black text-white drop-shadow-md">R$ {car.price.toLocaleString('pt-BR')}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md z-10">
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
        </button>

        {/* Store Branding */}
        <div className="absolute top-3 left-3 z-20">
          <StoreIdentifier storeId={car.storeId} variant="badge" />
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 leading-tight">{car.name}</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1 mb-3"><car.icon className="w-3.5 h-3.5" /> {car.bodyType}</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { icon: Calendar, val: car.year },
            { icon: Gauge, val: `${car.mileage.toLocaleString('pt-BR')} km` },
            { icon: Palette, val: car.color },
          ].map((s, i) => (
            <div key={i} className="bg-slate-50 rounded-lg px-2 py-1.5 text-center border border-slate-100">
              <s.icon className="w-3.5 h-3.5 text-slate-400 mx-auto mb-0.5" />
              <p className="text-[11px] font-bold text-slate-700 truncate">{s.val}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">{car.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto mb-3">
          {car.tags.map(t => <span key={t} className="text-[10px] font-bold text-brand-blue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{t}</span>)}
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mb-3 border-t border-slate-100 pt-2">
          <span>{car.seller}</span>
          <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {car.location}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/encontrar/${car.id}`); }} className="flex-1 py-2.5 bg-brand-blue text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
            <Eye className="w-4 h-4" /> Ver Detalhes
          </button>
          <button className="py-2.5 px-3 bg-slate-100 text-slate-600 rounded-xl text-sm hover:bg-slate-200 transition-colors" onClick={e => e.stopPropagation()}>
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── FILTER CHIP (for active filters) ────────────────────────────────────────
const FilterChip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-blue/20">
    {label}
    <button onClick={onRemove} className="hover:bg-brand-blue/20 rounded-full p-0.5 transition-colors"><X className="w-3 h-3" /></button>
  </span>
);

// ─── FILTER SELECT ───────────────────────────────────────────────────────────
const FilterSelect = ({ label, icon: Icon, value, onChange, options }) => (
  <div>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" /> {label}
    </label>
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue focus:outline-none cursor-pointer pr-8 transition-all">
        {options.map(o => {
          if (typeof o === 'string') return <option key={o} value={o}>{o}</option>;
          return <option key={o.value !== undefined ? o.value : o.label} value={o.value !== undefined ? o.value : o.label}>{o.label}</option>;
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
    </div>
  </div>
);

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
const ShowcaseCatalog = () => {
  const catalogRef = useRef(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [searchParams] = useSearchParams();
  const urlStoreId = searchParams.get('store');
  const [filterStore, setFilterStore] = useState(urlStoreId || 'Todas');
  const [filterBrand, setFilterBrand] = useState('Todas');
  const [filterType, setFilterType] = useState('Todos');
  const [filterYear, setFilterYear] = useState('Todos');
  const [filterPrice, setFilterPrice] = useState('Qualquer');
  const [filterKm, setFilterKm] = useState('Qualquer');

  useEffect(() => {
    if (urlStoreId) {
      setFilterStore(urlStoreId);
    }
  }, [urlStoreId]);

  const activeFilterCount = [filterStore !== 'Todas', filterBrand !== 'Todas', filterType !== 'Todos', filterYear !== 'Todos', filterPrice !== 'Qualquer', filterKm !== 'Qualquer'].filter(Boolean).length;

  const resetFilters = () => {
    setFilterStore('Todas');
    setFilterBrand('Todas'); 
    setFilterType('Todos'); 
    setFilterYear('Todos');
    setFilterPrice('Qualquer'); 
    setFilterKm('Qualquer'); 
    setSearchQuery('');
  };

  const results = useMemo(() => {
    let cars = showcaseCars;

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cars = cars.filter(c => `${c.name} ${c.bodyType} ${c.color} ${c.brand}`.toLowerCase().includes(q));
    }
    // Store Filter
    if (filterStore !== 'Todas') cars = cars.filter(c => c.storeId === filterStore);

    // Brand
    if (filterBrand !== 'Todas') cars = cars.filter(c => c.brand === filterBrand);
    // Type
    if (filterType !== 'Todos') cars = cars.filter(c => c.bodyType === filterType);
    // Year
    if (filterYear !== 'Todos') cars = cars.filter(c => c.year === parseInt(filterYear));
    // Price
    const priceRange = PRICE_RANGES.find(r => r.label === filterPrice);
    if (priceRange) cars = cars.filter(c => c.price >= priceRange.min && c.price <= priceRange.max);
    // KM
    const kmRange = KM_RANGES.find(r => r.label === filterKm);
    if (kmRange) cars = cars.filter(c => c.mileage <= kmRange.max);

    // Sort
    return [...cars].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'km') return a.mileage - b.mileage;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, filterStore, filterBrand, filterType, filterYear, filterPrice, filterKm, sortBy]);

  // ── Filter Sidebar content (reused for desktop & mobile drawer) ──
  const FilterPanel = () => (
    <div className="space-y-5">
      <FilterSelect label="Loja" icon={MapPin} value={filterStore} onChange={setFilterStore} options={['Todas', ...stores.map(s => ({ label: s.name, value: s.id }))]} />
      <FilterSelect label="Marca" icon={Tag} value={filterBrand} onChange={setFilterBrand} options={BRANDS} />
      <FilterSelect label="Tipo de Veículo" icon={Car} value={filterType} onChange={setFilterType} options={BODY_TYPES} />
      <FilterSelect label="Ano" icon={Calendar} value={filterYear} onChange={setFilterYear} options={YEAR_OPTIONS} />
      <FilterSelect label="Faixa de Preço" icon={Tag} value={filterPrice} onChange={setFilterPrice} options={PRICE_RANGES} />
      <FilterSelect label="Quilometragem" icon={Gauge} value={filterKm} onChange={setFilterKm} options={KM_RANGES} />

      {activeFilterCount > 0 && (
        <button onClick={resetFilters}
          className="w-full mt-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-red-500 py-2 rounded-xl border border-slate-200 hover:border-red-200 transition-colors">
          <RotateCcw className="w-4 h-4" /> Limpar Filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* ── Header ── */}
      <nav className="w-full px-4 sm:px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/')}>
            <ShieldCheck className="w-7 h-7 text-brand-blue" />
            <span className="text-lg font-black tracking-tight text-brand-navy hidden sm:block">AUTOMATCH</span>
          </div>
          <div className="flex-1 max-w-lg mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, tipo ou cor..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue focus:outline-none transition-all" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button 
                onClick={() => navigate('/perfil')} 
                className="flex items-center gap-2.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-full hover:bg-white transition-all group pr-3"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 group-hover:border-brand-blue transition-colors">
                  <img 
                    src={user.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 hidden sm:block truncate max-w-[100px]">
                  {user.name}
                </span>
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-brand-blue font-semibold text-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Entrar</span>
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-full font-bold text-xs transition-all shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Cadastrar</span>
                </button>
              </>
            )}

            {/* Mobile filter toggle */}
            <button onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden p-2.5 bg-slate-100 rounded-xl relative shrink-0">
              <Filter className="w-5 h-5 text-slate-600" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-brand-navy font-bold">
              <Filter className="w-5 h-5" />
              <h2>Filtros</h2>
              {activeFilterCount > 0 && (
                <span className="ml-auto bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{activeFilterCount}</span>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* ── Mobile Filter Drawer ── */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={() => setMobileFiltersOpen(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl p-6 overflow-y-auto md:hidden">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Filter className="w-5 h-5" /> Filtros</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                </div>
                <FilterPanel />
                <button onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-6 bg-brand-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
                  Ver {results.length} Resultados
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          {/* Title bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2 border border-brand-blue/20">
                <Zap className="w-3 h-3" /> Vitrine Digital
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800">Encontre Seu Carro</h1>
              <p className="text-slate-500 text-sm mt-1">{results.length} veículo{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue focus:outline-none cursor-pointer">
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="year">Mais Novo</option>
                  <option value="km">Menor KM</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl flex overflow-hidden">
                <button onClick={() => setViewMode('grid')}
                  className={`px-3 py-2.5 text-sm transition-colors ${viewMode === 'grid' ? 'bg-brand-blue text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                  <SlidersHorizontal className="w-4 h-4 rotate-90" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`px-3 py-2.5 text-sm transition-colors ${viewMode === 'list' ? 'bg-brand-blue text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {filterBrand !== 'Todas' && <FilterChip label={`Marca: ${filterBrand}`} onRemove={() => setFilterBrand('Todas')} />}
              {filterType !== 'Todos' && <FilterChip label={`Tipo: ${filterType}`} onRemove={() => setFilterType('Todos')} />}
              {filterYear !== 'Todos' && <FilterChip label={`Ano: ${filterYear}`} onRemove={() => setFilterYear('Todos')} />}
              {filterPrice !== 'Qualquer' && <FilterChip label={filterPrice} onRemove={() => setFilterPrice('Qualquer')} />}
              {filterKm !== 'Qualquer' && <FilterChip label={filterKm} onRemove={() => setFilterKm('Qualquer')} />}
              <button onClick={resetFilters} className="text-xs text-red-500 font-medium hover:underline ml-1">Limpar todos</button>
            </div>
          )}

          {/* Results */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((c, i) => <CarCard key={c.id} car={c} index={i} viewMode="grid" />)}
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-5">
                {results.map((c, i) => <CarCard key={c.id} car={c} index={i} viewMode="list" />)}
              </motion.div>
            )}
          </AnimatePresence>

          {results.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-slate-500">
              <Search className="w-12 h-12 mb-4 text-slate-300" />
              <p className="text-lg font-medium text-slate-600">Nenhum veículo encontrado.</p>
              <p className="text-sm mt-1">Tente ajustar seus filtros de busca.</p>
              <button onClick={resetFilters}
                className="mt-4 text-brand-blue font-semibold text-sm hover:underline flex items-center gap-1">
                <RotateCcw className="w-4 h-4" /> Limpar filtros
              </button>
            </div>
          )}


        </main>
      </div>
    </div>
  );
};

export default ShowcaseCatalog;
