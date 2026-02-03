import request from "supertest";
import app from "../app";

describe("KIT API INTEGRATION TESTS", () => {
  const deviceName = "test-device-1";

  // ---------------- CREATE DEVICE ----------------
  it("Create a device", async () => {
    const res = await request(app)
      .post("/kit/create-device")
      .send({ name: deviceName })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // ---------------- GET STATUS ----------------
  it("Get device status", async () => {
    const res = await request(app)
      .get(`/kit/get-status?name=${deviceName}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("status");
  });

  // ---------------- UPDATE STATUS ----------------
  it("Update device status", async () => {
    const res = await request(app)
      .post("/kit/update-status")
      .send({
        name: deviceName,
        status: "online"
      })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // ---------------- GET CONTROL ----------------
  it("Get device control", async () => {
    const res = await request(app)
      .get(`/kit/get-control?name=${deviceName}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("control");
  });

  // ---------------- UPDATE CONTROL ----------------
  it("Update device control", async () => {
    const res = await request(app)
      .post("/kit/update-control")
      .send({
        name: deviceName,
        control: "start"
      })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // ---------------- GET CONTROL AGAIN ----------------
  it("Get updated device control", async () => {
    const res = await request(app)
      .get(`/kit/get-control?name=${deviceName}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.control).toBe("start");
  });

  // ---------------- DELETE DEVICE (CLEANUP) ----------------
  it("Delete the device", async () => {
    const res = await request(app)
      .delete(`/kit/delete-device?name=${deviceName}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
