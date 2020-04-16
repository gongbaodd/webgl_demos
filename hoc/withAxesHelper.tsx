import { FC } from "react";
import { useRef, useLayoutEffect } from "react";
import { AxesHelper, GridHelper, Material } from "three";

interface DebugProps {
  debug: boolean;
}

const withAxesHelper: (Component: FC) => FC<DebugProps> = (Component: FC) => ({
  children,
  debug,
}) => {
  const axes = useRef<AxesHelper>();
  const grid = useRef<GridHelper>();

  useLayoutEffect(() => {
    if (axes.current) {
      axes.current.renderOrder = 1;
      (axes.current.material as Material).depthTest = false;
      axes.current.visible = debug;
    }

    if (grid.current) {
      grid.current.renderOrder = 1;
      (grid.current.material as Material).depthTest = false;
      grid.current.visible = debug;
    }
  });

  return (
    <Component>
      <axesHelper ref={axes} name="AxesHelper"></axesHelper>
      <gridHelper ref={grid} name="GridHelper"></gridHelper>
      {children}
    </Component>
  );
};

export default withAxesHelper;
