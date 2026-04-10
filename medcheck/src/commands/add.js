const { validateMedication } = require('../utils/validator');
const { addMedication } = require('../services/medicationService');
const { printAddSuccess, printErrors } = require('../utils/formatter');

/**
 * Handler do comando "add".
 * Valida os inputs, cria o medicamento e exibe confirmação.
 * @param {Object} options — Opções do CLI (name, dose, time, interactive)
 */
async function addCommand(options) {
  let { name, dose, time } = options;

  // Modo interactivo: se --interactive ou campos em falta
  if (options.interactive || !name || !dose || !time) {
    try {
      const inquirer = require('inquirer');
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: '💊 Nome do medicamento:',
          when: !name,
          validate: (val) => (val.trim().length >= 2 ? true : 'Mínimo 2 caracteres.'),
        },
        {
          type: 'input',
          name: 'dose',
          message: '💉 Dose (ex: 500mg):',
          when: !dose,
          validate: (val) => (val.trim().length > 0 ? true : 'A dose é obrigatória.'),
        },
        {
          type: 'input',
          name: 'time',
          message: '⏰ Horário (HH:MM):',
          when: !time,
          validate: (val) =>
            /^([01]\d|2[0-3]):([0-5]\d)$/.test(val.trim())
              ? true
              : 'Formato inválido. Use HH:MM (ex: 08:00).',
        },
      ]);

      name = name || answers.name;
      dose = dose || answers.dose;
      time = time || answers.time;
    } catch {
      printErrors(['O modo interactivo requer o pacote "inquirer". Instale com: npm install inquirer']);
      process.exit(1);
    }
  }

  // Validação final
  const validation = validateMedication({ name, dose, time });
  if (!validation.valid) {
    printErrors(validation.errors);
    process.exit(1);
  }

  // Criação e persistência
  const medication = addMedication({ name, dose, time });
  printAddSuccess(medication);
}

module.exports = { addCommand };
