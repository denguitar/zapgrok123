# Guia de Deploy - WhatsApp AI Agent

## 🚀 Como fazer deploy do seu projeto

### 1. Preparar o projeto

1. **Baixar o código:**
   - No Replit, clique em "Download as ZIP" ou clone o repositório
   - Extraia todos os arquivos

2. **Instalar dependências:**
   ```bash
   npm install
   ```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de dados PostgreSQL
DATABASE_URL=postgresql://usuario:senha@host:porta/banco

# Autenticação (opcional)
SESSION_SECRET=seu_secret_muito_seguro_aqui

# API do Grok (xAI)
XAI_API_KEY=sua_chave_xai_aqui

# Configurações do servidor
NODE_ENV=production
PORT=3000
```

### 3. Opções de hospedagem

#### 🌐 Vercel (Recomendado para iniciantes)

1. **Preparar para Vercel:**
   ```bash
   npm install -g vercel
   ```

2. **Configurar `vercel.json`:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "package.json",
         "use": "@vercel/static-build"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/server/index.ts"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/$1"
       }
     ]
   }
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

#### 🐋 Railway (Simples e com banco incluído)

1. **Instalar Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login e deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Adicionar banco PostgreSQL:**
   - No dashboard do Railway
   - Clique em "Add Service" → "Database" → "PostgreSQL"
   - Copie a DATABASE_URL para suas variáveis de ambiente

#### ☁️ Render (Gratuito com limitações)

1. **Conectar repositório no Render.com**
2. **Configurar build:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
3. **Adicionar variáveis de ambiente no dashboard**

#### 🖥️ VPS (DigitalOcean, Contabo, etc.)

1. **Instalar Node.js no servidor:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Instalar PostgreSQL:**
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```

3. **Configurar banco:**
   ```bash
   sudo -u postgres createuser --interactive
   sudo -u postgres createdb whatsapp_bot
   ```

4. **Deploy da aplicação:**
   ```bash
   git clone seu-repositorio
   cd whatsapp-ai-agent
   npm install
   npm run build
   
   # Usar PM2 para manter rodando
   npm install -g pm2
   pm2 start npm --name "whatsapp-bot" -- start
   pm2 startup
   pm2 save
   ```

### 4. Configurar Evolution API ou WAHA

#### Evolution API
```bash
# No seu VPS
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
docker-compose up -d
```

#### WAHA
```bash
docker run -d \
  --name waha \
  -p 3000:3000 \
  -e WHATSAPP_DEFAULT_ENGINE=WEBJS \
  devlikeapro/waha
```

### 5. Scripts de build

Adicione ao `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "start": "NODE_ENV=production tsx server/index.ts",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 6. Configurações importantes

1. **SSL/HTTPS:** Obrigatório para webhooks do WhatsApp
2. **Domain:** Configure um domínio para webhook estável
3. **Firewall:** Abra portas 80, 443 e sua porta da aplicação
4. **Backup:** Configure backup automático do banco

### 7. Monitoramento

```bash
# Ver logs da aplicação
pm2 logs whatsapp-bot

# Status dos processos
pm2 status

# Restart se necessário
pm2 restart whatsapp-bot
```

### 8. Troubleshooting

**Problema:** Webhook não funciona
- Verifique se a URL está acessível externamente
- Confirme HTTPS funcionando
- Teste com `curl https://seu-dominio.com/api/webhook/whatsapp`

**Problema:** Banco de dados não conecta
- Verifique DATABASE_URL
- Confirme se PostgreSQL está rodando
- Execute `npm run db:push`

### 9. Custos estimados

- **Vercel:** Gratuito (limitado) / $20/mês
- **Railway:** $5/mês
- **Render:** Gratuito (dorme) / $7/mês
- **VPS:** $5-20/mês dependendo do provider

### 10. Próximos passos

1. Configure seu domínio
2. Instale Evolution API ou WAHA
3. Configure webhook no WhatsApp
4. Teste enviando mensagem
5. Configure monitoramento

---

📞 **Precisa de ajuda?** O sistema está pronto para produção!