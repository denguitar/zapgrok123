# 🔧 Fix Rápido - Deploy Vercel

## Problema: GitHub com arquivos faltando

### Solução Simples:

1. **No Vercel, ao importar o projeto:**
   - Framework: **"Other"** (não Vite)
   - Build Command: **deixe vazio** ou `npm run build`
   - Output Directory: **deixe vazio**
   - Install Command: `npm install`

2. **Se der erro de build, tente:**
   - Framework: **"Node.js"**
   - Build Command: `vite build`
   - Start Command: `node server/index.ts`

3. **Variáveis de ambiente obrigatórias:**
   ```
   DATABASE_URL=postgresql://...
   XAI_API_KEY=sua_chave
   NODE_ENV=production
   SESSION_SECRET=qualquer_string_aleatoria
   ```

### Banco de Dados Fácil:

1. **Neon.tech** (gratuito):
   - Criar conta em neon.tech
   - New Project
   - Copiar connection string
   - Colar como DATABASE_URL no Vercel

2. **Depois do deploy:**
   ```bash
   npx vercel env pull .env.local
   npm run db:push
   ```

### Se ainda der erro:

**Opção 1 - Vercel Postgres:**
- No dashboard Vercel → Storage → Create Database
- Selecionar Postgres
- Copiar DATABASE_URL automaticamente

**Opção 2 - Simplificar:**
- Deletar `vercel.json`
- Deixar Vercel detectar automaticamente
- Usar só as variáveis de ambiente

### Teste Final:
Acesse: `https://seu-projeto.vercel.app/api/status`

Deve mostrar: `{"status": "ok"}`

---

**💡 Dica:** Se continuar com problemas, me fale qual erro específico aparece no dashboard do Vercel!