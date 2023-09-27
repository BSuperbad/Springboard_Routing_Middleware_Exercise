process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const app = require('../app');

let oreos = {
    name: 'Oreos',
    price: 1.75
};

beforeEach(function () {
    items.push(oreos)
});

afterEach(function () {
    items.length = 0;
});

describe('GET /items', () => {
    test('Get all items', async () => {
        const res = await supertest(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            items: [oreos]
        })
    })
})
describe('GET /items/:name', () => {
    test('Get item by name', async () => {
        const res = await supertest(app).get(`/items/${oreos.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            item: oreos
        })
    })
    test('Responds with 404 for invalid item', async () => {
        const res = await supertest(app).get('/items/popsicle');
        expect(res.statusCode).toBe(404);
    })
})
describe('POST /items', () => {
    test('Creating a new item', async () => {
        const res = await supertest(app).post('/items').send({
            name: 'Twinkies',
            price: 3.25
        })
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            item: {
                name: 'Twinkies',
                price: 3.25
            }
        })
    })
    test('Responds with 400 if name or price are missing', async () => {
        const res = await supertest(app).post('/items').send({})
        expect(res.statusCode).toBe(400);
    })
})
describe('PATCH /items/:name', () => {
    test('Updating an item name', async () => {
        const res = await supertest(app).patch(`/items/${oreos.name}`).send({
            name: 'White Oreos'
        })
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            updated: {
                name: 'White Oreos',
                price: 1.75
            }
        })
    })
    test('Responds with 404 for invalid name', async () => {
        const res = await supertest(app).patch('/items/oreows').send({
            name: 'White Oreos',
        })
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /items/:name', () => {
    test('Deleting an item', async () => {
        const res = await supertest(app).delete(`/items/${oreos.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            message: 'Deleted'
        })
    })

})