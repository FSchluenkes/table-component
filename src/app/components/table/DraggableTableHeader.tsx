'use client';

import { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Header } from '@tanstack/react-table';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';

export const DraggableTableHeader = ({
  header,
  className,
}: {
  header: Header<any, unknown>;
  className?: string;
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition,
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style} className={className} key={header.column.id}>
      <div {...attributes} {...listeners} aria-describedby={header.column.id} onClick={() => console.log('sort')} onContextMenu={(e) => {e.preventDefault(); console.log('search modal')}} style={{display: 'flex', width: '100%', padding: '4px'}}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </th>
  );
};

export const DraggableTableHeaderOverlay = ({
  header,
  className,
}: {
  header: Header<any, unknown>;
  className?: string;
}) => {

  // const {
  //   attributes,
  //   listeners,
  //   setNodeRef,
  //   setActivatorNodeRef,
  // } = useSortable({
  //   id: header.column.id,
  // });

  const style: CSSProperties = {
    opacity: 1,
    // position: 'relative',
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    zIndex: 2,
    borderRadius: '10px',
  };

  return (
    <div /*ref={setNodeRef}*/ style={style} className={className} key={header.column.id}>
      <div /*ref={setActivatorNodeRef} {...attributes} {...listeners}*/ aria-describedby={header.column.id} style={{display: 'flex', width: '100%', padding: '4px'}}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </div>
  );
};

