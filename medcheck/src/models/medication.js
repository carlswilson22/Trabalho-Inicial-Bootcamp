const { randomUUID } = require('crypto');

/**
 * Cria um objecto de medicamento com todos os campos necessários.
 * @param {Object} params
 * @param {string} params.name  — Nome do medicamento
 * @param {string} params.dose  — Dose (ex: "500mg")
 * @param {string} params.time  — Horário no formato HH:MM
 * @returns {Object} Objecto do medicamento com ID único
 */
function createMedication({ name, dose, time }) {
  return {
    id: randomUUID(),
    name: name.trim(),
    dose: dose.trim(),
    time: time.trim(),
    active: true,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createMedication };
