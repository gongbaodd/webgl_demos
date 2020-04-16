import { FC } from "react";
import { useRef, useLayoutEffect } from "react";
import { AxesHelper, Material } from "three";

const withAxesHelper: (Component: FC) => FC = (Component: FC) => ({
  children,
}) => {
  const axes = useRef<AxesHelper>();
  useLayoutEffect(() => {
    if (axes.current) {
      axes.current.renderOrder = 1;
      (axes.current.material as Material).depthTest = false;
    }
  });

  return (
    <Component>
      <axesHelper ref={axes} name="AxesHelper"></axesHelper>
      {children}
    </Component>
  );
};

export default withAxesHelper;
