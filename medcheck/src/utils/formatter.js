const chalk = require('chalk');

/**
 * Exibe mensagem de sucesso ao adicionar um medicamento.
 * @param {Object} medication — O objecto medicamento criado
 */
function printAddSuccess(medication) {
  console.log();
  console.log(chalk.green.bold('  ✅ Medicamento registado com sucesso!'));
  console.log();
  console.log(`  💊 Nome:    ${chalk.cyan.bold(medication.name)}`);
  console.log(`  💉 Dose:    ${chalk.yellow(medication.dose)}`);
  console.log(`  ⏰ Horário: ${chalk.magenta(medication.time)}`);
  console.log();
  console.log(`  ${chalk.dim('ID:')} ${chalk.dim(medication.id)}`);
  console.log();
}

/**
 * Exibe a lista de medicamentos em formato de tabela.
 * @param {Array} medications — Lista de medicamentos
 */
function printMedicationList(medications) {
  if (medications.length === 0) {
    console.log();
    console.log(chalk.yellow('  ⚠️  Nenhum medicamento registado.'));
    console.log(chalk.dim('  Use: medcheck add --name "Nome" --dose "Dose" --time "HH:MM"'));
    console.log();
    return;
  }

  console.log();
  console.log(chalk.blue.bold(`  📋 Medicamentos Registados (${medications.length})`));
  console.log(chalk.dim('  ─'.repeat(30)));
  console.log();

  medications.forEach((med, index) => {
    const status = med.active
      ? chalk.green('● Activo')
      : chalk.red('○ Inactivo');

    console.log(`  ${chalk.dim(`${index + 1}.`)} ${chalk.cyan.bold(med.name)}`);
    console.log(`     Dose: ${chalk.yellow(med.dose)} | Horário: ${chalk.magenta(med.time)} | ${status}`);
    console.log(`     ${chalk.dim(`ID: ${med.id}`)}`);
    console.log();
  });
}

/**
 * Exibe mensagem de sucesso ao remover um medicamento.
 * @param {Object} medication — O medicamento removido
 */
function printRemoveSuccess(medication) {
  console.log();
  console.log(chalk.red.bold(`  🗑️  Medicamento "${medication.name}" removido.`));
  console.log();
}

/**
 * Exibe lista de lembretes.
 * @param {Array} upcoming — Medicamentos próximos
 * @param {Array} overdue — Medicamentos atrasados
 */
function printReminders(upcoming, overdue) {
  console.log();

  if (overdue.length > 0) {
    console.log(chalk.red.bold('  ⚠️  Medicamentos Atrasados:'));
    overdue.forEach((med) => {
      console.log(`     ${chalk.red('●')} ${chalk.bold(med.name)} — ${med.dose} às ${med.time}`);
    });
    console.log();
  }

  if (upcoming.length > 0) {
    console.log(chalk.green.bold('  🔔 Próximos Lembretes:'));
    upcoming.forEach((med) => {
      console.log(`     ${chalk.green('●')} ${chalk.bold(med.name)} — ${med.dose} às ${med.time}`);
    });
    console.log();
  }

  if (upcoming.length === 0 && overdue.length === 0) {
    console.log(chalk.dim('  ✨ Sem lembretes pendentes neste momento.'));
    console.log();
  }
}

/**
 * Exibe erros de validação.
 * @param {string[]} errors — Lista de mensagens de erro
 */
function printErrors(errors) {
  console.log();
  console.log(chalk.red.bold('  ❌ Erro(s) de validação:'));
  errors.forEach((err) => {
    console.log(chalk.red(`     • ${err}`));
  });
  console.log();
}

module.exports = {
  printAddSuccess,
  printMedicationList,
  printRemoveSuccess,
  printReminders,
  printErrors,
};
