# Conferência de jogo na versão Windows

Análise em 12/10/2026 com REA e observação do programa em execução via Computer Use.

## Identidade

Executável solicitado: `G:\Meu Drive\UAB EM\UAB - Projetos de Unity\ParaCDFortfolio\Arquivos\Projeto - Jogos da Série T\Windows\T-Acordes.exe`.

SHA-256: `fb005d775329408d81dd87b42c71bb362b1acecea8d3e4dd1623aa4075f99840`.

O executável estava sem sua pasta de dados na pasta fornecida. O pacote adjacente `T-AcordesDeploy4.zip` contém o mesmo executável, confirmado por SHA-256, e a pasta `T-Acordes_Data`. O REA extraiu esse pacote para uma pasta temporária; a observação usou essa cópia completa.

SHA-256 do ZIP: `991331eff0875480547fd25c4357301a895ddbd1e97ce6ca9fad8ab7e4316ce0`.

## Resultado

Não foi encontrado um modo de desafios, pontuação, carreira ou treino conectado nesta versão. Há classes de jogo compiladas, mas elas não estão ligadas às cenas publicadas.

Em execução, o menu mostra Criar Acorde e Fundamentos, além de sair, ajuda, áudio e Sobre. Criar Acorde abre o construtor de fundamental/acidente/terça/quinta/sétima. Fundamentos abre os quatro capítulos Tríades, Tétrades, Montagem de acordes e Cifras.

A ajuda mostra “Clique aqui para começar a jogar” apontando para o logotipo. O primeiro clique fechou a ajuda; um novo clique no logotipo não abriu outra tela. A análise da ligação dos componentes confirmou que o logotipo não possui destino de cena jogável. A interpretação de que a mensagem seja uma sobra de interface de outra versão é uma inferência; sua presença e a ausência dessa ligação são observações.

## Ligações estáticas

Na cena level0, há exatamente três componentes GoButton, todos habilitados:

- pathID 163, offset 9056: AboutButton → About.
- pathID 164, offset 9096: ButtonFundamentos → TheoryMenu.
- pathID 166, offset 9160: ButtonAnalisarAcorde → AllInOne.

O logotipo/BG (pathID 5) possui BlockButton, sem ligação GoButton para outra cena. O script GameController existe no sharedassets0 (pathID 27), mas não tem componentes MonoBehaviour associados em mainData ou level0–level4. Essas ligações são iguais nas versões Windows e Android examinadas.

Lista de cenas no mainData:

- Assets/NewScenes/Intro.unity
- MainMenu.unity
- AllInOne.unity
- About.unity
- Assets/Scenes/Theory.unity
- TheoryMenu.unity

## Comparação com Android

Ambas as versões contêm 118 entradas TypeDef e 497 métodos. Na comparação por tipo, nome e hash dos bytes CIL, 496 métodos têm hashes idênticos. O único método diferente é ExitButton.Awake. Isso é uma comparação estática dos corpos CIL, não uma prova de equivalência de todos os dados de execução.

## Evidências

- Inventário Windows: `ev_288ab4ceae941940429bd36b1228b6138040b2a22d4054e4f1d51a6312c65deb`.
- Extração: `ev_e5f8427be807e710af4a5aab1c13a4d4026c8d3f978dad635e38830d81534aca`.
- Assembly: `ev_e3a7601ce77e94f4090feac289b7f6588a3160228b5e22c1c178a56eab026357`.
- Membros/CIL: `ev_94c91941a5a43b13f70e1dfc9c668435f01703c606b74550fdfdb7fd97f6b7dc`.

As ligações das cenas foram verificadas por leitura local dos objetos Unity serializados; a interface foi observada em execução. Capturas salvas: T-Acordes-Windows-menu.png, T-Acordes-Windows-construtor.png e T-Acordes-Windows-fundamentos.png.

Esta conclusão é limitada ao executável e pacote identificados acima. Outras versões do T-Acordes não foram examinadas nesta conferência.
