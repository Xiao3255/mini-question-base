module.exports = (options) => {
  return async (req, res, next) => {
    const { AdminUser, jwt, assert } = options;
    const token = (req.headers.authorization || '').split(' ').pop();
    assert(token, 401, '请提供有效的jwt token');
    const { id } = jwt.verify(token, req.app.get('secret'));
    assert(id, 401, '无效的jwt token');
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, '用户不存在');
    await next();
  };
};
