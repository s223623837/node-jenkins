import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'; 

describe('GET /', () => {
    it('should return Hello, World!', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('Hello, World!');
                done();
            });
    });
});
