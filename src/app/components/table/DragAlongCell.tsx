'use client';

import { Cell } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';

export const DragAlongCell = ({ cell }: { cell: Cell<any, unknown> }) => {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: cell.column.id,
  });
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition,
    width: cell.column.getSize(),
    zIndex: 0,
  };
  return (
    <td style={style} ref={setNodeRef} key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
