# 📅 Calendário Prestador - Freelaw

Painel de prazos de entrega para prestadores da plataforma Freelaw.

## 🚀 Como fazer deploy na Vercel

### 1. Fazer upload dos arquivos no GitHub

1. Acesse seu repositório: https://github.com/[seu-usuario]/Calendario-prestador
2. Faça upload dos seguintes arquivos:
   - `index.html` (arquivo principal)
   - `api/prestador.js` (função serverless)
   - `README.md` (este arquivo)

### 2. Conectar GitHub com Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Selecione o repositório **Calendario-prestador**
4. Clique em **"Deploy"**

### 3. Configurar variáveis de ambiente (IMPORTANTE!)

Antes do deploy funcionar completamente, você precisa configurar as credenciais do Metabase:

1. No projeto na Vercel, vá em **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis:

```
METABASE_API_KEY = sua-chave-api-do-metabase
METABASE_USER = api-key-user (ou seu usuário)
```

Para obter a API Key do Metabase:
- Acesse https://metrics.freelaw.work
- Vá em **Settings** → **Admin** → **Settings** → **Authentication**
- Gere uma nova API Key

### 4. Configurar domínio personalizado (Opcional)

1. No projeto na Vercel, vá em **Settings** → **Domains**
2. Adicione: `calendario-prestador.freelaw.work`
3. Configure o DNS do domínio `freelaw.work`:
   - **Tipo**: CNAME
   - **Nome**: calendario-prestador
   - **Destino**: cname.vercel-dns.com

## 📊 Como funciona

1. Prestador acessa o site
2. Faz login com seu email
3. A API Serverless busca os prazos no Metabase
4. O painel exibe:
   - Total de entregas pendentes (>= 18/11/2025)
   - Próximo prazo com countdown
   - Calendário visual
   - Lista completa de prazos

## 🔧 Estrutura de arquivos

```
calendario-prestador/
├── index.html          # Painel principal (frontend)
├── api/
│   └── prestador.js    # API Serverless (backend)
└── README.md           # Este arquivo
```

## 📝 Filtros aplicados

- **Data mínima**: 18/11/2025 (prazos anteriores não aparecem)
- **Tipos de prazo**: Primeira Entrega e Primeira Revisão
- **Status**: Todos os status ativos

## 🐛 Solução de problemas

### O painel não carrega dados
1. Verifique se as variáveis de ambiente estão configuradas na Vercel
2. Verifique os logs da função serverless no dashboard da Vercel
3. Teste a API diretamente: `https://seu-site.vercel.app/api/prestador?email=teste@email.com`

### Erro 500 na API
- Verifique se a API Key do Metabase está correta
- Verifique se o usuário tem permissão para acessar a query

## 📧 Contato

Para dúvidas ou suporte: [seu-email@freelaw.work]

---

**Desenvolvido com ❤️ para Freelaw**
