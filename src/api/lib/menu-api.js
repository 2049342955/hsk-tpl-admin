
/* Automatic generated by hsk-garen */
import api from '../local/menu-api.js'

for(let key of Object.keys(api)){
    let val = api[key];
    api[key] = function (...params) {
        console.log('mockRequest ' + key + ' params:',...params);
        return new Promise((res,rej) => {
            let timer = setTimeout(()=>{
                clearTimeout(timer);
                let rst = val(...params);
                rst = JSON.parse(JSON.stringify(rst));
                console.log('mockRequest ' + key +' result:',rst);
                res(rst);
            },1000);
        });
    }
}

export default api;