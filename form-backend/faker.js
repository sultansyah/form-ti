import connection from "./connection.js"

connection()

const args = process.argv

const fakerFile = args[2]

let limit = 10
if (args[3]) {
    limit = parseInt(args[3])
}

const faker = await import(`./faker/${fakerFile}.js`)
faker.run(limit)