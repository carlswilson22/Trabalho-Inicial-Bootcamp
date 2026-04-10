const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'data.json');

/**
 * Lê todos os registos do ficheiro data.json.
 * Se o ficheiro não existir, retorna um array vazio.
 * @returns {Array} Lista de medicamentos
 */
function readAll() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Grava a lista completa de medicamentos no ficheiro data.json.
 * @param {Array} data — Lista de medicamentos
 */
function writeAll(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readAll, writeAll };
