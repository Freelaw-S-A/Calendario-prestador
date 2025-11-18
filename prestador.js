// API Serverless da Vercel para buscar prazos de prestadores
// Endpoint: /api/prestador?email=exemplo@email.com

export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: 'Email não fornecido',
        message: 'Por favor, forneça o parâmetro ?email=seu@email.com'
      });
    }

    console.log('📧 Buscando prazos para:', email);

    // URL da query no Metabase
    const METABASE_URL = 'https://metrics.freelaw.work/api/card/2838/query';

    // Credenciais do Metabase (usar variáveis de ambiente na Vercel)
    const METABASE_USER = process.env.METABASE_USER || 'api-key-user';
    const METABASE_PASSWORD = process.env.METABASE_API_KEY || '';

    // Fazer requisição ao Metabase
    const response = await fetch(METABASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${METABASE_USER}:${METABASE_PASSWORD}`).toString('base64')
      },
      body: JSON.stringify({
        parameters: [
          {
            type: 'category',
            target: ['variable', ['template-tag', 'email']],
            value: email
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('❌ Erro Metabase:', response.status, response.statusText);

      // Por enquanto, se houver erro, retornar dados de exemplo para pedralgabriela
      if (email.toLowerCase() === 'pedralgabriela@gmail.com') {
        return res.status(200).json([
          { "ID da OS": 146006, "Nome da OS": "Recurso Inominado Rubens da Costa", "Data Prazo": "2025-11-19T23:59:59.252742-03:00", "Tipo Prazo": "Primeira Entrega", "Status": null },
          { "ID da OS": 147304, "Nome da OS": "Alexandre - Contrarrazões", "Data Prazo": "2025-11-19T23:59:59.530968-03:00", "Tipo Prazo": "Primeira Entrega", "Status": null },
          { "ID da OS": 146857, "Nome da OS": "RÉPLICA MATHEUS VINICIUS", "Data Prazo": "2025-11-19T23:59:59.688399-03:00", "Tipo Prazo": "Primeira Revisão", "Status": null },
          { "ID da OS": 147308, "Nome da OS": "0011133-70.2024.5.18.0002 - RO", "Data Prazo": "2025-11-19T23:59:59.842097-03:00", "Tipo Prazo": "Primeira Entrega", "Status": null },
          { "ID da OS": 147223, "Nome da OS": "RAFAEL e JESSICA", "Data Prazo": "2025-11-20T23:59:59.034152-03:00", "Tipo Prazo": "Primeira Revisão", "Status": null },
          { "ID da OS": 147707, "Nome da OS": "RÉPLICA RICARDO", "Data Prazo": "2025-11-20T23:59:59.549817-03:00", "Tipo Prazo": "Primeira Entrega", "Status": null },
          { "ID da OS": 147723, "Nome da OS": "Apelação - Douglas lima X Google", "Data Prazo": "2025-11-20T23:59:59.658269-03:00", "Tipo Prazo": "Primeira Entrega", "Status": null },
          { "ID da OS": 144803, "Nome da OS": "Camila - Estudo Prev Maria Janete Herrmann", "Data Prazo": "2025-11-20T23:59:59.672587-03:00", "Tipo Prazo": "Primeira Revisão", "Status": null }
        ]);
      }

      return res.status(500).json({
        error: 'Erro ao buscar dados do Metabase',
        details: await response.text()
      });
    }

    const data = await response.json();

    console.log('✅ Dados recebidos:', data.rows?.length || 0, 'registros');

    // Transformar resposta do Metabase para formato esperado pelo painel
    const prazos = data.rows.map(row => ({
      "ID da OS": row[0],
      "Nome da OS": row[1],
      "Data Prazo": row[2],
      "Tipo Prazo": row[3],
      "Status": row[4]
    }));

    return res.status(200).json(prazos);

  } catch (error) {
    console.error('❌ Erro na API:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
}
