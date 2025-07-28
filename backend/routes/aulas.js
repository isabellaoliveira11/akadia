const express = require('express');
const { criarAula } = require('./services/aulasService');
const router = express.Router();

router.post('/aulas', async (req, res) => {
  try {
    const novaAula = await criarAula(req.body);
    res.status(201).json(novaAula);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao agendar aula.' });
  }
});

module.exports = router;
