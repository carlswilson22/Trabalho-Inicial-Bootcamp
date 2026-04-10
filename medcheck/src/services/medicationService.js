const { readAll, writeAll } = require('../storage/jsonStorage');
const { createMedication } = require('../models/medication');

/**
 * Adiciona um novo medicamento ao armazenamento.
 * @param {Object} params — { name, dose, time }
 * @returns {Object} O medicamento criado
 */
function addMedication({ name, dose, time }) {
  const medications = readAll();
  const newMedication = createMedication({ name, dose, time });
  medications.push(newMedication);
  writeAll(medications);
  return newMedication;
}

/**
 * Retorna todos os medicamentos registados.
 * @param {Object} [filters] — Filtros opcionais
 * @param {boolean} [filters.activeOnly] — Se true, retorna apenas activos
 * @returns {Array} Lista de medicamentos
 */
function listMedications({ activeOnly = false } = {}) {
  const medications = readAll();
  if (activeOnly) {
    return medications.filter((med) => med.active);
  }
  return medications;
}

/**
 * Remove um medicamento pelo seu ID.
 * @param {string} id — ID do medicamento
 * @returns {Object|null} O medicamento removido ou null se não encontrado
 */
function removeMedication(id) {
  const medications = readAll();
  const index = medications.findIndex((med) => med.id === id);

  if (index === -1) {
    return null;
  }

  const [removed] = medications.splice(index, 1);
  writeAll(medications);
  return removed;
}

/**
 * Procura um medicamento pelo seu ID.
 * @param {string} id — ID do medicamento
 * @returns {Object|null} O medicamento ou null
 */
function getMedicationById(id) {
  const medications = readAll();
  return medications.find((med) => med.id === id) || null;
}

module.exports = {
  addMedication,
  listMedications,
  removeMedication,
  getMedicationById,
};
