const members = require("../routes/members");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", members);

describe("Test Get Endpoints", () => {
  it("should return all the members", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(10);
  });

  it("should return specific members", async () => {
    const res = await request(app).get("/644");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]["name"]).toEqual("Max");
  });
});
