var secrets = require('../config/secrets');
var Aspect = require('../models/Aspect'),
  AspectCategory = require('../models/AspectCategory');

/**
 * GET /add-aspect
 */

exports.getAddAspect = function(req, res) {
  AspectCategory.find({}, function(err, categories) {
    
    res.render('add-aspect', {
      title: 'Add Aspect',
      categories: categories
    });

  });
};

exports.postAddAspect = function(req, res) {

  Aspect.findOne({ text: req.body.text }, function(err, existingTerms) {
    if (existingTerms) {
      req.flash('errors', { msg: 'Aspect with that text already exists.' });
      return res.redirect('/aspect/create');
    }

    AspectCategory.findOne({ _id: req.body.category }, function(err, category) {
      if (!category) {
        req.flash('errors', { msg: 'Aspect Category does not exist' });
        return res.redirect('/add-aspect');
      }

      var aspect = new Aspect({
        text: req.body.text,
        category: category
      });

      aspect.save(function(err, terms) {
        if (err) return next(err);

        res.redirect('/aspect/create');
      });
    });
  });

};