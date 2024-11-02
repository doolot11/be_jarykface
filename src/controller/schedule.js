const db = require("../../db")

class schedule {
    async createSchedule(req, res) {
        try {

            await db.query(`CREATE TABLE IF NOT EXISTS schedule ( 
               id SERIAL PRIMARY KEY,
               start VARCHAR(200),
               endTime VARCHAR(200),
               name VARCHAR(200),
               personId INTEGER,
               FOREIGN KEY (personId) REFERENCES person(id)
                )`)

            const { name, start, endTime, personId } = req.body
            const newSchedule = await db.query("INSERT INTO schedule (name, start, endTime, personId) values ($1, $2, $3, $4) RETURNING *", [name, start, endTime, personId])
            return res.json({ message: "Успешно!", data: newSchedule.rows[0] })
        } catch (error) {
            console.error("Error executing query:", error.stack); // Логируем ошибку для отладки
            return res.status(400).json({ message: "error", error });
        }
    }
}

module.exports = new schedule