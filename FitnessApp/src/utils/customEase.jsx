import { CustomBounce, CustomEase } from "gsap/all";
import { gsap } from "gsap/gsap-core";

gsap.registerPlugin(CustomBounce, CustomEase);

CustomBounce.create("myBounce", {
  strength: 0.4,
  squash: 0,
  squashID: "myBounce",
});

CustomBounce.create("myBounceSmooth", {
  strength: 0.2,
  squash: 0,
  squashID: "myBounceSmooth",
});
