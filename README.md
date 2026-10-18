# Eticômetro

Protótipo interativo e gamificado de reflexão ética para profissionais de TI, desenvolvido na disciplina **Ética e Responsabilidade Profissional** (Fatec Itapetininga, Tecnologia em Análise e Desenvolvimento de Sistemas).

A pessoa percorre 6 fases com dilemas reais da profissão e ganha XP pela **qualidade do raciocínio**, nunca por escolher uma resposta "certa". No fim, recebe um relatório de reflexão, e não uma nota. O conteúdo se apoia no *Código de Ética e Conduta Profissional da SBC* (Resolução nº 02/2024) e nos materiais da disciplina.

> **Aviso:** o Eticômetro é um instrumento didático e reflexivo. Não é um teste validado e não mede a moralidade de ninguém. Não deve ser usado como critério único ou eliminatório em seleção, promoção ou demissão.

## Sumário

- [O que o protótipo faz](#o-que-o-protótipo-faz)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como a pontuação funciona](#como-a-pontuação-funciona)
- [Como personalizar](#como-personalizar)
- [Acessibilidade](#acessibilidade)
- [Privacidade](#privacidade)
- [Decisões de projeto](#decisões-de-projeto)
- [Limitações](#limitações)
- [Verificação rápida](#verificação-rápida)
- [Declaração de uso de IA](#declaração-de-uso-de-ia)


## O que o protótipo faz

O fluxo segue esta ordem:

1. **Consentimento:** a pessoa lê os termos e aceita, ou recusa sem nenhum prejuízo.
2. **Fase 0, calibragem:** 18 afirmações de concordo ou discordo (escala de 1 a 5), em 2 páginas, sem pontuação.
3. **Treino:** 5 perguntas sobre o texto do Código da SBC, com gabarito e explicação. É a única parte com resposta certa.
4. **Mapa de fases:** 6 dilemas jogados em qualquer ordem. A fase final (o "Chefão") só libera após 3 fases concluídas.
5. **Dentro de cada fase:** escolha de uma ação, partes afetadas, princípios em tensão, pressões sentidas, justificativa e uma **objeção** que a pessoa precisa enfrentar.
6. **Epílogo:** 3 perguntas abertas, opcionais.
7. **Relatório:** estilo de raciocínio, nível, insígnias, radar das 5 dimensões éticas e "pontos para conversar".

Recursos de apoio disponíveis em qualquer tela:

- **Glossário** (botão no topo) com 24 conceitos em linguagem simples.
- **Termos grifados** no texto dos dilemas e das afirmações: ao tocar, a definição aparece entre parênteses.
- **Painel "Aa"** para mudar tema de cores, fonte, tamanho e espaçamento.

## Estrutura do projeto

```
eticometro/
├── index.html              Esqueleto da página e ordem de carregamento
├── README.md
├── css/
│   ├── tokens.css          Cores e fontes (variáveis) e os 5 temas de cor
│   ├── base.css            Reset, corpo do texto, títulos
│   ├── layout.css          Coluna principal, HUD, barra de XP, mapa de fases
│   └── components.css      Cartões, chips, botões, escalas, insígnias, painel "Aa", termos grifados
├── js/                     Scripts comuns, carregados em ordem (sem bundler)
│   ├── data.js             Conteúdo: afirmações, dimensões, treino, dilemas, níveis de XP
│   ├── glossary.js         Glossário, termos grifados no texto e painéis de conceitos
│   ├── state.js            Estado da sessão, pontuação (XP e critérios) e navegação
│   ├── appearance.js       Painel de aparência (tema, fonte, tamanho, espaçamento)
│   ├── ui.js               Interações: avisos, chips, respostas do treino, conclusão de fases
│   ├── screens.js          Renderização das telas
│   ├── report.js           Relatório: radar, insígnias, estilo de raciocínio
│   └── main.js             Ponto de entrada
└── tools/
    └── build.py            Junta tudo em dist/eticometro.html
```

**Ordem de carregamento dos scripts** (a ordem importa, porque eles compartilham funções globais):
`data` → `glossary` → `state` → `appearance` → `ui` → `screens` → `report` → `main`.

## Como a pontuação funciona

Cada fase vale **até 150 XP**: cinco critérios, de 0 a 3 níveis, multiplicados por 10.

| Critério | Nível 1 | Nível 2 | Nível 3 |
|---|---|---|---|
| Partes afetadas | 1 parte marcada | 2 partes | 3 ou mais |
| Conflito de princípios | 1 princípio | 2 princípios | 3 ou mais |
| Fundamentação (justificativa) | 8 palavras | 20 palavras | 45 ou mais |
| Contexto e pressões | 1 pressão | 2 pressões | 3 ou mais |
| Abertura à objeção | (n/a) | respondeu à objeção | respondeu e explicou (6 palavras ou mais) |

- **Treino:** +10 XP por acerto (máximo 50).
- **Total máximo:** 6 fases × 150 + 50 = **950 XP**.
- **Níveis:** Recruta (0), Operador(a) (200), Estrategista (450), Mestre de Guilda (700).
- **Insígnias (7):** Lente ampla, Voz própria, Questionador(a), Pé no chão, Bússola completa, Leitor(a) do Código e Chefão derrotado.
- **Estilo de raciocínio:** o critério com maior média define o arquétipo exibido (Guardião(ã), Arquiteto(a) de dilemas, Debatedor(a), Estrategista de contexto ou Questionador(a) nato(a)).

O **veredito** (a ação escolhida) nunca soma pontos. As funções de cálculo estão em `js/state.js` (`sc`, `dxp`, `xp`).

## Como personalizar

**Adicionar um dilema** (`js/data.js`)

```js
// 1) Acrescente ao final do array DIL:
{ t: 'Título da fase',
  c: 'Texto do caso.',
  o: ['Ação 1.', 'Ação 2.', 'Ação 3.', 'Ação 4.'],   // 4 alternativas, sem uma "correta"
  k: 'Objeção que desafia a escolha da pessoa.' }

// 2) Acrescente a lista de chaves do glossário correspondente ao final do array GD:
['consent', 'finalidade']
```

O mapa, o XP máximo e o relatório se ajustam sozinhos. Atenção: a **última** fase do array é tratada como o "Chefão" (fica bloqueada até 3 fases concluídas e dá a insígnia final), então novos dilemas devem entrar antes dele ou você deve ajustar essa regra em `js/screens.js` e `js/report.js`.

**Adicionar um termo ao glossário** (`js/glossary.js`)

```js
GL.meutermo = ['Título do termo', 'Definição em linguagem simples.'];   // entra no Glossário
TM.push([/meu termo/i, 'meutermo']);                                   // passa a ser grifado no texto
```

Para o termo aparecer nos painéis "Conceitos desta fase" ou "Termos desta página", inclua a chave em `GD` (por dilema, em `js/data.js`) ou em `GA1`/`GA2` (por página de afirmações, em `js/glossary.js`). Termos grifados só funcionam em textos fora dos botões, ou seja, nos enunciados, objeções e afirmações.

**Adicionar uma afirmação de concordo ou discordo** (`js/data.js`)

Acrescente uma string ao array `LIK`. As páginas têm 9 afirmações cada (`Math.floor(n/9)` em `js/screens.js`), portanto passar de 18 exige ajustar a paginação.

**Adicionar um tema de cores** (`css/tokens.css` e `js/appearance.js`)

```css
:root[data-theme="meutema"] { --bg:#...; --ink:#...; --mut:#...; --card:#...; --line:#...;
  --acc:#...; --acc2:#...; --gold:#...; --ok:#...; --acc-ink:#...; --soft:#...; }
```

Depois inclua `['meutema', 'Nome visível']` na lista de temas dentro da função `pn()` em `js/appearance.js`. Confira o contraste entre `--ink` e `--bg`, e entre `--acc-ink` e `--acc`.

## Acessibilidade

- **5 temas de cor, além do automático:** Escuro, Claro, Suave (menos brilho), Alto contraste e Daltonismo (azul e laranja).
- **Fontes de leitura facilitada:** Atkinson Hyperlegible e Lexend, ou a fonte do sistema.
- **Tamanho do texto** em 4 níveis e **espaçamento maior** entre linhas e letras.
- **A seleção não depende só de cor:** opções escolhidas recebem ✓ e borda mais grossa.
- **Foco visível** nos controles, alvos de toque grandes e respeito à preferência de reduzir animações do sistema.
- **Glossário e termos grifados** para quem não conhece o vocabulário.

## Privacidade

- As respostas ficam **apenas na memória da página** e somem ao fechar ou ao tocar em "Apagar tudo e recomeçar".
- Não há servidor, cadastro, nome, análise de uso nem envio de dados.
- Só as **preferências de aparência** são salvas no aparelho, via `localStorage`.
- A recusa em participar não tem custo, e o relatório é visto primeiro pela própria pessoa.

## Decisões de projeto

Estas escolhas respondem aos riscos éticos listados no enunciado da atividade:

| Risco | Como o protótipo responde |
|---|---|
| Discriminação e preconceito | Não há perguntas sobre religião, política ou vida pessoal. O veredito não pontua. |
| Privacidade e consentimento | Consentimento claro, dados só em memória e botão para apagar tudo. |
| Imposição de valores morais únicos | Nenhuma alternativa dos dilemas é a "correta". Só o treino sobre o texto do Código tem gabarito. |
| Manipulação ou coerção moral | A posição "da empresa" nunca é mostrada, e discordar é bem-vindo. |
| Uso indevido ou punitivo | O relatório descreve como a pessoa argumentou, sem nota, ranking ou rótulo, e traz o aviso de que não mede moralidade. |

## Limitações

- O critério de **fundamentação** usa o tamanho da justificativa, o que pode favorecer quem escreve mais. O XP é um indicador de engajamento, não de mérito, e não deve ser usado para comparar pessoas.
- O protótipo mede o que a pessoa **diz** que faria, não o que faria de fato.
- Não é um instrumento psicometricamente validado.
- As definições e itens do Código foram resumidos e podem ser simplificados demais. Em caso de dúvida, vale a leitura do texto original da SBC.
- As fontes vêm do Google Fonts, então sem internet o navegador usa a fonte do sistema.

## Verificação rápida

Não há testes automatizados. Para checar a sintaxe dos scripts depois de editar (requer Node.js):

```bash
for f in js/*.js; do node --check "$f"; done
```

Depois abra o `index.html` e percorra: consentimento, as duas páginas de afirmações, treino, uma fase completa com objeção, o Glossário, o painel "Aa" e o relatório.

## Declaração de uso de IA

O código-fonte e a estrutura deste protótipo foram gerados com apoio de IA (Claude), a partir dos materiais da disciplina, e depois lidos, testados e revisados pelos autores.

## Referências

- SOCIEDADE BRASILEIRA DE COMPUTAÇÃO. *Resolução nº 02, de 21 de março de 2024: Código de Ética e Conduta Profissional da Sociedade Brasileira de Computação*. Porto Alegre: SBC, 2024.
- CHAUÍ, Marilena. *Convite à Filosofia*. São Paulo: Ática, 2000.
- CORTELLA, Mario Sergio. *Qual é a tua obra?* Petrópolis: Vozes, 2017.
- FILHO, Artur R. I. L.; OST, Sheila B.; BONETE, Wilian J.; et al. *Ética e Cidadania*. 2. ed. Porto Alegre: SAGAH, 2018.
- BELO, José Carlos. *Ética e Responsabilidade Profissional*: Aulas 1 a 4 e Protocolo de Uso de IA. Fatec Itapetininga.