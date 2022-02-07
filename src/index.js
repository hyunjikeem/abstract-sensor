class Sensor {
    constructor(id) {
        this.is = id;
        this.powerStatus = 'off';
        this.reportingInterval = 10000;
    }

    turn(status) {
        if (this.powerStatus === 'off' && status === 'on') {
            this.powerStatus = 'on';
            this.status = 'idle';

            setTimeout(() => {
                this.status = 'sensingDistance';
            }, this.reportingInterval);
            setTimeout(() => {
                this.status = 'reportingData';
            }, this.reportingInterval + 500);
            setTimeout(() => {
                this.status = 'idle';
            }, this.reportingInterval + 1000);
        } else if (status === 'off') {
            this.powerStatus = 'off';
        } else {
            throw new Error('server not changed');
        }
    }
}

class IotServer {
    constructor() {
        this.sensor = [];
    }

    start([sensor]) {
        this.sensor.push(sensor);
    }

    publish({ devideId, actionId, payload }) {
        for (let i = 0; i < this.sensor.length; i++) {
            if (this.sensor[i].id === devideId) {
                if (this.sensor[i].powerStatus === 'on' && actionId === 'CHANGE_REPORTING_INTERVAL') {
                    this.sensor[i].reportingInterval = payload;
                }
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
