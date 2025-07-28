const base = require('./airtableService');

async function criarAula(data) {
  try {
    const created = await base('Aulas').create([
      {
        fields: {
          "Aluno": [data.alunoId],
          "Professor": [data.professorId],
          "Data e Hora": data.dataHora,
          "Status da Aula": "Em Aberto",
          "Status da Reposição": "Pendente",
          "Observações": data.observacoes || '',
        },
      },
    ]);

    return created[0];
  } catch (error) {
    console.error('Erro ao criar aula:', error);
    throw error;
  }
}

module.exports = {
  criarAula,
};
