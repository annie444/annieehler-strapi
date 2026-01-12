let gridId = "";
let itemClass = "";
let contentClass = "";

export function resizeGridItem(item: HTMLElement) {
  const grid = document.getElementById(gridId) as HTMLElement;
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"),
  );
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap"),
  );
  const projectContent = item.querySelector(
    `.${contentClass}`,
  ) as HTMLElement | null;
  if (!projectContent) return;
  const rowSpan = Math.ceil(
    (projectContent.getBoundingClientRect().height + rowGap) /
    (rowHeight + rowGap),
  ); // +1 for window decorations
  item.style.gridRowEnd = "span " + rowSpan;
}

export function resizeAllGridItems() {
  const allItems = document.getElementsByClassName(
    itemClass,
  ) as HTMLCollectionOf<HTMLElement>;
  for (const item of allItems) {
    resizeGridItem(item);
  }
}

export function setupMasonryGrid(
  setGridId: string,
  setItemClass: string,
  setContentClass: string,
) {
  gridId = setGridId;
  itemClass = setItemClass;
  contentClass = setContentClass;
}
