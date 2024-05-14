'use client';
import { type PropsWithChildren } from 'react';
import {
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDndMonitor,
} from '@dnd-kit/core';
import type { DropAnimation } from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
      dragOverlay: {
        // top: '0px',
      },
    },
  }),
};

interface Props {}

export const SortableHeaderOverlay = ({
  children,
}: PropsWithChildren<Props>) => {
  useDndMonitor({
    onDragStart(event) {
      console.log(event);
      console.log(event.active.data.current?.sortable.containerId);
    },
  });

  return (
    <DragOverlay
      dropAnimation={dropAnimationConfig}
      modifiers={[]}
      // key={'header'}
      zIndex={1}
      // style={{top: '10px'}}
    >
      {children}
    </DragOverlay>
  );
};
