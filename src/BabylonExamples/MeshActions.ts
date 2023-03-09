import {
  InterpolateValueAction,
  IncrementValueAction,
  SetValueAction,
  ActionManager,
  AbstractMesh,
  Color3,
  PBRMaterial,
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  CubeTexture,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class MeshActions {
  scene: Scene;
  engine: Engine;
  cube: AbstractMesh;
  sphere: AbstractMesh;
  cylinder: AbstractMesh;
  sphereMat: PBRMaterial;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateMeshes();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    new FreeCamera("camera", new Vector3(0, 0, -8), scene);

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/xmas_bg.env",
      scene
    );

    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true, 1000, 0.2, true);
    scene.environmentIntensity = 1.5;

    return scene;
  }

  async CreateMeshes(): Promise<void> {
    this.sphereMat = new PBRMaterial("sphereMat", this.scene);
    this.sphereMat.albedoColor = new Color3(1, 0, 0);
    this.sphereMat.roughness = 1;

    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "gifts.glb",
      this.scene
    );

    this.cube = meshes[1];
    this.sphere = meshes[2];
    this.cylinder = meshes[3];

    this.cylinder.rotation = new Vector3(-Math.PI / 4, 0, 0);
    this.sphere.material = this.sphereMat;
    this.CreateActions();
  }

  CreateActions(): void {
    this.cube.actionManager = new ActionManager(this.scene);
    this.sphere.actionManager = new ActionManager(this.scene);
    this.cylinder.actionManager = new ActionManager(this.scene);

    this.cube.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPickDownTrigger,
        this.cube,
        "scaling",
        new Vector3(1.5, 1.5, 1.5)
      )
    );
    this.sphere.actionManager
      .registerAction(
        new InterpolateValueAction(
          ActionManager.OnPickDownTrigger,
          this.sphereMat,
          "roughness",
          0,
          3000
        )
      )
      .then(
        new InterpolateValueAction(
          ActionManager.NothingTrigger,
          this.sphereMat,
          "roughness",
          1,
          3000
        )
      );
    this.scene.actionManager.registerAction(
      new IncrementValueAction(
        ActionManager.OnEveryFrameTrigger,
        this.cylinder,
        "rotation.x",
        0.01
      )
    );
  }
}
