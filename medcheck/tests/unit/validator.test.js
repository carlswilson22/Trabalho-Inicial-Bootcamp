const {
  validateName,
  validateDose,
  validateTime,
  validateMedication,
} = require('../../src/utils/validator');

describe('Validador', () => {
  describe('validateName', () => {
    it('deve aceitar nomes válidos', () => {
      expect(validateName('Paracetamol').valid).toBe(true);
      expect(validateName('Ibuprofeno 400').valid).toBe(true);
    });

    it('deve rejeitar nomes vazios', () => {
      expect(validateName('').valid).toBe(false);
      expect(validateName(null).valid).toBe(false);
      expect(validateName(undefined).valid).toBe(false);
    });

    it('deve rejeitar nomes com menos de 2 caracteres', () => {
      expect(validateName('A').valid).toBe(false);
    });
  });

  describe('validateDose', () => {
    it('deve aceitar doses válidas', () => {
      expect(validateDose('500mg').valid).toBe(true);
      expect(validateDose('1 comprimido').valid).toBe(true);
    });

    it('deve rejeitar doses vazias', () => {
      expect(validateDose('').valid).toBe(false);
      expect(validateDose(null).valid).toBe(false);
    });
  });

  describe('validateTime', () => {
    it('deve aceitar horários no formato HH:MM', () => {
      expect(validateTime('08:00').valid).toBe(true);
      expect(validateTime('14:30').valid).toBe(true);
      expect(validateTime('23:59').valid).toBe(true);
      expect(validateTime('00:00').valid).toBe(true);
    });

    it('deve rejeitar horários inválidos', () => {
      expect(validateTime('25:00').valid).toBe(false);
      expect(validateTime('08:60').valid).toBe(false);
      expect(validateTime('8:00').valid).toBe(false);
      expect(validateTime('abc').valid).toBe(false);
      expect(validateTime('').valid).toBe(false);
    });
  });

  describe('validateMedication', () => {
    it('deve validar um medicamento completo', () => {
      const result = validateMedication({
        name: 'Paracetamol',
        dose: '500mg',
        time: '08:00',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('Cenário 2 (Erro): Impedir a inserção de doses negativas ou nomes vazios', () => {
      const result = validateMedication({
        name: '', // Nome vazio
        dose: '-10mg', // Dose negativa
        time: 'abc', // Tempo inválido adicionado para cobrir todas as validações de erro
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
      
      // Confirma que a validação de dose rejeita valores negativos e a de nome rejeita vazios
      expect(validateName('').valid).toBe(false);
      expect(validateDose('-500mg').valid).toBe(false);
    });
  });
});
