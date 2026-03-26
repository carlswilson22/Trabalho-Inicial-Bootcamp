import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Search, ChevronRight, CheckCircle2, 
  Zap, LogIn, UserPlus, Heart, Calendar, 
  Gauge, Palette, Eye, MapPin 
} from 'lucide-react';

// CONTEXTOS E DADOS
import { useAuth } from '../contexts/AuthContext';
import { stores } from '../data/inventoryData';
import StoreIdentifier from '../components/ui/StoreIdentifier';

// SE O CARCARD ESTIVER EM OUTRO ARQUIVO, DESCOMENTE A LINHA ABAIXO:
// import CarCard from '../components/CarCard';

const showcaseCars = [
  {
    id: 'sc-001',
    name: 'Honda Civic Touring',
    year: 2023,
    price: 165000,
    color: 'Azul Metálico',
    mileage: '18.500 km',
    // ALTERAÇÃO AQUI:
    image: '/images/FotoHondaCivic.jpeg', 
    bodyType: 'Sedã',
    description: 'Sedã premium com motor 1.5 turbo de 173cv, câmbio CVT, teto solar e central multimídia 9".',
    tags: ['1.5 Turbo', 'Teto Solar', 'Couro'],
    featured: true,
    storeId: 'store-1',
  },
  {
    id: 'sc-002',
    name: 'Jeep Compass Limited',
    year: 2023,
    price: 189900,
    color: 'Preto Fosco',
    mileage: '22.000 km',
    image: '/images/FotoJeepCompassLimited.jpeg',
    bodyType: 'SUV',
    description: 'SUV com motor 1.3 turbo flex de 185cv, tração 4x4, teto panorâmico e câmera 360°.',
    tags: ['4x4', 'Teto Panorâmico', 'Turbo Flex'],
    featured: false,
    storeId: 'store-1',
  },
  {
    id: 'sc-003',
    name: 'Volkswagen Golf GTI',
    year: 2022,
    price: 215000,
    color: 'Branco Perola',
    mileage: '12.300 km',
    image: '/images/FotoGolfGTI.jpeg',
    bodyType: 'Hatch Esportivo',
    description: 'Hatch esportivo com motor 2.0 TSI de 230cv, câmbio DSG e Cockpit Digital de 10.25".',
    tags: ['2.0 TSI 230cv', 'DSG', 'Cockpit Digital'],
    featured: true,
    storeId: 'store-1',
  },
  {
    id: 'sc-004',
    name: 'Toyota Hilux SRX',
    year: 2022,
    price: 285000,
    color: 'Branco Pérola',
    mileage: '38.000 km',
    image: "/images/FotoNovaHilux.jpeg", // Verifique se a pasta public/images/ existe
    bodyType: 'Picape',
    description: 'Picape com motor 2.8 diesel de 204cv e 500 Nm, tração 4x4 com reduzida.',
    tags: ['Diesel 2.8', '4x4 Reduzida', 'Safety Sense'],
    featured: false,
    storeId: 'store-1',
  },
  {
    id: 'sc-005',
    name: 'Tesla Model 3',
    year: 2024,
    price: 289000,
    color: 'Cinza Grafite',
    mileage: '5.200 km',
    image: '/images/FotoTeslaModel3.jpeg',
    bodyType: '100% Elétrico',
    description: 'Sedã 100% elétrico com 283cv, autonomia de 510 km (WLTP) e Autopilot de série.',
    tags: ['Elétrico 283cv', '510 km Autonomia', 'Autopilot'],
    featured: true,
    storeId: 'store-1',
  },
];

