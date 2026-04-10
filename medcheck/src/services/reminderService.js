const { listMedications } = require('./medicationService');
const { parseTime, getCurrentTime, getMinutesDiff } = require('../utils/timeUtils');

/**
 * Retorna os medicamentos que devem ser tomados nas próximas N minutos.
 * @param {number} [withinMinutes=60] — Janela de tempo em minutos
 * @returns {Array} Lista de medicamentos próximos
 */
function getUpcomingReminders(withinMinutes = 60) {
  const medications = listMedications({ activeOnly: true });
  const now = getCurrentTime();

  return medications.filter((med) => {
    const medTime = parseTime(med.time);
    const diff = getMinutesDiff(now, medTime);
    return diff >= 0 && diff <= withinMinutes;
  });
}

/**
 * Retorna os medicamentos que já passaram do horário hoje.
 * @returns {Array} Lista de medicamentos atrasados
 */
function getOverdueReminders() {
  const medications = listMedications({ activeOnly: true });
  const now = getCurrentTime();

  return medications.filter((med) => {
    const medTime = parseTime(med.time);
    const diff = getMinutesDiff(now, medTime);
    return diff < 0;
  });
}

module.exports = { getUpcomingReminders, getOverdueReminders };
