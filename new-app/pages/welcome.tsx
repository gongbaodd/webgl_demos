import dynamic from "next/dynamic";

const Playground = dynamic(() => import("../components/PlaygroundWelcome"));

const Welcome = () => <Playground />;

export default Welcome;
