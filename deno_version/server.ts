import { Application, Router, RouterContext } from './dependencies.ts';
import { getProperties, createProperty } from './routes.ts';

const app = new Application();
const router = new Router();

router
    .get('/', (ctx) => {
        ctx.response.body = 'Hello from index page!';
    })
    .get('/api/properties', getProperties)
    .post('/api/properties', createProperty);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ hostname, port, secure }) => {
    console.log(`listening on ${secure ? 'https://' : 'http://'}${hostname || 'localhost'}:${port}`);
});

await app.listen({ port: 8000 });
