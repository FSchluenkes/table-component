'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { TableProps } from './table.types';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
  Active,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';

import {
  DraggableTableHeader,
  DraggableTableHeaderOverlay,
} from './DraggableTableHeader';
import { DragAlongCell } from './DragAlongCell';
import { useMemo, useState } from 'react';
import { SortableHeaderOverlay } from './SortableHeaderOverlay';
import styles from './table.module.css';
import { createPortal } from 'react-dom';

const Table: React.FC<TableProps> = ({
  data,
  columns,
  columnOrder,
  setColumnOrder,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
  });

  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => table.getFlatHeaders().find((header) => header.id === active?.id),
    [active, columns]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActive(event.active);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
    setActive(null);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 3,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActive(null)}
      sensors={sensors}
    >
      {/* {createPortal(
        <SortableHeaderOverlay>
        {activeItem ? (
          <DraggableTableHeaderOverlay
            key={activeItem.id}
            header={activeItem}
            className={styles.headerCell}
          />
        ) : null}
      </SortableHeaderOverlay>,
        document.body
      )} */}
      <SortableHeaderOverlay>
        {activeItem ? (
          <DraggableTableHeaderOverlay
            key={activeItem.id}
            header={activeItem}
            className={styles.headerCell}
          />
        ) : null}
      </SortableHeaderOverlay>
      <div style={{ backgroundColor: 'white' }}>
        <table>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <SortableContext
                    id={cell.id}
                    key={cell.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DragAlongCell key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
              </tr>
            ))}
          </tbody>

          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <SortableContext
                  id={'header'}
                  key={'header'}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => (
                    <DraggableTableHeader
                      key={header.id}
                      header={header}
                      className={styles.headerCell}
                    />
                  ))}
                </SortableContext>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </DndContext>
  );
};

export default Table;
