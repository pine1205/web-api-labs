

export const getTasks = async () => {
    const response = await fetch(
        `http://localhost:8080/api/tasks`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')          
            }
        }
    )
    return response.json();
};
//In the above code, notice how the JWT token is retrieved from local storage and included in the request header.
//Gets the JWT token from browser storage:
//Sends it to the backend inside the request header. This tells the server: “This user is logged in. Here is their token.”
// it verifies the token; checks if it's valid; allows or denies access
//return response.json()  - Converts server response into JavaScript object. Gives me the actual tasks data


export const addTask = async(data) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }
    )
        return res.json();
};




export const deleteTask = async (id) => {
    const res =  fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res;
};


export const updateTask = async (data) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks/${data._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }
    )
        return res.json();
};



export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};
//when i am sending request i need to tell the server how and what kind of data i am sending
//"POST" → send data (login/signup)
// "GET" → retrieve data
// "PUT" / "PATCH" → update data

//headers: {
 // "Content-Type": "application/json"}  - This tells the server taht I’m sending data in JSON format
 //The body is the actual data you send to the server. For login/signup, that’s: username, password

// User enters username + password
// Frontend sends data → Express API
// API validates user
// API returns JWT token
// Frontend saves token in localStorage
// Future requests include the token