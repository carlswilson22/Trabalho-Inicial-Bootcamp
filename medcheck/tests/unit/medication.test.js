const { createMedication } = require('../../src/models/medication');

describe('Modelo Medication', () => {
  it('deve criar um medicamento com todos os campos', () => {
    const med = createMedication({
      name: 'Paracetamol',
      dose: '500mg',
      time: '08:00',
    });

    expect(med).toHaveProperty('id');
    expect(med.name).toBe('Paracetamol');
    expect(med.dose).toBe('500mg');
    expect(med.time).toBe('08:00');
    expect(med.active).toBe(true);
    expect(med).toHaveProperty('createdAt');
  });

  it('deve gerar IDs únicos para cada medicamento', () => {
    const med1 = createMedication({ name: 'A', dose: '1mg', time: '08:00' });
    const med2 = createMedication({ name: 'B', dose: '2mg', time: '09:00' });

    expect(med1.id).not.toBe(med2.id);
  });

  it('deve fazer trim nos campos de texto', () => {
    const med = createMedication({
      name: '  Ibuprofeno  ',
      dose: '  400mg  ',
      time: '  20:00  ',
    });

    expect(med.name).toBe('Ibuprofeno');
    expect(med.dose).toBe('400mg');
    expect(med.time).toBe('20:00');
  });
});
