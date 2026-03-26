export const mockCars = [
  {
    id: 'auto-001',
    brand: 'Toyota',
    model: 'Corolla Altis Premium Hybrid',
    year: 2023,
    price: 165900,
    mileage: 18500,
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200',
    ],
    trustScore: 96,
    storeId: 'store-1',
    timeline: [
      { id: 't1', type: 'laudo', status: 'approved', title: 'Laudo Cautelar', description: 'Aprovado 100%. Nenhuma alteração estrutural.' },
      { id: 't2', type: 'leilao', status: 'approved', title: 'Histórico de Leilão', description: 'Não possui passagem por leilões.' },
      { id: 't3', type: 'debitos', status: 'attention', title: 'Multas e Débitos', description: 'IPVA quitado. 1 Autuação em processamento (R$ 130,16).' },
    ],
    opinions: {
      owner: {
        text: "Carro incrivelmente econômico. Faz 19km/L na cidade facilmente. Estou vendendo pois a família cresceu.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=100&h=100"
      },
      inspector: {
        text: "Mecânica híbrida impecável. Desgaste 0 nos freios (regenerativo). Há um leve raspado no para-choque relatado no Scan.",
        rating: 4.8,
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100"
      }
    },
    damagePoints: [
      { id: 'dmg-1', x: 80, y: 75, severity: 'low', description: 'Micro-risco na pintura', repairCost: 250 },
    ],
    metadata: {
      engine: '1.8 VVT-i Hybrid',
      transmission: 'CVT',
      bodyType: 'Sedan',
      fuel: 'Flex/Elétrico'
    }
  },
  {
    id: 'auto-002',
    brand: 'Volkswagen',
    model: 'Nivus Highline 200 TSI',
    year: 2022,
    price: 115900,
    mileage: 32000,
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=1200',
    ],
    trustScore: 88,
    storeId: 'store-1',
    timeline: [
      { id: 't1', type: 'laudo', status: 'approved', title: 'Laudo Cautelar', description: 'Aprovado com apontamento leve.' },
      { id: 't2', type: 'leilao', status: 'approved', title: 'Histórico de Leilão', description: 'Sem passagem.' },
      { id: 't3', type: 'debitos', status: 'approved', title: 'Multas e Débitos', description: 'Nada consta. 100% livre.' },
    ],
    opinions: {
      owner: {
        text: "Design absurdo e porta-malas excelente. Pegou uma chuva de granizo leve ano passado, mas fiz martelinho de ouro e ficou zerado.",
        rating: 4.5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100"
      },
      inspector: {
        text: "Inspeção constata repintura de capô com excelente padrão de qualidade. Veículo íntegro estruturalmente.",
        rating: 4.2,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100"
      }
    },
    damagePoints: [
      { id: 'dmg-1', x: 20, y: 30, severity: 'medium', description: 'Pequeno amassado na porta traseira', repairCost: 450 },
      { id: 'dmg-2', x: 45, y: 80, severity: 'low', description: 'Roda ralada na calçada', repairCost: 300 }
    ],
    metadata: {
      engine: '1.0 TSI',
      transmission: 'Automática 6M',
      bodyType: 'SUV Coupe',
      fuel: 'Flex'
    }
  },
  {
    id: 'auto-003',
    brand: 'Jeep',
    model: 'Compass Longitude',
    year: 2021,
    price: 128500,
    mileage: 68000,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    ],
    trustScore: 78,
    storeId: 'store-1',
    timeline: [
      { id: 't1', type: 'laudo', status: 'rejected', title: 'Laudo Cautelar', description: 'Identificado passagem por leilão.' },
      { id: 't2', type: 'leilao', status: 'danger', title: 'Histórico de Leilão', description: 'Leilão financeira (não batido).' },
      { id: 't3', type: 'debitos', status: 'approved', title: 'Multas e Débitos', description: 'Regularizado.' },
    ],
    opinions: {
      owner: {
        text: "Comprei de leilão de financeira, mas nunca me deu dor de cabeça. Mecânica forte e robusta.",
        rating: 4,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
      },
      inspector: {
        text: "Ao longo do nosso rigoroso processo, constatamos o histórico de leilão de frota, diminuindo a nota do TrustScore incisivamente.",
        rating: 3.5,
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100"
      }
    },
    damagePoints: [
      { id: 'dmg-1', x: 70, y: 20, severity: 'medium', description: 'Desgaste verniz no teto', repairCost: 1200 },
    ],
    metadata: {
      engine: '2.0 Tigershark',
      transmission: 'Automática 6M',
      bodyType: 'SUV',
      fuel: 'Flex'
    }
  },
  {
    id: 'auto-004',
    brand: 'Honda',
    model: 'Civic Touring 1.5 Turbo',
    year: 2020,
    price: 139900,
    mileage: 41000,
    images: [
      'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=1200',
    ],
    trustScore: 99,
    storeId: 'store-1',
    timeline: [
      { id: 't1', type: 'laudo', status: 'approved', title: 'Laudo Cautelar', description: 'Perfeito. 100% Pintura Original.' },
      { id: 't2', type: 'leilao', status: 'approved', title: 'Histórico de Leilão', description: 'Sem passagem.' },
      { id: 't3', type: 'debitos', status: 'approved', title: 'Multas e Débitos', description: 'Nada consta.' },
    ],
    opinions: {
      owner: {
        text: "O melhor carro que já tive. Potente, seguro e lindíssimo. Só usava gasolina Podium e nunca deixei tomar sol.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100"
      },
      inspector: {
        text: "Uma verdadeira joia rara no mercado de usados. O carro está em estado de zero KM. Revisões todas na concessionária.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100"
      }
    },
    damagePoints: [],
    metadata: {
      engine: '1.5 Turbo',
      transmission: 'CVT',
      bodyType: 'Sedan',
      fuel: 'Gasolina'
    }
  },
  {
    id: 'auto-005',
    brand: 'BMW',
    model: '320i M Sport',
    year: 2022,
    price: 265000,
    mileage: 22000,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    ],
    trustScore: 92,
    storeId: 'store-2',
    timeline: [
      { id: 't1', type: 'laudo', status: 'approved', title: 'Laudo Cautelar', description: 'Aprovado.' },
      { id: 't2', type: 'leilao', status: 'approved', title: 'Histórico de Leilão', description: 'Sem passagem.' },
      { id: 't3', type: 'debitos', status: 'attention', title: 'Multas e Débitos', description: 'Débitos de IPVA recém cobrado.' },
    ],
    opinions: {
      owner: {
        text: "A pegada esportiva desse carro (tração traseira) é algo surreal. Foi um hobby de final de semana.",
        rating: 4.8,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100"
      },
      inspector: {
        text: "Verificada necessidade de troca próxima das pastilhas de freio dianteiras. De resto, pura diversão alemã.",
        rating: 4.5,
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100"
      }
    },
    damagePoints: [
      { id: 'dmg-1', x: 10, y: 90, severity: 'low', description: 'Raspado spoiler inferior em valeta', repairCost: 800 },
    ],
    metadata: {
      engine: '2.0 TwinPower Turbo',
      transmission: 'Automática 8M',
      bodyType: 'Sedan',
      fuel: 'Flex'
    }
  }
];
