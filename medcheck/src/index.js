#!/usr/bin/env node

const { program } = require('commander');
const { addCommand } = require('./commands/add');
const { listCommand } = require('./commands/list');
const { removeCommand } = require('./commands/remove');
const { remindCommand } = require('./commands/remind');

program
  .name('medcheck')
  .description('💊 MedCheck — Gestão e lembrete de medicamentos')
  .version('1.0.0');

// Comando: adicionar medicamento
program
  .command('add')
  .description('Registar um novo medicamento')
  .option('-n, --name <name>', 'Nome do medicamento')
  .option('-d, --dose <dose>', 'Dose (ex: 500mg, 1 comprimido)')
  .option('-t, --time <time>', 'Horário no formato HH:MM')
  .option('-i, --interactive', 'Modo interactivo com prompts')
  .action(addCommand);

// Comando: listar medicamentos
program
  .command('list')
  .description('Listar todos os medicamentos registados')
  .option('-a, --active', 'Mostrar apenas medicamentos activos')
  .action(listCommand);

// Comando: remover medicamento
program
  .command('remove')
  .description('Remover um medicamento pelo ID')
  .requiredOption('--id <id>', 'ID do medicamento a remover')
  .action(removeCommand);

// Comando: verificar lembretes
program
  .command('remind')
  .description('Verificar próximos lembretes de medicamentos')
  .action(remindCommand);

program.parse(process.argv);
