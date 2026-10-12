# Validação

Em 12/10/2026:

- Seis testes automatizados da lógica musical passaram: grafia de tríades, sétima diminuta com bemol duplo, intervalos e inversões de todas as fundamentais/tipos, comparação de notas, afinação e SVG, geração de acordes válidos.
- As 11 combinações do original foram selecionadas na interface real do navegador; todas produziram as cifras esperadas em Dó.
- Fá sustenido maior com sétima maior produziu Fá♯, Lá♯, Dó♯ e Mi♯.
- Favorito e seleção atual foram preservados após recarregar a página.
- Reprodução de acorde e parada foram verificadas pelos estados da interface; reprodução da trilha original foi iniciada com ação explícita e pausada.
- Capítulos Tríades e Montagem de acordes carregaram textos e links dos diagramas na ordem original.
- Tela de 390 × 844 foi verificada: controles legíveis, layout em coluna e ausência de transbordamento horizontal.
- Nenhum erro ou aviso foi registrado no console durante essas verificações.

Os testes de áudio verificam início de reprodução e estados do navegador, não uma avaliação acústica com microfone. Não foi feito teste físico em todos os dispositivos móveis nem comparação em execução com o APK.
