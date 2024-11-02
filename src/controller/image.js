const db = require("../../db")

class image {
    async createImage(req, res) {
        try {
            const { filename } = req.file
            await db.query("CREATE TABLE IF NOT EXISTS image ( id SERIAL PRIMARY KEY, image TEXT )")
            const file = await db.query("INSERT INTO image (image) values ($1) RETURNING *", [filename])

            await res.json({ message: "Успешно!", data: file.rows[0] })

        } catch (error) {
            console.log(error.stack);
            return res.json({ message: "Error" })
        }
    }
    async updateImage(req, res) {
        try {

            const { filename } = req.file
            await db.query("CREATE TABLE IF NOT EXISTS image ( id SERIAL PRIMARY KEY, image TEXT )")
            const file = await db.query("UPDATE image SET image = $1, WHERE id = $2 RETURNING *", [filename, req.body.id])

            await res.json({ message: "Успешно!", data: file.rows[0] })

        } catch (error) {
            console.log(error.stack);
            return res.json({ message: "Error" })
        }
    }
    async getImage(req, res) {
        try {
            const { id } = req.params
            const image = await db.query("SELECT * FROM image WHERE id = $1", [id])
            await res.json({ message: "Успешно!", data: image.rows[0] })
        } catch (error) {
            return res.json({ message: "Error" })
        }
    }
}

module.exports = new image

