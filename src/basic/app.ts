import setup from "./components";

const init = async () => {
  const ctx = await setup();

  {
    // append dom
    const container = document.getElementById("gl-output");

    if (ctx.renderer && container) {
      container.appendChild(ctx.renderer.domElement);
    }
  }

  {
    // animate
    const render = () => {
      if (ctx.renderer && ctx.camera && ctx.scene) {
        ctx.renderer.render(ctx.scene, ctx.camera);
      }
      requestAnimationFrame(render);
    };

    render();
  }
};

init();
