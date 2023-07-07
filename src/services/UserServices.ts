import axios from 'axios';
import {baseUrl, getAuthHeader} from "./util";
import {GridRowId} from "@mui/x-data-grid";;

export interface IFetchRecordsParams {
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    take?: string;
    skip?: string;
}

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

const fetchRecords = async  (searchParams: IFetchRecordsParams) => {
    const params = new URLSearchParams();
    for (const key in searchParams) {
        const param = key as keyof IFetchRecordsParams;
        if(searchParams[param]) {
            params.set(key, searchParams[param]!.toString());
        }

    }



    const response = await axios.get(`${baseUrl}/record/pagination`, { params: searchParams, headers: {...getAuthHeader()}})

    return response.data;

}

const deleteRecord = async (id: GridRowId) => {
    return axios.delete(`${baseUrl}/record/${id}`, {headers: {...getAuthHeader()}})
}

export {doLogin, fetchRecords, deleteRecord}
