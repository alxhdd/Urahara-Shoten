import { useState, useEffect, useRef, useCallback } from "react";

const BASE = "/kisuke-assets/";

type Color = "dark" | "yellow" | "orange";
type Position = "empty" | "idle" | "idle-front" | "idle-front-right" | "car-idle";

type ImageRegistry = Record<Color, Partial<Record<Position, [string, string]>>>;

const POSITIONS: ImageRegistry = {
  dark: {
    empty: ["dark.png", "dark.png"],
    idle: ["dar-idle-1.png", "dark-idle-2.png"],
    "idle-front": ["dark-idle-front-1.png", "dark-idle-front-2.png"],
    "idle-front-right": ["dark-idle-front-1-right.png", "dark-idle-front-2-right.png"],
    "car-idle": ["dark-car-idle-1.png", "dark-car-idle-2.png"],
  },
  orange: {
    empty: ["orange.png", "orange.png"],
    idle: ["orange-idle-1.png", "orange-idle-2.png"],
    "idle-front": ["orange-idle-front-1.png", "orange-idle-front-2.png"],
    "car-idle": ["orange-car-idle-1.png", "orange-car-idle-2.png"],
  },
  yellow: {
    empty: ["yellow.png", "yellow.png"],
    idle: ["yellow-idle-1.png", "yellow-idle-2.png"],
    "idle-front": ["yellow-idle-front-1.png", "yellow-idle-front-2.png"],
    "idle-front-right": ["yellow-idle-front-1-right.png", "yellow-idle-front-1-right.png"],
    "car-idle": ["yellow-car-idle-1.png", "yellow-car-idle-2.png"],
  },
};

const COLOR_ORDER: Color[] = ["dark", "orange", "yellow"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useShopAnimation() {
  const [src, setSrc] = useState(`${BASE}dark.png`);
  const [transitioning, setTransitioning] = useState(false);

  const colorIndexRef = useRef(0);
  const positionsRef = useRef<Position[]>([]);
  const posIdxRef = useRef(0);
  const frameToggleRef = useRef(false);
  const color = COLOR_ORDER[colorIndexRef.current];

  const getSrc = useCallback((c: Color, p: Position, frame: boolean) => {
    const pair = POSITIONS[c][p];
    if (!pair) return BASE + (POSITIONS[c].empty?.[0] ?? "dark.png");
    return BASE + (frame ? pair[1] : pair[0]);
  }, []);

  const setImage = useCallback((c: Color, p: Position, frame: boolean) => {
    const newSrc = getSrc(c, p, frame);
    setSrc((prev) => {
      if (prev.endsWith(newSrc.split("/").pop()!)) return prev;
      return newSrc;
    });
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 300);
  }, [getSrc]);

  useEffect(() => {
    let frameTimer: ReturnType<typeof setInterval>;
    let sceneTimer: ReturnType<typeof setTimeout>;
    let colorTimer: ReturnType<typeof setTimeout>;
    let mounted = true;

    function startFrameLoop(c: Color, p: Position) {
      clearInterval(frameTimer);
      frameToggleRef.current = false;
      frameTimer = setInterval(() => {
        if (!mounted) return;
        frameToggleRef.current = !frameToggleRef.current;
        setImage(c, p, frameToggleRef.current);
      }, 600);
    }

    function nextPosition() {
      const c = COLOR_ORDER[colorIndexRef.current];
      posIdxRef.current = (posIdxRef.current + 1) % positionsRef.current.length;
      const pos = positionsRef.current[posIdxRef.current];
      frameToggleRef.current = false;
      setImage(c, pos, false);
      startFrameLoop(c, pos);

      clearTimeout(sceneTimer);
      const delay = pos === "empty" ? 1500 : 9000 + Math.random() * 3000;
      sceneTimer = setTimeout(nextPosition, delay);
    }

    function nextColor() {
      clearInterval(frameTimer);
      clearTimeout(sceneTimer);

      colorIndexRef.current = (colorIndexRef.current + 1) % COLOR_ORDER.length;
      const c = COLOR_ORDER[colorIndexRef.current];
      positionsRef.current = shuffle(Object.keys(POSITIONS[c])) as Position[];
      posIdxRef.current = 0;

      const firstPos = positionsRef.current[0];
      frameToggleRef.current = false;
      setImage(c, firstPos, false);
      startFrameLoop(c, firstPos);

      clearTimeout(colorTimer);
      colorTimer = setTimeout(nextColor, 25000 + Math.random() * 10000);

      const posDelay = firstPos === "empty" ? 1500 : 9000 + Math.random() * 3000;
      sceneTimer = setTimeout(nextPosition, posDelay);
    }

    // Boot
    const initialColor: Color = COLOR_ORDER[0];
    positionsRef.current = shuffle(Object.keys(POSITIONS[initialColor])) as Position[];

    setImage(initialColor, "empty", false);

    const bootTimer = setTimeout(() => {
      if (!mounted) return;
      posIdxRef.current = 0;
      if (positionsRef.current[0] === "empty") {
        positionsRef.current.shift();
        positionsRef.current.push("empty");
      }
      const firstPos = positionsRef.current[0];
      frameToggleRef.current = false;
      setImage(initialColor, firstPos, false);
      startFrameLoop(initialColor, firstPos);

      const posDelay = 9000 + Math.random() * 3000;
      sceneTimer = setTimeout(nextPosition, posDelay);
    }, 1200);

    colorTimer = setTimeout(nextColor, 25000 + Math.random() * 10000);

    return () => {
      mounted = false;
      clearInterval(frameTimer);
      clearTimeout(sceneTimer);
      clearTimeout(colorTimer);
      clearTimeout(bootTimer);
    };
  }, [setImage]);

  return { src, transitioning, color };
}
