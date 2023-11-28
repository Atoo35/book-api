const { Kafka } = require('kafkajs')
const logger = require('../common/logger')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka-service:9092', 'kafka-service:9092']
})

const producer = kafka.producer()


const send = async (payload) => {
    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: JSON.stringify(payload) },
        ],
    })

    logger.info('Message sent!')
}

module.exports = {
    send,
}
