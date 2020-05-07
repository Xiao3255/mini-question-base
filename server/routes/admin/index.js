module.exports = (app) => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true,
  });

  //create resource
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  //update resource
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  //delete resource
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, res.body);
    res.send({
      success: true,
    });
  });

  //get resource
  router.get('/', async (req, res) => {
    const items = await req.Model.find();
    res.send(items);
  });

  //get an item with id
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  const resourceMiddleware = require('../../middleware/resource');

  app.use('/admin/api/rest/:resource', resourceMiddleware(), router);
};
