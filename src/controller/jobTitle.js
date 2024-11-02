const db = require("../../db")

class jobTitle {
    async creaetJobTitle(req, res) {
        try {
            const { title } = req.body

            await db.query("CREATE TABLE IF NOT EXISTS jobTitle ( id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE NOT NULL )")
            const isExistsJobTitle = await db.query("SELECT * FROM jobTitle WHERE title = $1", [title])
            if (isExistsJobTitle.rows[0]) {
                return res.status(400).json({ message: `"${title}" уже существует!` })
            }

            const newJobTitle = await db.query("INSERT INTO jobTitle (title) values ($1) RETURNING *", [title])
            await res.json({ message: "Успешно!", data: newJobTitle.rows[0] })
        } catch (error) {
            console.error("Error executing query:", error.stack);
            return res.status(400).json({ message: "error", error });
        } 
    }
    async updateJobTitle(req, res) {
        try {
            const { id, title } = req.body

            const isExists = await db.query("SELECT * FROM jobTitle WHERE title = $1", [title])
            if (isExists.rows[0]) {
                return res.status(400).json({ message: `"${title}" уже существует!` })
            }

            const updatedJobTitle = await db.query("UPDATE jobTitle SET title = $1 WHERE id = $2 RETURNING *", [title, id])
            return res.json({ message: "Должность успешно обновлена!", updatedJobTitle: updatedJobTitle.rows[0] });

        } catch (error) {
            console.error("Error executing query:", error.stack);
            return res.status(400).json({ message: "error", error });
        }
    }
}

module.exports = new jobTitle