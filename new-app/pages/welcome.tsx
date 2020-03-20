import dynamic from "next/dynamic";

const Playground = dynamic(() => import("../playgrounds/welcome"));

const Welcome = () => <Playground />;

export default Welcome;
