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
    describe("GET /product", () => {
        it("should return all products", async () => {
            const response = await request(app).get('/product');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });


    describe("GET /product/stock", () => {
        it("should return all products", async () => {
            const response = await request(app).get('/product/stock');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("GET /user/:id", () => {
        it("should return a single user by id", async () => {
            const userId = "67ac7dc2da1b26eef624bc27"; // Use a valid user ID from your database
            const response = await request(app).get(`/product/${userId}`);

            expect(response.statusCode).toBe(200);

        });
        it("should return 400 for invalid product id", async () => {
            const userId = "67ac7dc2da1b26eef624bc27"; // Use a valid user ID from your database
            if (!userId) {
                const response = await request(app).get(`/product/${userId}`);
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual('Must use a valid product id to find a product.');
            }

        });
    });
});