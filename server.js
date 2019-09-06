'use strict'
const app = require('./services/organizations.mongoose');

const port = process.env.PORT || 42546;
app.listen(port, () => {
    console.info(`Api inicializada com sucesso na porta ${port}`);
});
