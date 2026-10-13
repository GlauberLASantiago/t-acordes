# Shipped scene verification: T-Acordes

Windows package and Android APK have identical scene bindings for the menu.

## Active navigation components in level0

| MonoBehaviour pathID | File offset | GameObject | Script | Enabled | Target scene |
|---|---:|---|---|---|---|
| 163 | 9056 | AboutButton | GoButton | 1 | About |
| 164 | 9096 | ButtonFundamentos | GoButton | 1 | TheoryMenu |
| 166 | 9160 | ButtonAnalisarAcorde | GoButton | 1 | AllInOne |
| 167 | 9200 | Controller | MainMenuController | 1 | none |

The BG/logo object (GameObject pathID 5) contains Transform 38, MeshFilter 101, MeshRenderer 72, MonoBehaviour 147 (BlockButton), and BoxCollider 124. It contains no GoButton and no navigation target. MonoBehaviour 147 at file offset 8144 binds sharedassets0.assets MonoScript pathID 50, named BlockButton. Its object is active.

The stale game-help balloon is separate GameObject balloonCarreer (pathID 22). Its scripts are PlatformAlternativeBalloon and HelpBalloon; it contains the text Clique aqui para começar a jogar and its Android alternative Toque aqui para começar a jogar. Those scripts display help; they do not load a gameplay scene.

GameController MonoScript is present in sharedassets0.assets at pathID 27, but no MonoBehaviour instance in mainData or any level0-level4 binds that script. No ModeButton or ExerciseModeButton component is bound in those scenes either.

## Build scene list in mainData

- Assets/NewScenes/Intro.unity
- Assets/NewScenes/MainMenu.unity
- Assets/NewScenes/AllInOne.unity
- Assets/NewScenes/About.unity
- Assets/Scenes/Theory.unity
- Assets/Scenes/TheoryMenu.unity

No career, quiz, defeat, victory or game staff scene is shipped. References to SwitchProfile in inert labels in About/Theory are leftover; SwitchProfile is absent from build scenes.

## Method

Parsed Unity serialized files version 8. Metadata object tables at fileSize-metadataSize; rows provide pathID, object offset, byte size and class ID. GameObject class 1 provides component pointers, name and active flag. MonoBehaviour class 114 provides GameObject pointer, enabled flag, MonoScript fileID/pathID, and serialized fields. Resolved external fileID2 to sharedassets0.assets; MonoScript class 115 supplies script identity. Compared Windows and Android files independently. This is shipped-artifact static evidence, consistent with observed logo clicks having no effect.
