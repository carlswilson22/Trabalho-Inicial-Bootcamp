const { getUpcomingReminders, getOverdueReminders } = require('../services/reminderService');
const { printReminders } = require('../utils/formatter');

/**
 * Handler do comando "remind".
 * Verifica e exibe os próximos lembretes e medicamentos atrasados.
 */
function remindCommand() {
  const upcoming = getUpcomingReminders(60);
  const overdue = getOverdueReminders();
  printReminders(upcoming, overdue);
}

module.exports = { remindCommand };
