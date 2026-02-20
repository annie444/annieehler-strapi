let gridId = "";
let itemClass = "";
let contentClass = "";

export function resizeGridItem(item: HTMLElement) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  const gridStyle = window.getComputedStyle(grid);
  const rowHeight = parseInt(gridStyle.getPropertyValue("grid-auto-rows"), 10) || 1;
  const rowGap = parseInt(gridStyle.getPropertyValue("grid-row-gap"), 10) || 0;

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
