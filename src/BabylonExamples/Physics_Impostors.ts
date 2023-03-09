import {
  Scene,
  Engine,
  SceneLoader,
  FreeCamera,
  Vector3,
  HemisphericLight,
  CannonJSPlugin,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as CANNON from "cannon";

export class Physics_Impostors {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera(
      "camera",
      new Vector3(0, 10, -20),
      this.scene
    );
    camera.attachControl();
    camera.setTarget(Vector3.Zero());
    camera.minZ = 0.5;
    new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);

    scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );
    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Prototype_Level.glb",
      this.scene
    );
  }
}
