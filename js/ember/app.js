App = Ember.Application.create();

App.Router.map(function() {
  	this.resource('phone');
  	this.resource('smart');
  	this.resource('modem');
});

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
