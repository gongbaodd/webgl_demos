import dynamic from "next/dynamic";

const RenderTarget = dynamic(() => import("../playgrounds/renderTarget"));

export default () => <RenderTarget />;
