import axios from 'axios';
import {baseUrl, getAuthHeader} from "./util";

const fetchOperations = async () => {
    const result = await axios.get(`${baseUrl}/operation`, { headers: {...getAuthHeader()}});
    return result.data;
}

const newOperation = async (payload: any) => {
    const result = await axios.post(`${baseUrl}/user/operate`, payload, { headers: {...getAuthHeader()}});
    return result.data;
}

const OperationLabel = new Map([
    ['addition', 'Addition'],
    ['subtraction', 'Subtraction'],
    ['division', 'Division'],
    ['multiplication', 'Multiplication'],
    ['square_root', 'Square Root'],
    ['random_string', 'Random String'],
])

const OperationArgs = new Map([
    ['addition', [0,1]],
    ['subtraction', [0,1]],
    ['division', [0,1]],
    ['multiplication', [0,1]],
    ['square_root', [0]],
    ['random_string', []],
])


export  {fetchOperations, newOperation, OperationLabel, OperationArgs}
