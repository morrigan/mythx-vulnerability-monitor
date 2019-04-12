import * as http from "http";
import * as test from "tape";
import server from "../src/App";

export function beforeEach(t: any, handler: any) {
    return (name, listener) => {
        t(name, (assert) => {
            const endTest = assert.end;
            assert.end = () => {
                assert.end = endTest;
                listener(assert);
            };

            handler(assert);
        });
    };
}

export function afterEach(t: any, handler: any) {
    return (name, listener) => {
        t(name, (assert) => {
            const endTest = assert.end;
            let called = false;
            assert.on("end", () => {
                if (!called) {
                    called = true;
                    assert.end = endTest;
                    handler(assert);
                }
            } );
            listener(assert);
        });
    };
}

export interface IAssertWithServer extends test.Test {
    server: http.Server;
}

export class TestWithServer {

    public static test(title, callback): void {
        const t = new TestWithServer();
        return t.testWithServer(title, callback);
    }

    public server: http.Server;

    private serverTest: any;

    constructor() {
        const that = this;
        const testWithServer = beforeEach(test, (t) => {
            that.server = server.listen(12345);
            t.server = that.server;
            t.end();
        });

        this.serverTest = afterEach(testWithServer, (t) => {
            that.server.close();
            t.end();
        });
    }

    public testWithServer(title, callback): void {
        return this.serverTest(title, callback);
    }

}
