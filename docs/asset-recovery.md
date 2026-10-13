# Recuperação do pacote Windows T-Acordes

Conferência em 13/10/2026. Os hashes dos arquivos fornecidos continuam idênticos aos examinados no relatório `T-Acordes-Windows-conferencia.md`: executável `fb005d775329408d81dd87b42c71bb362b1acecea8d3e4dd1623aa4075f99840`; ZIP `991331eff0875480547fd25c4357301a895ddbd1e97ce6ca9fad8ab7e4316ce0`.

Reutilizada a extração REA `ev_e5f8427be807e710af4a5aab1c13a4d4026c8d3f978dad635e38830d81534aca`, em `C:\Users\Principal\AppData\Local\Temp\rea-extracted-1c98d998-e607-4f36-b28f-d941124e1a86\T-Acordes_Data`. A leitura local format-aware de todos os arquivos *.assets recuperou 65 Texture2D, 27 TextAsset e 9 AudioClip. A tabela de objetos Unity versão 8 fornece classe, pathID e intervalo de bytes. `inventory.json` registra arquivo fonte/pathID/nome e arquivo recuperado. Nenhuma entrada dessas três classes falhou na conversão.

## Recursos úteis

- Logo: `images/logo512_TAcordes.png`.
- Fundos: `images/bg_mainmenu.png`, `images/bg.png`.
- Botões sem texto: `images/button_mainmenu.png`, `images/button_mainmenu_red.png`, `images/button_blank.png`, `images/button_round_1.png`; seta `images/downArrow.png`.
- Som: ícones `images/sound_*.png`; efeito `audio/gui.wav` e trilha `audio/menu.ogg`.
- Teoria: `text/triades.txt`, `text/tetrades.txt`, `text/montagemdeacordes.txt`, `text/cifras.txt`, imagens `images/img*.png`.
- Créditos: `text/about.txt`, `images/Logos_about.png` e logos institucionais individuais.

Os nove áudios são menu, intro, bg1–bg4, victory, defeat e gui. O pacote examinado não contém amostras de notas de piano na classe AudioClip. A presença de Staff.noteAudios no CIL inativo não prova som de acordes no construtor publicado. Uma reprodução de acordes com síntese seria uma adaptação web.

## Comportamento e limites

As evidências estáticas e de execução anteriores são reutilizáveis porque os hashes coincidem. O menu publicado abre Criar Acorde, Fundamentos e Sobre. Não há cena de jogo ligada ao menu; o logotipo contém BlockButton, sem destino GoButton. Os capítulos de teoria são Tríades, Tétrades, Montagem de acordes e Cifras. O construtor troca fundamental, acidente, terça, quinta e sétima por seletores com repetição circular e condições que pulam combinações inválidas. O CIL ButtonManager.VerifyConditions explicitamente pula Cb, E#, Fb e B# entre fundamentais. A mensagem residual de ajuda “começar a jogar” não foi suficiente para abrir um jogo no runtime observado.

Esta recuperação não exporta um projeto Unity recomposto e não afirma execução de recursos apenas por sua presença. A conclusão de ausência de modo de jogo limita-se ao ZIP e executável com os hashes acima, apoiada nas ligações das cenas e no runtime anterior.
