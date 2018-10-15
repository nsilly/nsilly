import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeRouterCommand extends Command {
  signature() {
    return 'make:router <router>';
  }

  description() {
    return 'Create new router file';
  }

  options() {
    return [{ key: 'withsample?', description: 'Generate sample resource router' }, { key: 'override?', description: 'Override existing file' }];
  }

  async handle(router, options) {
    const file = path.resolve(__dirname, '../../../', 'routes', `${router}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${router} already exist`);
    }
    let content;
    if (options.withsample === true) {
      content = `import express from 'express';
import { AsyncMiddleware } from '@nsilly/support'
import { Request } from '@nsilly/support';
// import { AuthMiddleware } from '@nsilly/auth';
// import { App } from '@nsilly/container';
// import SampleRepository from '../../../app/Repositories/SampleRepository';
// import ApiResponse from '../../../app/Responses/ApiResponse';
// import SampleTransformer from '../../../app/Transformers/SampleTransformer';
// import { SamepleValidator, CREATE_RULE, UPDATE_RULE } from '../../../app/Validators/SamepleValidator';

const router = express.Router();

// router.all('*', AuthMiddleware);
router.get('/', AsyncMiddleware(index));
router.get('/:id', AsyncMiddleware(show));
router.post('/', AsyncMiddleware(create));
router.put('/:id', AsyncMiddleware(update));
router.delete('/:id', AsyncMiddleware(destroy));

async function index(req, res) {
    // const repository = new SampleRepository();
    // repository.applyConstraintsFromRequest();
    // repository.applySearchFromRequest(['seller_email']);
    // repository.applyOrderFromRequest();

    // const result = await repository.paginate();

    // res.json(ApiResponse.paginate(result, new SampleTransformer()));
}

async function show(req, res) {
    // const id = req.params.id;
    // const repository = new SampleRepository();
    // const result = await repository.findById(id);
    // res.json(ApiResponse.item(result, new SampleTransformer()));
}

async function create(req, res) {
    // SamepleValidator.isValid(Request.all(), CREATE_RULE);
    // const repository = new SampleRepository();
    // const result = await repository.create(Request.all());
    // res.json(ApiResponse.item(result, new SampleTransformer()));
}

async function update(req, res) {
    // SamepleValidator.isValid(Request.all(), UPDATE_RULE);
    // const repository = new SampleRepository();
    // const result = await repository.update(Request.all(), req.params.id);
    // res.json(ApiResponse.item(result, new SampleTransformer()));
}

async function destroy(req, res) {
    // App.make(SampleRepository).deleteById(req.params.id);
    // res.json(ApiResponse.success());
}

export default router;
 `;
    } else {
      content = `import express from 'express';
import { AsyncMiddleware } from '@nsilly/support'
// import { AuthMiddleware } from '../../../app/Middlewares/AuthMiddleware';

const router = express.Router();

// router.all('*', AuthMiddleware);
router.get('/', AsyncMiddleware(index));
router.get('/:id', AsyncMiddleware(show));
router.post('/', AsyncMiddleware(create));
router.put('/:id', AsyncMiddleware(update));
router.delete('/:id', AsyncMiddleware(destroy));

async function index(req, res) {}

async function show(req, res) {}

async function create(req, res) {}

async function update(req, res) {}

async function destroy(req, res) {}

export default router;
`;
    }
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
