const crypto = require('crypto');

class MedicationManager {
  constructor() {
    this.medications = [];
  }

  addMedication(name, dosage, time) {
    if (!name || name.trim() === '') {
      throw new Error("O nome do medicamento não pode ser vazio.");
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!time || !timeRegex.test(time)) {
      throw new Error("O horário deve seguir o formato HH:mm.");
    }

    const newMedication = {
      id: crypto.randomUUID(),
      name: name.trim(),
      dosage: dosage ? dosage.trim() : '',
      time: time
    };

    this.medications.push(newMedication);
    return newMedication;
  }

  listAll() {
    return this.medications;
  }

  removeMedication(id) {
    const index = this.medications.findIndex(med => med.id === id);
    if (index === -1) {
      return null; // Ou throw new Error("Medicamento não encontrado.")
    }
    
    // Retorna o objeto removido
    const removedMedication = this.medications.splice(index, 1)[0];
    return removedMedication;
  }
}

module.exports = MedicationManager;
