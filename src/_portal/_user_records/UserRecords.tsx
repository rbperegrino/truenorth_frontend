import * as React from 'react';
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
    GridActionsCellItem,
    GridRowParams
} from '@mui/x-data-grid';
import {Box, Button, Container, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {useCallback, useEffect, useState} from "react";
import {fetchRecords, deleteRecord} from "../../services/UserServices";
import {fetchOperations, OperationLabel} from "../../services/OperationServices";
import {useNavigate} from "react-router-dom";




const UserRecords = () => {


    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'operation', headerName: 'Operation', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'operationResponse', headerName: 'Result', width: 130 },
        {
            field: 'userBalance',
            headerName: 'Balance',
            type: 'number',
            width: 90,
        },
        {
            field: 'date',
            headerName: 'Date',
            type: 'Date',
            width: 120,
            valueGetter: (params: GridValueGetterParams) => new Date(params.row.date).toLocaleDateString('en-US')
        },
        {
            field: 'action',
            headerName: '',
            type: 'actions',
            width: 120,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem  icon={<DeleteIcon />}
                                      label="Delete"
                                      onClick={() => deleteRecordAction(params.id)} />,

            ]
        }
    ];

    const [rows, setRows] = useState([]);
    const [rowCountState, setRowCountState] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
    const [operations, setOperations] = useState([]);
    const [search, setSearch] = useState('')

    const navigate = useNavigate();

    const deleteRecordAction = (id: any) => {
        deleteRecord(id);
    }




    const opRecordsEffectFlow = useCallback(async () => {

        return new Promise(async (resolve) => {
            let ops;
            if(operations.length > 0) {
                ops = operations;
            } else {
                ops = await fetchOperations();
                setOperations(ops);
            }

            const take = paginationModel.pageSize.toString();
            const skip = (paginationModel.page).toString();
            const records = await fetchRecords({search, take, skip});
            resolve({ops, records})
        }).then((data: any) => {
            setRowCountState(data.records.pagination.length);
            setRows(data.records.data.map((record: any) => {
                const op: any = data.ops.find((o: any) => o.id === record.operationId)
                const operation = OperationLabel.get(op.type);
                return {...record, operation};
            }))
        }).catch((e) => {
            if(e.request.status === 401) {
                navigate('/auth/login')
            }
        })


    }, [search, paginationModel, navigate, operations])



    useEffect(() => {
        opRecordsEffectFlow().then()
        return;

    }, [paginationModel, opRecordsEffectFlow])




    const paginationChanged = (data: any) => {

        setPaginationModel(data)
    }

    return (<Container style={{ height: "100%", padding: '10px' }}>
        <Box>
            <form action="" onSubmit={(e: any) => {
                e.preventDefault();
                setSearch(e.target[0].value)
            }}>
                <TextField
                    label={'search'}
                    style={{marginBottom: '10px'}}
                    size="small"

                />
                <Button type="submit" startIcon={<SearchIcon />}  aria-label="search">
                    Search
                </Button>
            </form>


        </Box>
        <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCountState}
            onPaginationModelChange={paginationChanged}
            initialState={{
                pagination: {
                    paginationModel
                },
            }}
            paginationMode="server"
           // filterMode={'server'}
            pageSizeOptions={[5, 10]}

        />
    </Container>)
}

export default UserRecords;
