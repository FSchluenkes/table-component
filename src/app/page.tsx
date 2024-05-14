'use client';
import Table from '@/app/components/table/table';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import mData from './MOCK_DATA.json';

const TableTest = () => {
  const data = useMemo(() => mData, []);
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        id: 'id',
        cell: (info) => info.getValue(),
        size: 50,
      },
      {
        header: 'First Name',
        accessorKey: 'first_name',
        id: 'first_name',
        cell: (info) => info.getValue(),
        size: 150,
      },
      {
        header: 'Last Name',
        accessorKey: 'last_name',
        id: 'last_name',
        cell: (info) => info.getValue(),
        size: 150,
      },
      {
        header: 'E-Mail',
        accessorKey: 'email',
        id: 'email',
        cell: (info) => info.getValue(),
        size: 300,
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        id: 'gender',
        cell: (info) => info.getValue(),
        size: 150,
      },
      {
        header: 'IP Address',
        accessorKey: 'ip_address',
        id: 'ip_address',
        cell: (info) => info.getValue(),
        size: 150,
      },
    ],
    []
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        backgroundColor: 'lightgrey',
        padding: '10px',
      }}
    >
      <Table
        data={data}
        columns={columns}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
      />
    </div>
  );
};

export default TableTest;
