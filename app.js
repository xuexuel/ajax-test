const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const upload = require('./middlewares/upload');
const mysql = require('mysql2/promise');

let db;

~async function () {
  db = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Aa123456',
    database: 'kkb_photos'
  })
}()

// 创建server对象
const app = new Koa();

app.use(KoaStaticCache('./public', {
  prefix: '/public',
  gzip: true,
  dynamic: true
}))

const router = new KoaRouter();


router.get('/', async ctx => {
  ctx.body = '开课吧';
})

router.get('/getPhotos', async ctx => {

  let [rs] = await db.query("select * from `photos`");

  ctx.body = rs;
})
router.post('/upload', upload(), async ctx => {
  let path = ctx.request.files.file.path;
  let paths = path.split('\\');
  let rs = await db.query("insert into `photos` (`name`) values (?)", [
    paths[paths.length - 1]
  ])

  console.log('rs', rs);
  ctx.body = paths[paths.length - 2] + '/' + paths[paths.length - 1];
})


app.use(router.routes());

app.listen(3000);