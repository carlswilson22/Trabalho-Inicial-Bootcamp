const MedicationManager = require('./src/MedicationManager');

const manager = new MedicationManager();

try {
  console.log("=== Adicionando Medicamentos ===");
  const med1 = manager.addMedication("Paracetamol", "500mg", "08:00");
  console.log("Adicionado:", med1);

  const med2 = manager.addMedication("Amoxicilina", "875mg", "14:30");
  console.log("Adicionado:", med2);

  console.log("\n=== Listando Todos ===");
  console.log(manager.listAll());

  console.log("\n=== Removendo Medicamento ===");
  const removed = manager.removeMedication(med1.id);
  console.log("Removido:", removed);

  console.log("\n=== Listando Todos Após Remoção ===");
  console.log(manager.listAll());

  console.log("\n=== Testando Validações ===");
  // Teste de nome vazio
  // manager.addMedication("", "500m", "10:00"); // Descomente para ver o erro

  // Teste de formato de hora inválido
  // manager.addMedication("Aspirina", "500m", "25:00"); // Descomente para ver o erro

} catch (error) {
  console.error("Erro:", error.message);
}
