import axios from 'axios';
import {baseUrl, getAuthHeader} from "./util";
import {GridRowId} from "@mui/x-data-grid";;

const doLogin = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${baseUrl}/auth`, {username, password});
        if(!response) {
            return false;
        }


        const { accessToken } = response.data;
        if (!accessToken) {
            return false;
        }

        localStorage.clear();
        localStorage.setItem('access-token', accessToken);

        return true;
    } catch(e) {
        return false;
    }

}

const fetchRecords = async  (search: string, sort = 'date', order = 'asc') => {
    const params = new URLSearchParams();
    params.set('sort', sort);
    params.set('order', order);
    params.set('search', search);



    const response = await axios.get(`${baseUrl}/record/pagination`, { params, headers: {...getAuthHeader()}})

    return response.data;

}

const deleteRecord = async (id: GridRowId) => {
    return axios.delete(`${baseUrl}/record/${id}`, {headers: {...getAuthHeader()}})
}

export {doLogin, fetchRecords, deleteRecord}