const CarCard = ({ car, index }) => {
  const navigate = useNavigate();

  // Função para navegar evitando repetição de código
  const handleDetails = (e) => {
    e?.stopPropagation();
    navigate(`/encontrar/${car.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
      onClick={handleDetails}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy" // Melhoria de performance
        />
        
        {/* Badges - Organizados para não sobrepor */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
          <div className="flex flex-col gap-2">
            {/* Identificador da Loja */}
            <StoreIdentifier storeId={car.storeId} variant="badge" />
            
            {/* Featured Badge - Posicionado abaixo da loja se ambos existirem */}
            {car.featured && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg w-fit">
                ⭐ Destaque
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md group/heart"
            onClick={(e) => {
              e.stopPropagation();
              // Lógica de favorito aqui
            }}
          >
            <Heart className="w-4 h-4 text-slate-500 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all" />
          </button>
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
          <p className="text-2xl font-black text-white drop-shadow-md">
            R$ {Number(car.price).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
            {car.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">
            {car.bodyType}
          </p>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="bg-slate-50 rounded-lg px-1 py-2 text-center border border-slate-100 hover:bg-white hover:border-blue-200 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-700">{car.year}</p>
          </div>
          <div className="bg-slate-50 rounded-lg px-1 py-2 text-center border border-slate-100 hover:bg-white hover:border-blue-200 transition-colors">
            <Gauge className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-700 truncate">{car.mileage}</p>
          </div>
          <div className="bg-slate-50 rounded-lg px-1 py-2 text-center border border-slate-100 hover:bg-white hover:border-blue-200 transition-colors">
            <Palette className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-700 truncate">{car.color}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-snug mb-4 line-clamp-2 italic">
          "{car.description}"
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
          {car.tags?.map((tag) => (
            <span 
              key={`${car.id}-${tag}`} 
              className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handleDetails}
            className="flex-[4] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200"
          >
            <Eye className="w-4 h-4" />
            Detalhes
          </button>
          <button
            title="Localização"
            className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const catalogRef = useRef(null);
  const { user, isAuthenticated } = useAuth();

  // Função de Scroll Suave
  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <ShieldCheck className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black tracking-tight text-slate-900 uppercase italic">
              Automatch
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button 
                onClick={() => navigate('/perfil')} 
                className="flex items-center gap-3 px-2 py-1.5 rounded-full border border-slate-100 hover:bg-slate-50 transition-all group shadow-sm"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:ring-blue-300">
                  <img 
                    src={user?.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`} 
                    alt={user?.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-sm font-bold text-slate-700 pr-2 group-hover:text-blue-600">
                  {user?.name?.split(' ')[0] || 'Perfil'}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 font-semibold text-sm transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-100 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Cadastrar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900 flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
          <div className="absolute top-[30%] left-[-10%] w-[120%] h-[1px] bg-blue-500/30 rotate-[-15deg]"></div>
          <div className="absolute top-[60%] left-[-10%] w-[120%] h-[1px] bg-emerald-500/20 rotate-[10deg]"></div>
          <img
            src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-emerald-400 font-medium text-sm mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% dos carros com Laudo Cautelar e Histórico</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                O Match Perfeito,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Sem Surpresas.</span>
              </h1>
              <p className="text-xl text-slate-300 md:w-4/5 mb-10 leading-relaxed font-light">
                Esqueça o medo de comprar carro usado. A Automatch utiliza inteligência artificial e transparência radical para garantir que seu próximo carro seja exatamente o que você espera.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToCatalog}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-900/40"
                >
                  <Search className="w-5 h-5" />
                  Ver Vitrine Digital
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">
                  Como funciona?
                </button>
              </div>

              {/* Partners Section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-16"
              >
                <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-8">
                  Disponível nas melhores lojas
                </p>
                <div className="flex flex-wrap justify-start items-center gap-8 md:gap-12 opacity-70">
                  {stores?.slice(0, 4).map((store) => (
                    <div key={store.id} className="grayscale hover:grayscale-0 transition-all cursor-pointer">
                       <span className="text-white font-bold opacity-50 hover:opacity-100">{store.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== CATALOG SHOWCASE ====== */}
      <section ref={catalogRef} id="vitrine" className="bg-slate-100 py-16 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-blue-200">
              <Zap className="w-3.5 h-3.5" />
              Vitrine Digital Automatch
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
              Novos Anúncios e Destaques
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
              Anúncios verificados com transparência total. Cada veículo possui dossiê completo de procedência.
            </p>
          </motion.div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Aqui você mapeia seu array showcaseCars */}
            {typeof showcaseCars !== 'undefined' && showcaseCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 px-6 border-t">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureItem 
            icon={<ShieldCheck className="w-7 h-7" />}
            title="TrustScore™ Exclusivo"
            description="Cada veículo possui uma nota baseada em mais de 120 pontos de checagem técnica e estética."
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <FeatureItem 
            icon={<CheckCircle2 className="w-7 h-7" />}
            title="Dossiê de Procedência"
            description="Laudo cautelar, histórico de multas e leilão comparados com nossa vistoria técnica rigorosa."
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <FeatureItem 
            icon={<Search className="w-7 h-7" />}
            title="IA Damage Scanner"
            description="Nossa inteligência identifica danos na lataria por visão computacional e precifica reparos na hora."
            color="text-slate-700"
            bg="bg-slate-100"
          />
        </div>
      </section>
    </div>
  );
};

// Componente auxiliar para as Features
const FeatureItem = ({ icon, title, description, color, bg }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    className="group"
  >
    <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center ${color} mb-6 border border-black/5 shadow-sm group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-light">{description}</p>
  </motion.div>
);

export default Home;