const express = require('express');

const app = express();

const PORT = process.env.PORT || 7770;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./apiRoutes')(app);
require('./htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);

});
