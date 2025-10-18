# Modal de Detalhes da Missão

## Funcionalidade Implementada

Foi adicionada uma modal de detalhes das missões SpaceX na página de lançamentos (`LaunchesPage`). Agora, ao clicar em qualquer linha da tabela de lançamentos (passados ou futuros), será exibida uma modal com informações detalhadas sobre a missão.

## Arquivos Criados/Modificados

### Novos Arquivos:
- `src/presentation/components/LaunchModal.js` - Componente da modal
- `src/presentation/components/LaunchModal.css` - Estilos da modal

### Arquivos Modificados:
- `src/presentation/pages/LaunchesPage.js` - Adicionada integração com a modal
- `src/presentation/pages/LaunchesPage.css` - Adicionados estilos para linhas clicáveis

## Funcionalidades da Modal

### Informações Exibidas:
1. **Informações da Missão:**
   - Número do voo
   - Data e horário do lançamento
   - Status da missão
   - Foguete utilizado
   - Plataforma de lançamento

2. **Detalhes Técnicos:**
   - Atualização automática
   - Data a ser determinada (TBD)
   - Janela de lançamento
   - NET (No Earlier Than)

3. **Descrição da Missão:**
   - Detalhes completos sobre a missão

4. **Cargas Úteis:**
   - Lista de payloads transportados

5. **Tripulação:**
   - Membros da tripulação com nome, função e agência
   - Indicação clara quando é uma missão não tripulada

6. **Navios de Apoio:**
   - Navios utilizados na missão

7. **Links Externos:**
   - Links para transmissão ao vivo, artigos, Wikipedia e Reddit

## Características da Interface

### Design:
- Modal responsiva que se adapta a diferentes tamanhos de tela
- Tema escuro consistente com o design da aplicação
- Animações suaves e transições

### Usabilidade:
- Linhas da tabela agora são clicáveis (cursor pointer + hover effects)
- Modal pode ser fechada clicando:
  - No botão "×" no cabeçalho
  - Pressionando a tecla ESC
  - Clicando fora da modal
- Scroll automático quando o conteúdo é maior que a altura da tela
- Prevenção de scroll da página de fundo quando a modal está aberta

### Responsividade:
- Layout adaptativo para dispositivos móveis
- Grid de informações se reorganiza em uma coluna em telas menores
- Links e botões otimizados para touch

## Como Usar

1. Navegue para a página de lançamentos
2. Clique em qualquer linha da tabela de lançamentos (passados ou futuros)
3. A modal será aberta com os detalhes completos da missão
4. Use as opções de fechamento para retornar à lista

## Tecnologias Utilizadas

- React Hooks (useState, useEffect, useCallback)
- CSS Grid e Flexbox para layout responsivo
- API do YouTube para incorporação de vídeos
- Integração com dados da SpaceX API via entidades existentes

## Melhorias Implementadas

### Versão 2.0 - Foco na Tripulação
- **Removida** a seção de mídia (patch da missão e vídeos do YouTube)
- **Melhorada** a seção de tripulação com:
  - Layout mais organizado em cards
  - Exibição de nome, função e agência dos tripulantes
  - Indicação clara para missões não tripuladas
  - Animações hover nos cards da tripulação
- **Simplificada** a seção de links, mantendo apenas links externos relevantes

## Melhorias Futuras Possíveis

1. Adicionar fotos dos tripulantes
2. Incluir biografias dos astronautas
3. Implementar linha do tempo da carreira dos tripulantes
4. Adicionar estatísticas de voos anteriores da tripulação
5. Incluir gráficos de telemetria (quando disponível)