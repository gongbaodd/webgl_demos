import dynamic from "next/dynamic";

const Solar = dynamic(() => import("../playgrounds/solar"));

export default () => (
  <>
    <Solar />
  </>
);
