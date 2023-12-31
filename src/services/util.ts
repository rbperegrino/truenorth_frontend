const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';


const getAuthHeader = () => {
    const authentication = localStorage.getItem('access-token');
    return {'Authorization': `Bearer ${authentication}`}
}

export {baseUrl, getAuthHeader}
