import { Engine, Scene, FreeCamera } from "react-babylonjs";
import { Vector3 } from "@babylonjs/core";

const Playground = () => {
  return (
    <div className="App">
      {/* <Engine canvasId="sample-canvas">
        <Scene>
          <FreeCamera
            name="camera1"
            position={new Vector3(0, 5, -10)}
            target={Vector3.Zero()}
          />
          <HemisphericLight
            name="light1"
            intensity={this.state.intensity}
            direction={Vector3.Up()}
          />
          <Box name="box" size={4} position={new Vector3(0, 1, 0)}>
            <RotateMeshBehavior
              radians={this.state.clockwiseChecked ? 0.01 : -0.01}
              axis={Axis.Y}
            />
          </Box>
        </Scene>
      </Engine> */}
    </div>
  );
};

export default Playground;
