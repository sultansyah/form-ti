import { faker } from "@faker-js/faker"
import Answer from "../models/Answer.js"

const run = async (limit) => {
    try {
        let data = []
        for(let i = 0; i < limit; i++) {
            data.push({
                '639400ee8eb95db38d37419f': faker.name.fullName(),
                '6393fee628179fe80df5f202': faker.helpers.arrayElement(['31', '45']),
                '6393feea28179fe80df5f204': faker.helpers.arrayElements(['Semur', 'Rendang', 'Nasi Uduk', 'Dendend']),
                'formId': '6392b9faa917fafc10395fe3',
                'userId': '6393f8ef28179fe80df5f1f5'
            })
        }

        const fakeData = await Answer.insertMany(data)
        if(fakeData){
            console.log(fakeData)
            process.exit()
        }
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

export { run }