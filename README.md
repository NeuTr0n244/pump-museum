# 🎨 MEME MUSEUM

Explorador 3D interativo em primeira pessoa para o museu de memes.

## 📁 Estrutura

```
museu/
├── index.html          (site completo)
├── museu memes1.glb    (modelo 3D do museu - NECESSÁRIO)
├── serve.bat           (servidor local)
└── README.md           (este arquivo)
```

## 🚀 Como usar

### 1. Adicione seu modelo GLB

Coloque seu arquivo GLB exportado do Blender na pasta `museu/` com o nome exato:

```
museu memes1.glb
```

### 2. Inicie o servidor local

**Dê duplo clique em `serve.bat`**

Ou manualmente no terminal:

```bash
# Com Python (recomendado)
python -m http.server 8080

# Ou com Node.js
npx http-server -p 8080
```

### 3. Abra no navegador

Acesse: **http://localhost:8080**

## 🎮 Controles

| Tecla | Ação |
|-------|------|
| **WASD** | Mover |
| **Mouse** | Olhar ao redor |
| **Shift** | Correr (2x velocidade) |
| **Space** | Pular |
| **ESC** | Pausar |
| **F** | Tela cheia |

## ⚙️ Recursos

### Iluminação inteligente
- Detecta automaticamente se o modelo GLB tem luzes próprias
- Se **SIM**: usa apenas as luzes do Blender (sem adicionar extras)
- Se **NÃO**: adiciona iluminação básica suave

### Slider de brilho
- Localizado no canto superior esquerdo durante o jogo
- Ajuste em tempo real (0.1 a 3.0)
- Controla a exposição do tone mapping

### Física completa
- Gravidade realista
- Detecção de chão/teto/paredes
- Colisão que permite "deslizar" nas paredes
- Sistema de pulo

### Performance
- Sombras em 4096x4096
- Tone mapping ACES Filmic
- Animações automáticas do modelo
- Estatísticas em tempo real (FPS, meshes, triângulos)

## 🔧 Requisitos

- Navegador moderno (Chrome, Edge, Firefox)
- Python 3.x **OU** Node.js (para servidor local)
- Arquivo `museu memes1.glb` na pasta

## ❓ Problemas comuns

### "Erro: Arquivo não encontrado"
- Verifique se o arquivo se chama **exatamente** `museu memes1.glb`
- Confirme que está na mesma pasta do `index.html`

### "Tudo muito branco/estourado"
- Use o slider de brilho no canto superior esquerdo
- Ajuste para valores menores (0.5 - 1.0)

### "Não consigo mover"
- Clique em "ENTRAR NO MUSEU" primeiro
- Certifique-se que o pointer lock foi ativado (cursor desaparece)

### "Servidor não inicia"
- Instale Python: https://www.python.org/downloads/
- Ou use Node.js: https://nodejs.org/

## 🎨 Personalização

### Alterar velocidade de movimento
Edite `index.html` linha ~334:
```javascript
speed: 4.5,        // velocidade normal
sprintSpeed: 9,    // velocidade correndo
```

### Alterar sensibilidade do mouse
Edite `index.html` linha ~347:
```javascript
mouseSensitivity: 0.002,  // menor = menos sensível
```

### Alterar cor do HUD
Edite `index.html` linha ~37:
```css
--accent: #c8ff2e;  /* verde neon */
```

## 📝 Stack técnica

- **Three.js r160** (via CDN)
- **GLTFLoader** + **DRACOLoader**
- HTML + CSS + JavaScript vanilla (sem frameworks)
- Arquitetura: classe ES6 única (MuseumEngine)

---

Criado com [Claude Code](https://claude.com/claude-code)
