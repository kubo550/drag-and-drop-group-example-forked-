import React from "react";

type Group = {
  title: string;
  items: string[];
};

type Module = {
  id: string;
  name: string;
};

type Props = {
  data: Group[];
  modules: Module[];
};

type DragParams = {
  grpIdx: number;
  itemIdx: number;
};

export default function DragNDrop({ data, modules }: Props) {
  const initialList = data.map((group) => ({
    ...group,
    items: group.items.map((item) => modules.find((m) => m.id === item)),
  }));

  const [list, setList] = React.useState(initialList);
  const [dragging, setDragging] = React.useState(false);
  const dragItem = React.useRef<DragParams | null>();
  const dragItemNode = React.useRef<any>();

  const handleDragEnd = (e) => {
    console.log("ending drag...");
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: DragParams
  ) => {
    console.log("drag starting...", item);
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, targetItem) => {
    console.log("TARGETITEM = ", targetItem);
    console.log("entering drag...", targetItem);
    if (dragItemNode.current !== e.target) {
      console.log("Target is NOT the same as dragged item");
      setList((oldList) => {
        let newList = [...oldList];
        newList[targetItem.grpIdx].items.splice(
          targetItem.itemIdx,
          0,
          newList[dragItem.current?.grpIdx!].items.splice(
            dragItem.current?.itemIdx,
            1
          )[0]
        );
        dragItem.current = targetItem;
        return newList;
      });
    }
  };

  const getStyles = (item: DragParams) => {
    if (
      dragItem.current?.grpIdx === item.grpIdx &&
      dragItem.current?.itemIdx === item.itemIdx
    ) {
      return `dnd-item current`;
    }
    return "dnd-item";
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpIdx) => (
        <div
          key={grp.title}
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpIdx, itemIdx: 0 })
              : undefined
          }
          className="dnd-group"
        >
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemIdx) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, { grpIdx, itemIdx })}
              onDragEnter={
                dragging ? (e) => handleDragEnter(e, { grpIdx, itemIdx }) : null
              }
              onDragOver={(e) => e.preventDefault()}
              key={item}
              className={dragging ? getStyles({ grpIdx, itemIdx }) : "dnd-item"}
            >
              {item?.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
