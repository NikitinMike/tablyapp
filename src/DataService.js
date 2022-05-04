import React from "react";

// const server = 'https://localhost:443'
const server = 'http://localhost:3000'
const Site = `${server}/contacts`,
    Headers = ['№', 'Имя', 'Фамилия', 'Электронная Почта', 'Телефон', 'Адрес', 'Паспорт'],
    Footers = ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт'],
    Fields = ['firstName', 'lastName', 'email', 'phone', 'city', 'country'],
    Size = [4, 7, 16, 10, 9, 3];
export const DataServiceConst = {Fields, Headers, Footers, Size,}

export const AuthContext = React.createContext(undefined);

// Контекст UI-темы, со светлым значением по умолчанию
export const ThemeContext = React.createContext('light');

// Контекст активного пользователя
export const UserContext = React.createContext({name: 'john', password: 'changeme'});

class DataService {

     token = null

     tokenGet = async function (username, password) {
        const response = await fetch(
            `${server}/auth/login?username=${username}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            })
        this.token=await response.json();
        return await this.token
    }

     getProfile = async function (authorization) {
        const response = await fetch(`${server}/profile`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
            redirect: 'follow'
        })
        return await response.json();
    }

     getPage = async (page, order, dir, size) => {
        // const token = await tokenGet('john','changeme')
        // const profile = await getProfile('Bearer '+token.access_token)
        // console.log(profile)
        const url = Site + '?page=' + (page ? page : 0)
            + '&size=' + (size ? size : 10)
            + (order ? '&order=' + order : '')
            + (order == null ? '' : '&dir=' + (dir ? '1' : '-1'))
        // console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token.access_token,
            },
            redirect: 'follow'
        })
        return await response.json();
    }

     getRow = async (id) => {
        const response = await fetch(Site + '/' + id, {method: 'GET'})
        return await response.json();
    }

     deleteRow = async (id) => {
        return await fetch(Site + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token.access_token,
            },
        })
    }

     putRow = async (row) => {
        return await fetch(Site + '/' + row.id, {
            method: 'PUT',
            body: JSON.stringify(row),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token.access_token,
            },
        })
            // .then(data => console.log(data))
            // .catch(e => console.log(e))
    }

     addRow = async (row) => {
        return await fetch(Site + '/', {
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token.access_token,
            },
            method: 'POST',
            body: JSON.stringify(row)
        })
    }
}

export default DataService