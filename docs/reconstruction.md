# Reconstrução do APK

APK de referência: T-Acordes.apk, Unity 3.4.1f5, C# e Mono, ARM de 32 bits.

SHA-256: `fafe885bcca6ff51b2d3be849fdaabda2389e09a4898f38599cf59868efcc085`.

REA extraiu o arquivo, inventariou os assemblies e decodificou metadados e instruções CIL. A descompilação do DEX pelo JADX não estava disponível. A reconstrução usa as cenas e TextAssets serializados, as instruções CIL do assembly e os recursos de áudio/imagem; não houve execução do APK.

## Combinações recuperadas

| Terça | Quinta | Sétima | Cifra em Dó |
|---|---|---|---|
| Maior | Justa | Ausente | C |
| Menor | Justa | Ausente | Cm |
| Maior | Aumentada | Ausente | C+ |
| Menor | Diminuta | Ausente | Cdim |
| Maior | Justa | Maior | CMaj7 |
| Maior | Justa | Menor | C7 |
| Menor | Justa | Menor | Cm7 |
| Menor | Justa | Maior | Cm(Maj7) |
| Maior | Diminuta | Menor | C7(b5) |
| Menor | Diminuta | Menor | Cm7(b5) |
| Menor | Diminuta | Diminuta | Cdim7 |

O original salta as fundamentais Dó♭, Mi♯, Fá♭ e Si♯. As demais 17 grafias são preservadas. Sua base de funções harmônicas estava quase inteiramente vazia; não se inventou um analisador harmônico com base nessa tabela.

## Evidências REA

- Inventário: `ev_874e56de32bfcca1ef4cc6b892115d7e413299d441d7873821107172d9db4a10`.
- Assembly: `ev_32367abf90db3ad7759c28166fef2b49f9612df3a672d121367590b2221f225f`.
- Membros/CIL: `ev_85296973f822aa00fdb192b515eb0f6681f1d7f693e5e6e7a5e8866a7aefd699`.

O inventário de membros reporta cobertura parcial. Os textos e diagramas educacionais são os recursos originais; a interface, partitura dinâmica e síntese de áudio são implementação web nova. O áudio real do navegador depende de suas políticas de reprodução e do dispositivo.
