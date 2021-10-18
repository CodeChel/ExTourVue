import  'normalize.css/normalize.css'
import  './appForm.js'
let files = [];

function importAll(r) {
    r.keys().forEach((s, i) => {
        files[i] = r(s);
    });
}

importAll(require.context('./blocks/', true, /(\.scss|\.js)$/));