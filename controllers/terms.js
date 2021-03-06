var secrets = require('../config/secrets');
var Terms = require('../models/Terms'),
	AspectCategory = require('../models/AspectCategory'),
	Aspect = require('../models/Aspect');

/**
 * GET /add-terms
 * Contact form page.
 */

exports.getCreateTerms = function(req, res) {
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
	    title: 'Submit Service',
	    categories: result
  	});
  }).populate('category');

};

exports.getTermsByDomain = function(req, res) {
  Terms.find({ serviceDomains: req.params.domain, reviewed: true }, function(err, terms) {
  	return res.send(terms);
  }).populate('aspects.aspect');
};

exports.listTerms = function(req, res) {
  Terms.find({}, function(err, terms) {
    res.render('list-terms', {
      title: 'List Terms',
      terms: terms
    });
  });
};

exports.postCreateTerms = function(req, res) {
  if(typeof req.body.aspects == 'string') {
  	req.body.aspects = [req.body.aspects];
  }

  Terms.findOne({ domain: req.body.domain }, function(err, existingTerms) {
    if (existingTerms) {
      req.flash('errors', { msg: 'Terms with that domain name already exists.' });
      return res.redirect('/terms/create');
    }

    var aspects = [];

    if (req.body.aspects === undefined) {
      return res.send(500);
    }

    req.body.aspects.map(function(k, v) {
    	aspects.push({
    		aspect: k,
    		weight: (req.body[k + '_weight'] || 1),
    		citation: (req.body[k + '_citation'] || '')
    	});
    });

  	var terms = new Terms({
  	  name: req.body.name,
  	  serviceDomains: req.body.domain.split(','),
  	  termsUrls: req.body.termsUrl.split(','),
  	  aspects: aspects,
  	  registrationUrl: req.body.registrationUrl,
      interception: req.body.interception,
  	  selector: req.body.selector
  	});

    terms.save(function(err, terms) {
      if (err) return res.send(500, err);

      res.redirect('/terms/create');
    });
  });

};

exports.getTerms = function(req, res) {
  if (!req.params.id) return res.send(401);


  Aspect.find({}, function(err, aspects) {
    var result = aspects.reduce(function(prev, curr, index, arr) {
      var cat = curr["category"].name;
      if (!prev[cat]) {
        prev[cat] = [];
      }
      prev[cat].push(curr);
      return prev;
    }, {});

    Terms.findOne({'_id': req.params.id}, function(err, terms) {
      
      terms.activeAspects = {};

      terms.aspects.forEach(function(item) {
        terms.activeAspects[item.aspect] = true;
        
        if (item.citation)
          terms[item.aspect + '_citation'] = item.citation;

        terms[item.aspect + '_weight'] = item.weight;
      });

      terms.domain = terms.serviceDomains.join(',');
      terms.termsUrl = terms.termsUrls.join(',');

      res.render('edit-terms', {
        title: 'Terms of ' + terms.name,
        terms: terms,
        categories: result
      });

    });
  }).populate('category');
};

exports.postTerms = function(req, res) {

  if(typeof req.body.aspects == 'string') {
    req.body.aspects = [req.body.aspects];
  }

  if (!req.params.id) return res.send(401);

  Terms.findOne({ '_id': req.params.id }, function(err, terms) {
    var aspects = [];

    if (req.body.aspects === undefined) {
      return res.send(500);
    }

    req.body.aspects.map(function(k, v) {
      aspects.push({
        aspect: k,
        weight: (req.body[k + '_weight'] || 1),
        citation: (req.body[k + '_citation'] || '')
      });
    });

    terms.name = req.body.name;
    terms.serviceDomains = req.body.domain.split(',');
    terms.termsUrls = req.body.termsUrl.split(',');
    terms.aspects = aspects;
    terms.registrationUrl = req.body.registrationUrl;
    terms.interception = req.body.interception;
    terms.selector = req.body.selector;
    terms.reviewed = (req.body.reviewed == '1') ? true : false;

    terms.save(function(err, terms) {
      if (err) return res.send(500, err);

      res.redirect('/terms/' + terms._id);
    });
  });

};