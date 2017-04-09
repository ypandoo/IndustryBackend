class Controller {
  constructor(facade) {
    this.facade = facade;
  }

  find(req, res, next) {
    return this.facade.find(req.body)
    .then(collection => res.status(200).json({response_status:'SUCCESS', response_describe:'',data:collection}))
    .catch(err => next(err));
  }

  findOne(req, res, next) {
    return this.facade.findOne(req.query)
    .then(doc => res.status(200).json(doc))
    .catch(err => next(err));
  }

  findById(req, res, next) {
    return this.facade.findById(req.params.id)
    .then((doc) => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }

  create(req, res, next) {
    this.facade.create(req.body)
    .then(doc =>{ res.status(201).json({response_status:'SUCCESS', response_describe:'', data:doc})})
    .catch(err => next(err));
  }

  update(req, res, next) {
    const conditions = { _id: req.params.id };

    this.facade.update(conditions, req.body)
    .then((doc) => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json({response_status:'SUCCESS', response_describe:'', data:doc});
    })
    .catch(err => next(err));
  }

  remove(req, res, next) {
    this.facade.remove(req.params.id)
    .then((doc) => {
      if (!doc) { return res.status(404).end(); }
      return res.status(204).end();
    })
    .catch(err => next(err));
  }

  setIO(io){
    this.io = io;
  }

  getIO(io){
    return this.io ? this.io : null;
  }

}

module.exports = Controller;
