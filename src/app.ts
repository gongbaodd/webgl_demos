import { Clock } from "three";
import _debonce from "lodash/debounce";

import setup from "./components";

const init = async () => {
  const ctx = await setup();
  const playground = document.createElement("div");
  document.body.append(playground);

  if (ctx.renderer) {
    playground.appendChild(ctx.renderer.domElement);
  }

  {
    // handle animate
    const clock = new Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      if (ctx.characterMixers) {
        ctx.characterMixers.forEach(mixer => {
          mixer.update(clock.getDelta());
        });
      }

      if (ctx.renderer && ctx.scene && ctx.camera) {
        ctx.renderer.render(ctx.scene, ctx.camera);
      }
    };

    animate();
  }

  {
    // handle on window resize
    const onResize = () => {
      if (ctx.camera) {
        ctx.camera.aspect = window.innerWidth / window.innerHeight;
        ctx.camera.updateProjectionMatrix();
      }

      if (ctx.renderer) {
        ctx.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", _debonce(onResize, 300), false);
  }
};

init();
