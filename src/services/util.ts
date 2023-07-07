const baseUrl = process.env.REACT_APP_BASE_URL || 'https://truenorth-api.azurewebsites.net';


const getAuthHeader = () => {
    const authentication = localStorage.getItem('access-token');
    return {'Authorization': `Bearer ${authentication}`}
}

export {baseUrl, getAuthHeader}
