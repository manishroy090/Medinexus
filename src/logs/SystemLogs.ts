
import os from 'os';

export abstract class SystemLogs {
    async getRequestInfo() {

        const payload = {
            user: os.userInfo().username,
            host: os.hostname(),
            platform: os.platform(),
            node: process.version
        };

        const res = await fetch('https://ipinfo.io/json');

        console.log('ipMeta', await res.json())




    }
}