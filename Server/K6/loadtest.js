import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    stages: [
        { duration: '20s', target: 2 },
        { duration: '60s', target: 30 },
        { duration: '20s', target: 0 },
    ]
};
export default function () {
    const res = http.get('http://localhost:3003/');
    check(res, { 'Status was 200': (r) => r.status == 200 })
    //   console.log(`Response status: ${res.status}`)
    //   console.log(`Response body: ${res.body}`)
    sleep(1);
}
