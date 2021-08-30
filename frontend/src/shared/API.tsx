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
    access: [];
}

export type GetUsersResponse = {
    users: User[];
}

export type NewUserFormRouteProps = {
    uuid: string;
}

export const getDoors = async () => {
    const { data } = await axios.get<GetDoorsResponse>(`${process.env.REACT_APP_API_URL}/doors.json`);
    console.log(data);
    return data;
};


export const getUsers = async () => {
    const { data } = await axios.get<GetUsersResponse>(`${process.env.REACT_APP_API_URL}/users.json`);
    console.log(data);
    return data;
};
export const getUserDetail = (uuid: string) => async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/userDetail.json`, {params:{uuid}});
    console.log(data);
    return data;
};

export const getAdminProfile = (uuid: string) => async () => {
    const { data } = await axios.get<User>(`${process.env.REACT_APP_API_URL}/userDetail.json`, {params:{uuid}});
    console.log(data);
    return data;
};

export const deleteUser = (uuid: string) => async () => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/users.json`, {data:{uuid}});
    console.log(data);
    return data;
};