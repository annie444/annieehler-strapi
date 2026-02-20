export interface Point {
  x: number;
  y: number;
}

export enum Position {
  Top = 3,
  Middle = 2,
  Bottom = 1,
}

export enum Side {
  Left = 0,
  Right = 23,
}

export enum State {
  Open = -1,
  Closed = 1,
}

export interface AllPoints {
  top: NodeListOf<SVGRectElement>;
  sideTop: NodeListOf<SVGRectElement>;
  sideMiddle: NodeListOf<SVGRectElement>;
  sideBottom: NodeListOf<SVGRectElement>;
}

export function attachExperienceFolderAnimations() {
  // See @components/experience/ExperienceSection.astro
  const exprSection = document.getElementById("work-experience");
  if (!exprSection) return;

  const experiencesData = exprSection.dataset.experiences;
  if (!experiencesData) return;

  const exprIds = experiencesData.split(",");

  for (const id of exprIds) {
    const el = document.getElementById(id) as HTMLDetailsElement | null;
    if (!el) continue;

    el.addEventListener("toggle", (e) => {
      const target = e.target as HTMLElement;
      animateChildFolder(target);
    });
  }
}

export function animateChildFolder(el: HTMLElement) {
  const folder = el.querySelector("svg.anim-folder") as SVGSVGElement;
  const top = folder.querySelectorAll(
    "rect.anim-folder-top",
  ) as NodeListOf<SVGRectElement>;
  const sideTop = folder.querySelectorAll(
    "rect.anim-folder-side-top",
  ) as NodeListOf<SVGRectElement>;
  const sideMiddle = folder.querySelectorAll(
    "rect.anim-folder-side-middle",
  ) as NodeListOf<SVGRectElement>;
  const sideBottom = folder.querySelectorAll(
    "rect.anim-folder-side-bottom",
  ) as NodeListOf<SVGRectElement>;

  const state = folder.dataset.state as "open" | "closed";
  const startingState = state === "open" ? State.Open : State.Closed;

  let startTime: DOMHighResTimeStamp;

  const firstFrame = (timestamp: DOMHighResTimeStamp) => {
    startTime = timestamp;
    animateCallback(timestamp);
  };

  const animateCallback = (timestamp: DOMHighResTimeStamp) => {
    const next = Math.floor((timestamp - startTime) / 100);

    if (next < 1) {
      requestAnimationFrame(animateCallback);
      return;
    }

    const from = parseInt(folder.dataset.anim ?? "0", 10) as 0 | 1 | 2;
    const to = Math.min(from + 1, 3) as 1 | 2 | 3;

    animateFolder(
      {
        top,
        sideTop,
        sideMiddle,
        sideBottom,
      },
      startingState,
      from,
      to,
    );

    if (to === 3) {
      folder.dataset.state = startingState === State.Open ? "closed" : "open";
      folder.dataset.anim = "0";
    } else {
      folder.dataset.anim = String(to);
      startTime = timestamp;
      requestAnimationFrame(animateCallback);
    }
  };

  requestAnimationFrame(firstFrame);
}

export function animateFolder(
  pts: AllPoints,
  direction: State,
  from: 0 | 1 | 2,
  to: 1 | 2 | 3,
) {
  const topStep = direction * Math.abs(to - from);
  const middleStep = Math.abs(topStep) <= 2 - from ? topStep : 0;
  const bottomStep = direction * (from === 0 ? 1 : 0);

  for (const pt of pts.top) {
    pt.setAttribute("x", String(parseInt(pt.getAttribute("x") ?? "0", 10) + topStep));
    pt.setAttribute("y", String(parseInt(pt.getAttribute("y") ?? "0", 10) + topStep));
  }

  for (const pt of pts.sideTop) {
    pt.setAttribute("x", String(parseInt(pt.getAttribute("x") ?? "0", 10) + topStep));
  }

  for (const pt of pts.sideMiddle) {
    pt.setAttribute("x", String(parseInt(pt.getAttribute("x") ?? "0", 10) + middleStep));
  }

  for (const pt of pts.sideBottom) {
    pt.setAttribute("x", String(parseInt(pt.getAttribute("x") ?? "0", 10) + bottomStep));
  }
}

export function translateTop(pt: Point, ptState: State): Point {
  const translation = ptState * Position.Top;
  return { x: pt.x + translation, y: pt.y + translation };
}

export function translateSideTop(pt: Point, ptState: State): Point {
  const translation = ptState * Position.Top;
  return { x: pt.x + translation, y: pt.y };
}

export function translateSideMiddle(pt: Point, ptState: State): Point {
  const translation = ptState * Position.Middle;
  return { x: pt.x + translation, y: pt.y };
}

export function translateSideBottom(pt: Point, ptState: State): Point {
  const translation = ptState * Position.Bottom;
  return { x: pt.x + translation, y: pt.y };
}

export function closedTop(num: number): Point {
  return { x: num, y: 4 };
}

export function openTop(num: number): Point {
  return translateTop(closedTop(num), State.Closed);
}

export function closedSideTop(num: number, side: Side): Point {
  return { x: side, y: 7 + num };
}

export function openSideTop(num: number, side: Side): Point {
  return translateSideTop(closedSideTop(num, side), State.Closed);
}

export function closedSideMiddle(num: number, side: Side): Point {
  return { x: side, y: 10 + num };
}

export function openSideMiddle(num: number, side: Side): Point {
  return translateSideMiddle(closedSideMiddle(num, side), State.Closed);
}

export function closedSideBottom(num: number, side: Side): Point {
  return { x: side, y: 13 + num };
}

export function openSideBottom(num: number, side: Side): Point {
  return translateSideBottom(closedSideBottom(num, side), State.Closed);
}

export function topPoint(num: number, open: State): Point {
  return open === State.Open ? openTop(num) : closedTop(num);
}

export function sideTopPoint(num: number, side: Side, open: State): Point {
  return open === State.Open
    ? openSideTop(num, side)
    : closedSideTop(num, side);
}

export function sideMiddlePoint(num: number, side: Side, open: State): Point {
  return open === State.Open
    ? openSideMiddle(num, side)
    : closedSideMiddle(num, side);
}

export function sideBottomPoint(num: number, side: Side, open: State): Point {
  return open === State.Open
    ? openSideBottom(num, side)
    : closedSideBottom(num, side);
}
