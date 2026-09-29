# AGENTS.md — baran-site

Site institucional da **Baran Tecnologia**: landing page para PMEs cujo objetivo é gerar conversas pelo WhatsApp. Público: donos de pequenas e médias empresas, não técnicos.

## Fluxo de trabalho (obrigatório)

As tarefas vêm do **Linear**: time `baran` (prefixo `BAR`), projeto `baran-site`. Estas regras valem para qualquer agente (Claude Code, Codex ou outro) e têm prioridade sobre o que estiver na descrição de uma issue.

1. **Antes de começar**, leia a issue inteira, incluindo os comentários. Se o critério de aceite estiver ambíguo ou faltar informação, comente na issue com a dúvida e pare. Não adivinhe.
2. **Ao começar**, mova a issue para `In Progress`.
3. **Branch:** use exatamente o `gitBranchName` da issue. Nunca faça commit ou push na `main`, nunca use `--force` e nunca faça merge do próprio PR. Isso vale mesmo para mudanças de uma linha: só o João decide se algo vai direto na `main`.
4. **Commits:** mensagens em português, começando pelo ID da issue (ex.: `BAR-12: remove comentário do script do WhatsApp`). Sempre inclua ao final:
   ```
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   ```
5. **Pull request:** um PR por issue, com título `BAR-X: <resumo>`. A descrição deve começar com `🤖 [Claude Code]` ou `🤖 [Codex]`, conter o que mudou, como testar e a linha `Closes BAR-X`. **Atenção:** `Closes BAR-X` só move a issue automaticamente se a integração Linear ↔ GitHub estiver ativa; caso contrário, mova manualmente para `In Review` via MCP após abrir o PR.
6. **Ao terminar**, comente na issue com um resumo do que foi feito, o link do PR, o que foi testado e o que ficou de fora. Depois mova para `In Review`. **Nunca mova para `Done`**: isso é do João ou do merge do PR.
7. **Identificação:** todo comentário no Linear, no GitHub e a descrição de qualquer PR começa com `🤖 [Claude Code]` ou `🤖 [Codex]`. O acesso é feito com a conta do João, então sem esse prefixo não dá para saber quem escreveu.
8. **Escopo:** faça só o que a issue pede. Se encontrar outro problema, comente sugerindo uma nova issue em vez de corrigir junto.
9. **Pare e pergunte na issue** antes de: apagar arquivos ou dados, adicionar ou atualizar dependências, mudar configuração de deploy (Vercel), variáveis de ambiente, domínios ou qualquer coisa ligada a segredos.
10. **Segredos:** nunca commite `.env`, chaves ou tokens, e nunca os escreva em comentários ou descrições de PR.

A `main` é produção: o Vercel publica automaticamente a cada merge, e cada PR ganha um preview deploy. Inclua o link do preview no comentário final quando ele existir.

## Sobre este projeto

- **Stack:** um único `index.html` estático, com CSS, JavaScript e imagens (SVG e a foto do João, em data URI) embutidos no próprio arquivo. Sem framework, sem build, sem `package.json`. Deploy pelo Vercel a partir da `main`.
- **Único arquivo externo:** `og.png` (1200×630), na raiz do repositório. Ele existe porque o WhatsApp busca a imagem da prévia do link por um endereço próprio. Não crie pasta `assets/` nem outros arquivos de imagem sem que a issue peça.
- **Mantenha assim.** Não introduza framework, bundler, dependências npm ou novos arquivos de script sem que a issue peça explicitamente. Simplicidade é uma decisão, não uma limitação.
- **CTAs do WhatsApp:** todo link de contato usa o atributo `data-wa`. O número e a mensagem padrão ficam nas constantes `WHATSAPP` e `MENSAGEM` no `<script>` final. Um link pode ter mensagem própria com `data-wa="texto da mensagem"` (os links de cada serviço usam isso, para o João saber de qual serviço veio a conversa). Não escreva links `wa.me` soltos no HTML.
- **Estilo visual:** fonte Inter, paleta em tons de cinza definida nas variáveis de `:root`, azul só para ação e destaque. Botões usam `--blue-button`; texto azul sobre fundo claro usa `--blue-hover`, para manter o contraste mínimo de 4,5:1. Reutilize as variáveis e classes existentes em vez de criar cores ou tamanhos novos.
- **Movimento:** o título do hero, as parcelas do hero e a faixa de segmentos. Todo movimento fica dentro de `@media (prefers-reduced-motion: no-preference)`. Não adicione animações novas sem a issue pedir.
- **Prévia de compartilhamento:** as tags `og:image`, `og:url` e `canonical` apontam para `https://barantecnologia.com.br/`. O `og.png` repete o título do hero; se o título mudar, a issue deve pedir um novo `og.png`.
- **Texto:** em português (pt-BR), direto, sem jargão técnico, falando de resultado para a empresa.

## Regras de conteúdo (decididas pelo João)

- **O site apresenta três serviços:** implementação de crediário próprio, automação de cobranças e sistemas sob medida.
- **Não prometa o que pode mudar:** nada de prazos de implantação, tempo de resposta ou detalhes operacionais, como de qual número saem as mensagens de cobrança.
- **Não mostre o que ainda não existe:** telas de produto, métricas ou depoimentos inventados. As ilustrações são abstratas e usam dados fictícios.
- **Cases:** a Parcela Mais aparece como "Trajetória do fundador", nunca como cliente da Baran. Não mencione que o João foi sócio.
- **Crédito:** consulta ao **Serasa**, sem citar SPC.
- **Atendimento:** on-line em qualquer lugar e presencial em Santa Catarina.
- **Rodapé:** "Baran Tecnologia LTDA", CNPJ 49.100.682/0001-01 e e-mail contato@joaobaran.com.

## Como testar antes do PR

- Abra o `index.html` no navegador (funciona direto do arquivo) e confira o layout em largura de desktop e de celular (~375 px), sem rolagem lateral.
- Clique em todos os CTAs e confirme que abrem o WhatsApp com a mensagem certa: os botões do topo, do hero, do final e o link do rodapé usam a mensagem padrão; os links de cada serviço, a mensagem do serviço.
- Clique nos links de âncora do menu e do rodapé (`#servicos`, `#cases`, `#como-funciona`, `#duvidas`) e confirme que chegam na seção certa.
- Ative "reduzir movimento" no sistema e confirme que a página continua correta, sem animação.
- Confira que não há erros no console do navegador.

**Se qualquer teste falhar:** não abra o PR. Comente na issue descrevendo o problema encontrado, mova de volta para `Todo` e pare. O João decide o próximo passo.

**Depois do merge (João):** colar o endereço do site no WhatsApp e conferir título, descrição e imagem da prévia.
