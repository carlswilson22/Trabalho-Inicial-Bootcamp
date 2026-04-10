/**
 * Valida o nome do medicamento.
 * @param {string} name
 * @returns {{ valid: boolean, message?: string }}
 */
function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, message: 'O nome do medicamento é obrigatório.' };
  }
  if (name.trim().length < 2) {
    return { valid: false, message: 'O nome deve ter pelo menos 2 caracteres.' };
  }
  return { valid: true };
}

/**
 * Valida a dose do medicamento.
 * @param {string} dose
 * @returns {{ valid: boolean, message?: string }}
 */
function validateDose(dose) {
  if (!dose || typeof dose !== 'string' || dose.trim().length === 0) {
    return { valid: false, message: 'A dose do medicamento é obrigatória.' };
  }
  if (dose.trim().startsWith('-')) {
    return { valid: false, message: 'A dose não pode ser negativa.' };
  }
  return { valid: true };
}

/**
 * Valida o horário no formato HH:MM.
 * @param {string} time
 * @returns {{ valid: boolean, message?: string }}
 */
function validateTime(time) {
  if (!time || typeof time !== 'string') {
    return { valid: false, message: 'O horário é obrigatório.' };
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time.trim())) {
    return {
      valid: false,
      message: 'O horário deve estar no formato HH:MM (ex: 08:00, 14:30).',
    };
  }
  return { valid: true };
}

/**
 * Valida todos os campos de um medicamento.
 * @param {Object} params — { name, dose, time }
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateMedication({ name, dose, time }) {
  const errors = [];

  const nameResult = validateName(name);
  if (!nameResult.valid) errors.push(nameResult.message);

  const doseResult = validateDose(dose);
  if (!doseResult.valid) errors.push(doseResult.message);

  const timeResult = validateTime(time);
  if (!timeResult.valid) errors.push(timeResult.message);

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateName,
  validateDose,
  validateTime,
  validateMedication,
};
