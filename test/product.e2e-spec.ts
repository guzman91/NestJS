import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { async } from 'rxjs';
import { disconnect } from 'mongoose';

let productId: string;

const productDTO = {
  name: 'Audi A4',
  year: 2021,
  madeIn: 'U.S.',
  price: 39100,
};

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/products/create')
      .send(productDTO)
      .expect(201)
      .then(({ body }: request.Response) => {
        productId = body._id;
        expect(productId).toBeTruthy();
      });
  });

  it('/products/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/products/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(productId);
      });
  });

  it('/products/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/products/')
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it('/products/ (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/products/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(productId);
      });
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    disconnect();
  });
});
