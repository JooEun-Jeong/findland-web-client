import React, { useEffect, useMemo, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, Tooltip, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useSearchParams } from 'react-router-dom';

import api from '@apis';
import { PageSpec, ProductTransferRes } from '@interfaces';

export interface TransferRequestListComponentProps {}

// eslint-disable-next-line no-empty-pattern
export const TransferRequestListComponent = ({}: TransferRequestListComponentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0);
  const [size, setSize] = useState<number>(
    searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 10,
  );
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setSearchParams((p) => {
      p.set('page', page.toString());
      p.set('size', size.toString());
      return p;
    });
  }, [page, size]);

  const adminApi = useMemo(() => api().admin, []);
  const [loading, setLoading] = useState<boolean>(false);
  const [transferRequests, setTransferRequests] = useState<PageSpec<ProductTransferRes>>();
  useEffect(() => {
    setLoading(true);
    adminApi.getAllTransferRequest(page, size).then((res) => {
      setTransferRequests(res);
      setTotal(res.totalElements);
      setLoading(false);
    });
  }, [adminApi, page, size]);

  const handleClick = (idList: string[]) => {
    setSelectedIdList(idList);
  };

  // approveDialog
  const [selectedIdList, setSelectedIdList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const tableRef = useGridApiRef();

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography>Are you sure to approve?</Typography>
          <div>
            {selectedIdList.map((id) => (
              <Typography key={id}>{id}</Typography>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setLoading(true);
              const promiseList = selectedIdList.map((id) => adminApi.approveTransferRequest(id));
              Promise.all(promiseList).then(() => {
                setOpen(false);
                // refresh
                adminApi.getAllTransferRequest(page, size).then((res) => {
                  setTransferRequests(res);
                  setTotal(res.totalElements);
                  tableRef.current?.getSelectedRows().forEach((row) => {
                    tableRef.current?.selectRow(row.id, false);
                  });
                  setLoading(false);
                });
              });
            }}
          >
            Approve
          </button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </DialogActions>
      </Dialog>
      <DataGrid
        apiRef={tableRef}
        loading={loading}
        onRowSelectionModelChange={(e) => {
          handleClick(e as string[]);
        }}
        columns={[
          getGridColDef('id', 'id', 100),
          getGridColDef('transferStatus', '상태', 150),
          getGridColDef('totalAmount', '총 가격', 150),
          getGridColDef('userId', 'userId', 150),
          getGridColDef('bankAccountName', 'bankAccountName', 150),
          getGridColDef('paymentIds', 'paymentIds', 200, (value) => (value as string[]).join(', ')),
          getGridColDef('createdAt', 'createdAt', 150),
        ]}
        rows={transferRequests?.content || []}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize: size },
          },
        }}
        pagination
        paginationMode={'server'}
        rowCount={total}
        onPaginationModelChange={(params) => {
          setPage(params.page);
        }}
        checkboxSelection
        isRowSelectable={(params) => params.row.transferStatus === 'PENDING'}
        disableColumnFilter={true}
        disableColumnMenu={true}
      />
      {selectedIdList.length > 0 && (
        <Button
          variant="outlined"
          style={{
            // center
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: '10px',
          }}
          onClick={() => setOpen(true)}
        >
          Approve {selectedIdList.length} items
        </Button>
      )}
    </>
  );
};

const getGridColDef = (field: string, headerName: string, width: number, valueGetter?: (params: any) => any) => {
  return {
    field,
    headerName,
    width,
    renderCell: (params: any) => (
      <Tooltip title={valueGetter ? valueGetter(params.value) : params.value}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {valueGetter ? valueGetter(params.value) : params.value}
        </span>
      </Tooltip>
    ),
  };
};
