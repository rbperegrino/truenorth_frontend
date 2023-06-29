import React, {useEffect, useState} from 'react';
import {Box, Button, Container, MenuItem, Select, TextField} from "@mui/material";
import {fetchOperations, newOperation, OperationArgs, OperationLabel} from "../../services/OperationServices";
import {useNavigate} from "react-router-dom";


const NewOperation = () => {
      
    const [args, setArgs] = useState<number[]>([]);
    const [argFields, setArgFields] = useState<number[]>([]);
    const [type, setType] = useState<string | undefined>();
    const [lastOperation, setLastOperation] = useState<any>();
    const [operations, setOperations] = useState<any[] | undefined>();

    const navigate = useNavigate();

    useEffect( () => {
        fetchOperations().then(op => setOperations(op)).catch((e) => {
            if(e.request.status === 401) {
                navigate('/auth/login')
            }
        })
    })

    useEffect(() => {
        const args = OperationArgs.get(type || '');
        if(args) setArgFields(args);
    }, [type]);

    const resetStateAfterCalculate = () => {
        setArgs([]);
        setType(undefined);
        setArgFields([])
    }

    const typeChanged = (value: string) => {
        setArgFields([])
        setArgs([]);
        setType(value);
    }

    const argChanged = (index: number, value: number) => {
        const arr = [...args];
        arr[index] = value;
        setArgs(arr);
    }
 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const {amount, userBalance, operationResponse} = await newOperation({type, args});
        resetStateAfterCalculate();
        setLastOperation({amount, userBalance, operationResponse, type});
        return;
    };

    return (<Container>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Operate</h2>
            <Select
                label="Type"
                onChange={(e) => typeChanged(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                disabled={!operations}
                sx={{mb: 3}}
                fullWidth
                value={type || ''}
            >
                <MenuItem value={''}></MenuItem>
                {operations && operations.map((op: any) => <MenuItem key={op.type} value={op.type}>{OperationLabel.get(op.type)} - {op.cost}</MenuItem>)}
            </Select>
            {argFields.map((index) => <TextField
                key={`arg_${index}`}
                label={`Argument ${index}`}
                onChange={(e: any) => argChanged(index, e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="number"
                sx={{mb: 3}}
                fullWidth
                value={args[index] || ''}
            />)}
            {lastOperation && <Box>
                Last Operation: Operation: {OperationLabel.get(lastOperation.type)}, Amount: {lastOperation.amount}, Result: {lastOperation.operationResponse}, Balance: {lastOperation.userBalance}
            </Box>}
            <Button disabled={!type} variant="outlined" color="secondary" type="submit">Operate</Button>

        </form>
    </Container>)
};

export default NewOperation;
