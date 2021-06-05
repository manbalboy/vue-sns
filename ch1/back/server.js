/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const app = require('./app.js');
const port = 3085;

app.listen(port, function () {
    console.log('Hello Manbalboy Express listening on port', port);
});
