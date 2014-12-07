var secrets = require('../config/secrets');
var Aspect = require('../models/Aspect'),
  AspectCategory = require('../models/AspectCategory');

/**
 * GET /add-aspect
 */

exports.getAddAspectCategory = function(req, res) {
  res.render('add-aspect-category', {
    title: 'Add Aspect Category'
  });
};

exports.postAddAspectCategory = function(req, res) {

  AspectCategory.findOne({ name: req.body.name }, function(err, existingAspectCategory) {
    if (existingAspectCategory) {
      req.flash('errors', { msg: 'Aspect Category already exists.' });
      return res.redirect('/category/create');
    }

    var aspectCategory = new AspectCategory({
      name: req.body.name
    });

    aspectCategory.save(function(err, aspectCategory) {
      if (err) return next(err);

      return res.redirect('/category/create');
    });
  });

};