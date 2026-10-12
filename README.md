# T-Acordes · versão web

Recriação para navegador do aplicativo educativo T-Acordes, a partir da análise estática de seu APK com REA. Construa tríades e tétrades, veja a cifra e a partitura, escute as notas e consulte os fundamentos originais.

**Abrir:** https://glauberlasantiago.github.io/t-acordes/

## Funcionalidades

- Seletores de fundamental, acidente, terça, quinta e sétima, com as 11 combinações válidas do app original.
- Grafia diatônica correta, incluindo bemóis e sustenidos duplos quando necessários.
- Partitura em SVG, cifras, nomes das notas e estrutura intervalar.
- Reprodução de acordes e arpejos com Web Audio; música ambiente original opcional.
- Fundamentos: tríades, tétrades, montagem de acordes e cifras, com os textos e diagramas recuperados do APK.
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

A recuperação identificou as cenas MainMenu, AllInOne, TheoryMenu, leitura de fundamentos e créditos. O código do APK também contém classes herdadas de outros jogos, sem cenas correspondentes; esses modos não foram incluídos.

As combinações e cifras foram reconstruídas a partir de `ButtonManager.VerifyConditions`, `GetAcordeName.Update` e recursos serializados. A versão web reorganiza a apresentação e acrescenta partitura dinâmica e áudio sintetizado dos acordes. Não é uma exportação WebGL do projeto Unity e não recupera o projeto original. A sétima diminuta mantém a grafia teórica correta (por exemplo, Dó–Mi♭–Sol♭–Si♭♭).

Os recursos de texto, imagens e música em `assets/` foram recuperados do APK fornecido pelo proprietário do repositório. A disponibilização desses recursos mantém os créditos abaixo; este repositório não acrescenta uma licença de terceiros que não estava presente no pacote original.

## Créditos originais

- Conceito e música: Glauber Santiago e Terence P. Santos.
- Programação: Elias Ximenes.
- Arte: Emyr Ferrario.
- iMAX Games e MZO Interativa.
- Universidade Federal de São Carlos, UAB UFSCar, SEaD e Licenciatura em Educação Musical.

Veja [a análise de reconstrução](docs/reconstruction.md) para fontes e limitações.
