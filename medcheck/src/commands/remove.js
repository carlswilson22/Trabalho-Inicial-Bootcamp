const { removeMedication } = require('../services/medicationService');
const { printRemoveSuccess, printErrors } = require('../utils/formatter');

/**
 * Handler do comando "remove".
 * Remove um medicamento pelo seu ID.
 * @param {Object} options — Opções do CLI (id)
 */
function removeCommand(options) {
  const removed = removeMedication(options.id);

  if (!removed) {
    printErrors([`Medicamento com ID "${options.id}" não encontrado.`]);
    process.exit(1);
  }

  printRemoveSuccess(removed);
}

module.exports = { removeCommand };
