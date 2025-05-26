# 🚀 Deploy no Vercel - WhatsApp AI Agent

## Passo a passo completo

### 1. Preparar o projeto localmente

1. **Baixar o código do Replit:**
   - Clique em "Download as ZIP" no Replit
   - Extraia os arquivos em uma pasta

2. **Testar localmente (opcional):**
   ```bash
   npm install
   npm run build
   npm start
   ```

### 2. Configurar repositório Git

1. **Criar repositório no GitHub:**
   - Vá para github.com
   - Clique em "New repository"
   - Nome: `whatsapp-ai-agent`
   - Deixe público ou privado

2. **Fazer upload do código:**
   ```bash
   cd whatsapp-ai-agent
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/whatsapp-ai-agent.git
   git push -u origin main
   ```

### 3. Deploy no Vercel

1. **Acessar Vercel.com:**
   - Crie conta com GitHub
   - Clique em "New Project"

2. **Conectar repositório:**
   - Selecione seu repositório `whatsapp-ai-agent`
   - Clique em "Import"

3. **Configurar projeto:**
   - Framework Preset: **Vite**
   - Root Directory: `/` (deixar vazio)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 4. Configurar banco PostgreSQL

**Opção 1: Neon (Recomendado - Gratuito)**
1. Vá para neon.tech
2. Crie conta e novo projeto
3. Copie a connection string

**Opção 2: Vercel Postgres**
1. No dashboard do projeto no Vercel
2. Aba "Storage" → "Create Database"
3. Selecione "Postgres"

**Opção 3: Supabase**
1. Vá para supabase.com
2. Crie projeto
3. Copie connection string da seção "Database"

### 5. Configurar variáveis de ambiente

No dashboard do Vercel, vá em "Settings" → "Environment Variables":

```env
# Banco de dados
DATABASE_URL=postgresql://usuario:senha@host/banco

# API Grok
XAI_API_KEY=sua_chave_aqui

# Configurações de produção
NODE_ENV=production
SESSION_SECRET=um_secret_muito_seguro_aleatorio

# URLs (Vercel configura automaticamente)
VERCEL_URL=seu-projeto.vercel.app
```

### 6. Configurar banco de dados

1. **Executar migrações:**
   - No terminal local com DATABASE_URL configurado:
   ```bash
   npm run db:push
   ```

2. **Ou usar Vercel CLI:**
   ```bash
   npx vercel env pull .env.local
   npm run db:push
   ```

### 7. Testar deploy

1. **Fazer novo deploy:**
   - Push qualquer mudança no GitHub
   - Vercel faz deploy automaticamente

2. **Verificar logs:**
   - No dashboard Vercel → "Functions" → Ver logs
   - Verificar se conectou no banco

### 8. Configurar domínio (opcional)

1. **No dashboard Vercel:**
   - "Settings" → "Domains"
   - Adicionar seu domínio personalizado

2. **Configurar DNS:**
   - CNAME: `seu-dominio.com` → `cname.vercel-dns.com`

### 9. Configurar Evolution API/WAHA

**Evolution API:**
```bash
# No seu VPS
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
# Configurar .env com WEBHOOK_URL=https://seu-projeto.vercel.app/api/webhook/whatsapp
docker-compose up -d
```

**WAHA:**
```bash
docker run -d \
  --name waha \
  -p 3000:3000 \
  -e WHATSAPP_WEBHOOK_URL=https://seu-projeto.vercel.app/api/webhook/whatsapp \
  devlikeapro/waha
```

### 10. URLs importantes

- **App:** https://seu-projeto.vercel.app
- **Webhook:** https://seu-projeto.vercel.app/api/webhook/whatsapp
- **Dashboard:** https://seu-projeto.vercel.app/dashboard

### 11. Comandos úteis

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy manual
vercel --prod

# Ver logs
vercel logs

# Configurar env
vercel env add
```

### 12. Troubleshooting

**Erro de build:**
- Verificar se `npm run build` funciona localmente
- Checar logs no Vercel dashboard

**Erro de banco:**
- Verificar DATABASE_URL
- Confirmar se executou `npm run db:push`

**Webhook não funciona:**
- Confirmar URL HTTPS
- Testar com: `curl https://seu-projeto.vercel.app/api/status`

### 13. Custos

- **Vercel:** Gratuito até 100GB bandwidth/mês
- **Neon:** Gratuito até 3GB storage
- **Total:** R$ 0/mês para começar

### 14. Próximos passos

1. ✅ Deploy funcionando
2. ✅ Banco conectado
3. 🔄 Configurar Evolution API
4. 🔄 Testar WhatsApp
5. 🔄 Configurar domínio próprio

---

**🎉 Pronto! Seu WhatsApp AI Agent está no ar!**

Acesse: https://seu-projeto.vercel.app