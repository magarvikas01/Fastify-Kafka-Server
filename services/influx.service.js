const { InfluxDB, Point } = require('@influxdata/influxdb-client');

class InfluxService {
    constructor() {
        this.influxDB = new InfluxDB({
            url: process.env.INFLUXDB_URL,
            token: process.env.INFLUXDB_TOKEN
        });
        this.writeApi = this.influxDB.getWriteApi(process.env.INFLUXDB_ORG, process.env.INFLUXDB_BUCKET);
    }

    async writeMessage(message) {
        try {
            const point = new Point('kafka_messages')
                .stringField('content', message.content)
                .intField('messageLength', message.content.length) // Add numerical field
                .timestamp(new Date());

            await this.writeApi.writePoint(point);
            await this.writeApi.flush();
        } catch (error) {
            console.error('Failed to write message to InfluxDB:', error);
        }
    }

    async disconnect() {
        await this.writeApi.close();
    }
}

module.exports = InfluxService;