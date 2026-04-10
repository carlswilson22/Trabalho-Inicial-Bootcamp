/**
 * Converte uma string "HH:MM" num objecto { hours, minutes }.
 * @param {string} timeStr — Horário no formato "HH:MM"
 * @returns {{ hours: number, minutes: number }}
 */
function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
}

/**
 * Retorna a hora actual como objecto { hours, minutes }.
 * @returns {{ hours: number, minutes: number }}
 */
function getCurrentTime() {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
  };
}

/**
 * Calcula a diferença em minutos entre dois horários.
 * Um valor positivo indica que `target` está no futuro.
 * @param {{ hours: number, minutes: number }} current
 * @param {{ hours: number, minutes: number }} target
 * @returns {number} Diferença em minutos
 */
function getMinutesDiff(current, target) {
  const currentTotal = current.hours * 60 + current.minutes;
  const targetTotal = target.hours * 60 + target.minutes;
  return targetTotal - currentTotal;
}

module.exports = { parseTime, getCurrentTime, getMinutesDiff };
