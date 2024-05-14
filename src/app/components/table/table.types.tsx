import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

export interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  columnOrder: string[];
  setColumnOrder: Dispatch<SetStateAction<string[]>>;
}
