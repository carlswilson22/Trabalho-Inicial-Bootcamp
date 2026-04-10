const fs = require('fs');
const path = require('path');

// Mock do caminho do ficheiro de dados para testes
const mockTestDataFile = path.join(__dirname, '..', '..', 'test-data.json');

// Antes de cada teste, limpar o ficheiro
beforeEach(() => {
  if (fs.existsSync(mockTestDataFile)) {
    fs.unlinkSync(mockTestDataFile);
  }

  // Override do caminho do ficheiro de dados
  jest.resetModules();
  jest.mock('../../src/storage/jsonStorage', () => {
    const originalFs = require('fs');
    return {
      readAll: () => {
        try {
          if (!originalFs.existsSync(mockTestDataFile)) return [];
          const raw = originalFs.readFileSync(mockTestDataFile, 'utf-8');
          return JSON.parse(raw);
        } catch {
          return [];
        }
      },
      writeAll: (data) => {
        originalFs.writeFileSync(mockTestDataFile, JSON.stringify(data, null, 2), 'utf-8');
      },
    };
  });
});

// Após todos os testes, limpar
afterAll(() => {
  if (fs.existsSync(mockTestDataFile)) {
    fs.unlinkSync(mockTestDataFile);
  }
});

describe('MedicationService (Requisitos de Negócio)', () => {
  it('Cenário 1 (Sucesso): Validar se um medicamento é inserido e lido corretamente', () => {
    const { addMedication, listMedications } = require('../../src/services/medicationService');

    // Inserir
    const med = addMedication({
      name: 'Aspirina',
      dose: '100mg',
      time: '14:00',
    });

    expect(med).toHaveProperty('id');
    expect(med.name).toBe('Aspirina');

    // Ler
    const list = listMedications();
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe(med.id);
    expect(list[0].name).toBe('Aspirina');
  });

  it('Cenário 3 (Limite): Validar o comportamento do sistema quando a lista de medicamentos está vazia', () => {
    const { listMedications } = require('../../src/services/medicationService');

    // A lista inicial deve estar vazia
    const list = listMedications();
    expect(Array.isArray(list)).toBe(true);
    expect(list).toHaveLength(0);
  });

  it('Deve remover um medicamento pelo ID corretamente', () => {
    const { addMedication, removeMedication, listMedications } = require('../../src/services/medicationService');

    const med = addMedication({ name: 'Remover', dose: '10mg', time: '10:00' });
    const removed = removeMedication(med.id);

    expect(removed).not.toBeNull();
    expect(removed.name).toBe('Remover');
    expect(listMedications()).toHaveLength(0);
  });
});
