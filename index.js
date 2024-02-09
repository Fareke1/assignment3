document.querySelector('#get').addEventListener('click',function(){
    sendGETRequest();
})
document.querySelector('#post').addEventListener('click',function(){
    sendPOSTRequest();
})
document.querySelector('#put').addEventListener('click',function(){
    sendPUTRequest();
})
document.querySelector('#delete').addEventListener('click',function(){
    sendDELETERequest();
})
async function sendGETRequest() {
    try {
        const response = await fetch('http://localhost:3005/api/getBlogs');
        const data = await response.json();
        document.getElementById('getResponse').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendPOSTRequest() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    try {
        const response = await fetch('http://localhost:3005/api/postBlogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, email })
        });
        const data = await response.json();
        document.getElementById('postResponse').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendPUTRequest() {
    const name = document.getElementById('putName').value;
    const age = document.getElementById('putAge').value;
    const email = document.getElementById('putEmail').value;
    try {
        const response = await fetch(`http://localhost:3005/api/putBlogs/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age, email })
        });
        const data = await response.json();
        document.getElementById('putResponse').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendDELETERequest() {
    const name = document.getElementById('deleteName').value;
    try {
        const response = await fetch(`http://localhost:3005/api/deleteBlogs/${name}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        document.getElementById('deleteResponse').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error:', error);
    }
}