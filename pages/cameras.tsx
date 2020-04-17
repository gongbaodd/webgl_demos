import dynamic from "next/dynamic";

const Cameras = dynamic(() => import("../playgrounds/cameras"));

export default () => <Cameras />;
