import * as request from "supertest";
import {IAssertWithServer, TestWithServer} from "./TestUtils";

TestWithServer.test("Assert server is running", (t: IAssertWithServer) => {
    t.plan(2);
    request(t.server)
        .get("/health")
        .expect(200)
        .end((err, res) => {
            t.error(err, "No error");
            t.deepEqual(res.body, {status: "OK"}, "Should have status OK");
        });
});
