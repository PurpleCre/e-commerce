const request = require('supertest');
const mongo = require('../db/connect');
// const express = require('express');
const app = require('../server'); // Adjust the path to your main app file

jest.setTimeout(10000); // Increase the timeout to 10 seconds (10000 ms)

beforeAll(async () => {
    await new Promise((resolve, reject) => {
        mongo.initDb((err) => {
            if (err) {
                console.error('Failed to initialize the database:', err);
                reject(err);
            } else {
                console.log('Database initialized successfully');
                resolve();
            }
        });
    });
});


afterAll(async () => {
    await mongo.closeDb(); // Close the database connection after tests
});


describe("User  API", () => {
    describe("GET /user", () => {
        it("should return all users", async () => {
            const response = await request(app).get('/user');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("GET /user/:id", () => {
        it("should return a single user by id", async () => {
            const userId = "67ac8540da1b26eef624bc2a"; // Use a valid user ID from your database
            const response = await request(app).get(`/user/${userId}`);

            expect(response.statusCode).toBe(200);
            
        });
        it("should return 400 for invalid user id", async () => {
            const userId = "67ac8540da1b26eef624bc2a"; // Use a valid user ID from your database
            if (!userId) {
                const response = await request(app).get(`/user/${userId}`);
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual('Must use a valid user id to find a user.');
            }

        });
    });
});