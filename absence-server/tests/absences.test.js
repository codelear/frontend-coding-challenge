const absences = require("../routes/absences");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", absences);

describe("Test Get Endpoints", () => {
  it("should return the first 10 absences", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.payload.length).toEqual(10)
    expect(res.body.pagenumber).toEqual(1);
  });
    it("should return the second 10 absences", async () => {
      const res = await request(app).get("/?pagenumber=2");
      expect(res.statusCode).toEqual(200);
      expect(res.body.payload.length).toEqual(10);
      expect(res.body.pagenumber).toEqual(2);
    });
});
