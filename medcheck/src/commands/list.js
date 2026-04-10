const { listMedications } = require('../services/medicationService');
const { printMedicationList } = require('../utils/formatter');

/**
 * Handler do comando "list".
 * Lista todos os medicamentos registados.
 * @param {Object} options — Opções do CLI (active)
 */
function listCommand(options) {
  const medications = listMedications({ activeOnly: options.active || false });
  printMedicationList(medications);
}

module.exports = { listCommand };
