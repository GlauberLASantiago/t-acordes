# T-Acordes · versão web

Recriação para navegador do aplicativo educativo T-Acordes, conferida com o executável Windows e o pacote `T-AcordesDeploy4.zip` usando REA. Construa tríades e tétrades, veja a cifra e a partitura, escute as notas e consulte os fundamentos originais.

**Abrir:** https://glauberlasantiago.github.io/t-acordes/

## Funcionalidades

- Seletores de fundamental, acidente, terça, quinta e sétima, com as 11 combinações válidas do app original.
- Grafia diatônica correta, incluindo bemóis e sustenidos duplos quando necessários.
- Partitura em SVG, cifras, nomes das notas e estrutura intervalar.
- Menu com logo, fundo e botões recuperados do Windows, com a paleta creme e vinho do original.
- Reprodução de acordes e arpejos com Web Audio; trilha de menu e quatro músicas ambiente originais opcionais.
- Fundamentos: tríades, tétrades, montagem de acordes e cifras, com os textos e diagramas originais.
- Interface responsiva, uso por teclado e preferências locais.

## Executar localmente

É necessário Node.js 20 ou superior. Não há dependências para instalar.

```sh
npm start
```

Abra http://127.0.0.1:4186. Testes da lógica musical:

```sh
npm test
```

Também é possível servir a pasta com qualquer servidor HTTP estático. O app não exige backend, Unity, plugins ou contas. Dados locais ficam no navegador; limpar o armazenamento do site os remove. O navegador exige interação do usuário para iniciar áudio.

## Publicação

O conteúdo estático da branch `main` é servido pelo GitHub Pages. Todos os caminhos de recursos são relativos para funcionar sob `/t-acordes/`.

## Fidelidade e adaptações

A recuperação identificou as cenas MainMenu, AllInOne, TheoryMenu, leitura de fundamentos e créditos. A execução do Windows confirmou os modos Criar Acorde e Fundamentos. Há classes de jogo compiladas, mas nenhum componente GameController ligado às cenas publicadas: esta versão não oferece carreira, pontuação ou desafios. Veja [a conferência Windows](docs/original-windows.md) e [as ligações das cenas](docs/scene-verification.md).

As combinações e cifras foram reconstruídas a partir de `ButtonManager.VerifyConditions`, `GetAcordeName.Update` e recursos serializados. A versão web mantém os seletores de intervalos, recupera o visual do menu e adapta a apresentação a celulares. Partitura dinâmica, acordes salvos e áudio sintetizado dos acordes são melhorias web. O pacote Windows não contém amostras de piano; as trilhas de fundo são originais. Não é uma exportação WebGL do projeto Unity e não recupera o projeto original. A sétima diminuta mantém a grafia teórica correta (por exemplo, Dó–Mi♭–Sol♭–Si♭♭).

Os recursos de texto, imagens e música em `assets/` foram recuperados dos pacotes Android e Windows fornecidos pelo proprietário do repositório. A disponibilização desses recursos mantém os créditos abaixo; este repositório não acrescenta uma licença de terceiros que não estava presente no pacote original.

## Créditos originais

- Conceito e música: Glauber Santiago e Terence P. Santos.
- Programação: Elias Ximenes.
- Arte: Emyr Ferrario.
- iMAX Games e MZO Interativa.
- Universidade Federal de São Carlos, UAB UFSCar, SEaD e Licenciatura em Educação Musical.

Veja [a análise de reconstrução](docs/reconstruction.md) para fontes e limitações.
