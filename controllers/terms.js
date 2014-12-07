var secrets = require('../config/secrets');
var Terms = require('../models/Terms'),
	AspectCategory = require('../models/AspectCategory'),
	Aspect = require('../models/Aspect');

/**
 * GET /add-terms
 * Contact form page.
 */

exports.getAddTerms = function(req, res) {
  Aspect.find({}, function(err, aspects) {
  	var result = aspects.reduce(function(prev, curr, index, arr) {
  	  var cat = curr["category"].name;
  	  if (!prev[cat]) {
  	  	prev[cat] = [];
  	  }
  	  prev[cat].push(curr);
  	  return prev;
  	}, {});

	res.render('add-terms', {
	    title: 'Add Terms',
	    categories: result
  	});
  }).populate('category');

};

exports.getTermsByDomain = function(req, res) {
  Terms.find({ serviceDomains: req.params.domain }, function(err, terms) {
  	return res.send(terms);
  }).populate('aspects.aspect');
};

exports.postAddTerms = function(req, res) {
  if(typeof req.body.aspects == 'string') {
  	req.body.aspects = [req.body.aspects];
  }

  Terms.findOne({ domain: req.body.domain }, function(err, existingTerms) {
    if (existingTerms) {
      req.flash('errors', { msg: 'Terms with that domain name already exists.' });
      return res.redirect('/add-terms');
    }

    var aspects = [];

    if (req.body.aspects === undefined) {
      return res.send(500);
    }

    req.body.aspects.map(function(k, v) {
    	aspects.push({
    		aspect: k,
    		weight: req.body[k + '_weight'],
    		citation: req.body[k + '_citation']
    	});
    });

  	var terms = new Terms({
  	  name: req.body.name,
  	  serviceDomains: req.body.domain.split(','),
  	  terms: req.body.terms,
  	  termsUrls: req.body.termsUrl.split(','),
  	  aspects: aspects,
  	  registrationUrl: req.body.registrationUrl,
      interception: req.body.interception,
  	  selector: req.body.selector
  	});

    terms.save(function(err, terms) {
      if (err) return next(err);

      res.redirect('/terms/' + terms._id);
    });
  });

};