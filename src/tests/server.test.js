const app = require('../../server');
const mongoose = require('mongoose');
const request = require('supertest');
const Users = require('../models/userModel');

beforeEach(async () => {
    await mongoose.connect("mongodb://0.0.0.0:27017/jest-test", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected");
});

afterEach(async () => {
    await mongoose.disconnect();
    console.log("dis-connected");
});



test("GET /api/all-users", async()=>{
    const response = await request(app).get('/all-users');
    expect(response.status).toBe(200);
})


test('GET /user/{id} should return details about a user', async () => {
    const mockUser = {
        "_id":  "6635d7e3a806e60b31db5f49",
        "createdAt": "2024-03-16T05:17:41.109Z",
        "firstName": "Burkina Faso",
        "password": "sxDXesxxi4DNE3b",
        "email": "Ramiro.Wolff28@hotmail.com",
        "updatedAt": "2024-03-16T09:45:24.189Z",
        "lastName": "VonRueden"
      }
    await request(app).get("/user/" + mockUser._id)
    .expect(200)
    .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.user.length).toBe(1);
        expect(response.body.user[0]._id).toBe(mockUser._id);
        expect(response.body.user[0].createdAt).toBe(mockUser.createdAt);
        expect(response.body.user[0].firstName).toBe(mockUser.firstName);
        expect(response.body.user[0].password).toBe(mockUser.password);
        expect(response.body.user[0].email).toBe(mockUser.email);
        expect(response.body.user[0].updatedAt).toBe(mockUser.updatedAt);
    });
});

test("POST user", async ()=>{
    const newUser = {
        "firstName": "test-372",
        "password": "mrsdeasmyr",
        "email": "ada.Wolff28@hotmail.com",
        "lastName": "test372",
    };
     await request(app).post('/user')
    .send(newUser)
    .expect(200)
   .then((response)=>{
        expect(response.statusCode).toBe(200);
        expect(response.body.user._id).toBeTruthy();
        expect(response.body.user.firstName).toBe(newUser.firstName);
        expect(response.body.user.password).toBe(newUser.password);
        expect(response.body.user.email).toBe(newUser.email);
   })
});

test("PUT user", async ()=>{
    const patchUser = {
        "_id": "6635d7e3a806e60b31db5f4a",
        "firstName": "test-12435",
        "password": "mrsdeasmyr",
        "email": "ada222.Wolff28@hotmail.com",
        "lastName": "122434",
    };
    await request(app).put('/user/'+ patchUser._id)
    .send(patchUser)
    .expect(200)
   .then((response)=>{
        expect(response.statusCode).toBe(200);
        expect(response.body.user._id).toBe(patchUser._id);
        expect(response.body.user.firstName).toBe(patchUser.firstName);
        expect(response.body.user.password).toBe(patchUser.password);
        expect(response.body.user.email).toBe(patchUser.email);
        expect(response.body.user.lastName).toBe(patchUser.lastName);
   })
});


test("DELETE user", async ()=>{
    const deleteUser = {
        "_id": "6635d7e3a806e60b31db5f4c"
    };
    await request(app).delete('/user/'+ deleteUser._id)
    .expect(200)
   .then(async (response)=>{
        expect(response.statusCode).toBe(200);
        expect(await Users.findOne({ _id: deleteUser._id })).toBeFalsy();
   }).catch((err=>{
        console.log(err);
   }))
});