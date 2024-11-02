const db = require("../../db");
const { generateAccessToken, generateRefreshToken, transporter } = require("../helper/main")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class User {
    async getUsers(req, res) {
        try {
            const users = await db.query("SELECT * FROM person");
            console.log("Users retrieved:", users.rows);
            await res.json(users.rows);
        } catch (error) {
            console.error("Error executing query:", error.stack); // Логируем ошибку для отладки
            return res.status(400).json({ message: "error", error });
        }
    }

    async signIn(req, res) {
        try {
            const { pwd, email } = req.body

            const isExistsUser = await db.query("SELECT * FROM person WHERE email = $1", [email])
            if (!isExistsUser.rows[0]) {
                return res.status(400).json({ message: "user not found" })
            }

            const user = isExistsUser.rows[0]

            const isValidPassword = bcrypt.compareSync(pwd, user.pwd)
            if (!isValidPassword) {
                return res.status(400).json({ message: "user not found" })
            }

            const accessToken = generateAccessToken({ id: user.id, role: user.role })
            const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

            await res.json({ accessToken, refreshToken, role: user.role });
        } catch (error) {
            return res.status(400).json({ message: "error", error });
        }
    }

    async createUsers(req, res) {
        try {
            const { pwd, email, role, fullName,
                firstName, lastName, middleName, phoneNumber, birthday, ID, INN, faceId, jobTitleId,
            } = req.body

            const isExistsUser = await db.query(`SELECT * FROM person WHERE email = $1`, [email])

            if (isExistsUser.rows[0]) {
                return res.status(400).json({ message: "user already exists" })
            }
            const person = isExistsUser.rows[0]
            const hashPassword = bcrypt.hashSync(pwd, 10) 
            const newPerson = await db.query(`INSERT INTO person (pwd, email, role, fullName) values ($1, $2, $3, $4) RETURNING *`, [hashPassword, email, role, fullName])

            if (role === "emlployee") {
                const newEmployee = db.query("INSERT INTO employee (firstName, lastName, middleName, phoneNumber, birthday, ID, INN, faceId, jobTitleId, personId)",
                    [firstName, lastName, middleName, phoneNumber, birthday, ID, INN, faceId, jobTitleId, person.id]
                )
            }


            // const accessToken = generateAccessToken({ id: newPerson.id, role: newPerson.role })
            // const refreshToken = generateRefreshToken({ id: newPerson.id, role: newPerson.role });

            await res.json({ message: "Пользователь успешно создано!" });

        } catch (error) {
            console.error("Error executing query:", error.stack); // Логируем ошибку для отладки
            return res.status(400).json({ message: "error", error });
        }
    }
    async updateUsers(req, res) {
        try {
            const { pwd, email, fullName } = req.body

            const isExistsUser = await db.query(`SELECT * FROM person WHERE email = $1`, [email])

            if (isExistsUser.rows[0]) {
                return res.status(400).json({ message: "user already exists" })
            }
            const newPerson = await db.query(`INSERT INTO person (pwd, email, role, fullName) values ($1, $2, $3, $4) RETURNING *`, [pwd, email, role, fullName])
            await res.json(newPerson.rows[0]);

        } catch (error) {
            console.error("Error executing query:", error.stack); // Логируем ошибку для отладки
            return res.status(400).json({ message: "error", error });
        }
    }

    async requestResetPwd(req, res) {
        // Configure your email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: 'doolot928@gmail.com',
                pass: 'xfph euzv sdvv agpj'
            }
        });

        try {
            const { email } = req.body
            const getPerson = await db.query("SELECT * FROM person WHERE email = $1", [email])
            const person = getPerson.rows[0]
            if (!person) return res.status(404).json({ message: 'User not found' });
            const resetCode = crypto.randomBytes(3).toString('hex'); // Generates a 6-digit code
            const resetCodeExpires = Date.now() + 10 * 60 * 1000; // Code expires in 10 minutes
            await db.query("UPDATE person SET resetCode = $1, resetCodeExpires = $2 WHERE id = $3", [resetCode, resetCodeExpires, person.id])

            await transporter.sendMail({
                from: 'JarykFace doolot928@gmail.com',
                to: email,
                subject: 'Password Reset Code',
                text: `Your password reset code is: ${resetCode}`
            });
            await res.json({ message: 'Password reset code sent' });
        } catch (error) {
            console.log(error.stack);

            return res.status(500).json({ message: 'Error sending reset code' });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, newPwd, code, } = req.body

            const role = "admin" //get role from token

            const getPerson = await db.query("SELECT * FROM person WHERE email = $1", [email])
            const person = getPerson.rows[0]
            if (!getPerson.rows[0]) return res.status(404).json({ message: 'User not found' });

            if (role === "superAdmin" && (person.resetCode !== code || person.resetCodeExpires <= new Date())) {
                return res.status(404).json({ message: "Произашло ошибка!" })
            }

            const hashPassword = bcrypt.hashSync(newPwd, 10)
            await db.query("UPDATE person SET pwd = $1 WHERE id = $2", [hashPassword, person.id])

            await res.json({ message: 'Password successful reset' });
        } catch (error) {
            console.log(error.stack);
            return res.status(500).json({ message: 'Error' });
        }
    }
}

module.exports = new User();