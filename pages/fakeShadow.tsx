import dynamic from "next/dynamic";

const FakeShadow = dynamic(() => import("../playgrounds/fakeShadow"));

export default () => <FakeShadow />;
