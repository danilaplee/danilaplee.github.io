App = Ember.Application.create();

App.Router.map(function() {
  	this.resource('phone');
  	this.resource('smart');
  	this.resource('modem');
});

/////////PHONE///////////

App.PhoneRoute = Ember.Route.extend({
	model: function() {
		return phone;
	},
	renderTemplate: function() {
    	this.render('phoneControls', {  
    	  into: 'application',                
    	  outlet: 'appControls'
    	});
    	this.render('phone', {  
    	  into: 'application',                
    	  outlet: 'main'
    	});
	}
});

App.PhoneController = Ember.ArrayController.extend({
  queryParams: ['callTime','smsQuantity', 'network'],
  callTime: null,

  filteredArticles: function() {
    var callTime = this.get('callTime');
    var phoneArticles = this.get('phone');

    if (callTime) {
      return phoneArticles.filterBy('callPackage', callTime);
    } else {
      return phoneArticles;
    }
  }.property('callPackage', 'phoneArticles')
});

/////////SMART///////////

App.SmartRoute = Ember.Route.extend({
	model: function() {
		return smart;
	},
	renderTemplate: function() {
    	this.render('smartControls', {  
    	  into: 'application',                
    	  outlet: 'appControls'
    	});
    	this.render('smart', {  
    	  into: 'application',                
    	  outlet: 'main'
    	});
	}
});

App.SmartController = Ember.ArrayController.extend({
  queryParams: ['callTime','internetQuantity', 'network'],
  callTime: null,

  filteredArticles: function() {
    var callTime = this.get('callTime');
    var phoneArticles = this.get('phone');

    if (callTime) {
      return phoneArticles.filterBy('callPackage', callTime);
    } else {
      return phoneArticles;
    }
  }.property('callPackage', 'phoneArticles')
});

/////////MODEM///////////

App.ModemRoute = Ember.Route.extend({
	model: function() {
		return modem;
	},
	renderTemplate: function() {
    	this.render('modemControls', {  
    	  into: 'application',                
    	  outlet: 'appControls'
    	});
    	this.render('modem', {  
    	  into: 'application',                
    	  outlet: 'main'
    	});
	}
});

App.ModemController = Ember.ArrayController.extend({
  queryParams: ['deviceType','internetQuantity'],
  callTime: null,

  filteredArticles: function() {
    var callTime = this.get('callTime');
    var phoneArticles = this.get('phone');

    if (callTime) {
      return phoneArticles.filterBy('callPackage', callTime);
    } else {
      return phoneArticles;
    }
  }.property('callPackage', 'phoneArticles')
});
