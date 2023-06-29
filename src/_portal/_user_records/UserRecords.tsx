import * as React from 'react';
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
    GridActionsCellItem,
    GridRowParams
} from '@mui/x-data-grid';
import {Container, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
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
    const [pagination, setPagination] = useState({});
    const [operations, setOperations] = useState([]);
    const [search, setSearch] = useState('')

    const navigate = useNavigate();

    const deleteRecordAction = (id: any) => {
        deleteRecord(id);
    }


    const getOperations = async () => {
        if(operations.length > 0) return operations;
        const ops = await fetchOperations();
        setOperations(ops);
        return ops;
    };

    const opRecordsEffectFlow = async () => {
        const ops = await getOperations()
        const data = await fetchRecords(search);
        setPagination(data.pagination);
        setRows(data.data.map((record: any) => {
            const op = ops.find((o: any) => o.id === record.operationId)
            const operation = OperationLabel.get(op.type);
            return {...record, operation};

        }))
    }


    useEffect(() => {

        try {
           opRecordsEffectFlow()
        } catch (e: any) {
            if(e.request.status === 401) {
                navigate('/auth/login')
            }
        }

        return;

    }, [])

    return (<Container style={{ height: "100%", padding: '10px' }}>
        <TextField
            label={'search'}
            style={{marginBottom: '10px'}}
            onChange={(e: any) => setSearch(e.target.value)}
        />
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            filterMode={'server'}
            pageSizeOptions={[5, 10]}

        />
    </Container>)
}

export default UserRecords;
