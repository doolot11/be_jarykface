const express = require("express")
const app = express()
const cors = require("cors")
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger");

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const AllRoute = require("./src/route/allRoute")



app.use(cors())
app.use(express.json())
app.use("/api", AllRoute)


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);

})