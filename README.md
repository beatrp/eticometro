# Eticômetro

Protótipo interativo e gamificado de reflexão ética para profissionais de TI
(Fatec Itapetininga, disciplina Ética e Responsabilidade Profissional).


## Estrutura

```
index.html            Esqueleto da página e ordem de carregamento
css/
  tokens.css          Cores e fontes (variáveis) e os 5 temas de cor
  base.css            Reset, corpo do texto, títulos
  layout.css          Coluna principal, HUD, barra de XP, mapa de fases
  components.css      Cartões, chips, botões, escalas, insígnias, painel de aparência, termos grifados
js/                   Scripts comuns carregados em ordem (sem bundler)
  data.js             Conteúdo: afirmações, dimensões, treino, dilemas, níveis de XP
  glossary.js         Glossário, termos grifados no texto e painéis de conceitos
  state.js            Estado da sessão, pontuação (XP e critérios) e navegação
  appearance.js       Painel de aparência (tema, fonte, tamanho, espaçamento)
  ui.js               Interações: avisos, chips, respostas do treino, conclusão de fases
  screens.js          Renderização das telas
  report.js           Relatório: radar, insígnias, estilo de raciocínio
  main.js             Ponto de entrada
tools/build.py        Junta tudo em dist/eticometro.html
```

## Onde mexer

| Quero... | Arquivo |
|---|---|
| Trocar ou adicionar dilemas, afirmações ou perguntas do treino | `js/data.js` |
| Editar definições do glossário ou adicionar termos grifados | `js/glossary.js` (`GL` e `TM`) |
| Mudar a pontuação, os níveis ou os critérios | `js/state.js` (`sc`, `dxp`) e `js/data.js` (`XPL`) |
| Mudar insígnias ou o texto do relatório | `js/report.js` |
| Mudar cores ou adicionar um tema | `css/tokens.css` |
| Mudar textos das telas | `js/screens.js` |

## Observações

- Os scripts são carregados na ordem do `index.html`, porque compartilham funções globais (os `onclick` do HTML dependem disso). Não use `type="module"` sem reescrever esses `onclick`, pois módulos não abrem via duplo clique (`file://`).
- Os dados das respostas ficam só na memória da página. Apenas as preferências de aparência são salvas no aparelho (`localStorage`).
- As fontes (Atkinson Hyperlegible e Lexend) vêm do Google Fonts. Sem internet, o navegador usa a fonte do sistema.
