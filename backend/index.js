require('dotenv').config();
console.log('🔐 API KEY:', process.env.AIRTABLE_API_KEY);
console.log('📦 BASE ID:', process.env.AIRTABLE_BASE_ID);

const express = require('express');
const cors = require('cors');
const base = require('./services/airtableService');
const { criarAula } = require('./services/aulasService');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/alunos', async (req, res) => {
  try {
    const records = await base('Alunos').select({ maxRecords: 10 }).firstPage();
    const alunos = records.map(record => ({
      id: record.id,
      nome: record.get('Aluno'), // campo correto
    }));
    res.json(alunos);
  } catch (err) {
    console.error('Erro ao buscar alunos:', err); // <--- ESSENCIAL
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});


// 🔜 FUTURAMENTE: app.post('/api/aulas', async (req, res) => criarAula...)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
