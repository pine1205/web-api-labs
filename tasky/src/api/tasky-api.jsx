

export const getTasks = async () => {
    const  res = await fetch(
        `http://localhost:8080/api/tasks`
    )
        return res.json();
};

export const addTask = async(data) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            method: 'DELETE'
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