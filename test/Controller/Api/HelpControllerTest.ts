import * as request from "supertest";
import {IAssertWithServer, TestWithServer} from "../../TestUtils";

TestWithServer.test("Assert help is returned", (t: IAssertWithServer) => {
    t.plan(2);
    request(t.server)
        .get("/api/help")
        .expect(200)
        .end((err, res) => {
            t.error(err, "No error");
            t.deepEqual(
                res.body,
                {message: "Sorry can't help you"},
                "Should have returned message",
            );
        });
});
