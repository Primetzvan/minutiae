import axios from 'axios'

export type Door = {
    uuid: string;
    doorname: string;
    ip: string;
    color: string;
}

export type GetDoorsResponse = {
    doors: Door[];
}

export type User = {
    uuid: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    phonenumber: string;
    email: string;
    address: string;
    finger: object;
    accesses: [];
}

export type GetUsersResponse = {
    users: User[];
}

export type NewUserFormRouteProps = {
    uuid: string;
}

export type loginUsers = {
    userNameOrEmail: string;
    password: string;
}

export const getDoors = async () => {
    const { data } = await axios.get<Door[]>(`${process.env.REACT_APP_API_URL}/doors`);
    console.log(data);
    return data;
};


export const getUsers = async () => {
    const { data } = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users`);
    console.log(data);
    return data;
};
export const getUserDetail = (uuid: string) => async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {params:{uuid}});
    console.log(data);
    return data;
};

export const getAdminProfile = (uuid: string) => async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {params:{uuid}});
    console.log(data);
    return data;
};

export const deleteUser = (uuid: string) => async () => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/users.json`, {data:{uuid}});
    console.log(data);
    return data;
};

export const createUser = (data: User) => async () => {
    const { data: response } = await axios.post(`${process.env.REACT_APP_API_URL}/users`, data);
    return response.data;
    };


export const loginUser = (loginusers: loginUsers ) => async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginusers);
    return data;
};