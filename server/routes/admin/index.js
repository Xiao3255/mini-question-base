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

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1.find the user by username
    const AdminUser = require('../../models/AdminUser');
    // use select('+password') to force get the value cause we had set the password's select value false in model AdminUser
    const user = await AdminUser.findOne({ username }).select('+password');
    // use status code 422 to mean that the data sent from client side have some issue
    // 2.validating password
    if (!user) {
      return res.status(422).send({
        message: '用户不存在',
      });
    }
    const isValid = require('bcrypt').compareSync(password, user.password);
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误',
      });
    }
    // 3.return token
    const jwt = require('jsonwebtoken');
    // use the sign to generate a token
    const token = jwt.sign({ id: user._id},app.get('secret'))
    res.send({token})
  });
};
