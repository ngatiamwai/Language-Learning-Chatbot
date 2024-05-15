import http from "k6/http";

export default function(){
    const url = 'http://localhost:3003/';
    const payload = JSON.stringify({
        email: "ngatia6@gmail.com",
        password: "123456789",
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post( url, payload, params )
}