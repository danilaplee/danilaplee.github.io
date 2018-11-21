
///THIS THING PRODUCES HTML STRINGS FOR DIRECT DOM INJECTION

var SiteBuilderFrameworkTemplateEngine = function(config) {
	var self = this;
	this.config = config

	this.topNav = function(params) {

		var html = '<div class="row">'

			//html +=	'<!-- LEFT -->'
			
			html += '<div class="col-xs-4 col-sm-4 col-lg-4 text-center">'
			html +=	'	<img id="company_logo" src="'+params.logo+'" class="mainLogo">'
			html +=	'	<h4 class="logoText hidden" id="company_name">'+params.logoText+'</h4>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="company_name_input" value="'+params.logoText+'">'
			html +=	'</div>'

			//html +=	'<!-- CENTER -->'
			
			html +=	'<div class="col-xs-4 col-sm-4 col-lg-4 text-center slogan-container">'
			html +=	'	<h1 class="slogan" id="company_slogan">'+params.slogan+'</h1>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="company_slogan_input" value="'+params.slogan+'">'
			html +=	'</div>'

			//html +=	'<!-- RIGHT -->'
			
			html +=	'<div class="col-xs-4 col-sm-4 col-lg-4 headContact">'
			html +=	'	<p id="company_phone_container">Телефон: <span id="company_phone">'+params.phone+'</span></p>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="company_phone_input" value="'+params.phone+'">'
			html +=	'	<p id="company_email_container">Email: <span id="company_email"> '+params.email+'</span></p>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="company_email_input" value="'+params.email+'">'
			html +=	'	<p id="company_address_container">Адрес: <span id="company_address">'+params.address+'</span></p>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="company_address_input" value="'+params.address+'">'
			html +=	'</div>'
			html +='</div>'

			return html;
	}

	this.card = function(params) {

		var row_id 	= params.id
		var n 		= params.n

		var html = '<div class="col-xs-12 col-sm-4 col-lg-4 text-center">'
			html +=	'<div class="card project-card">'
			html +=	'	  <img class="card-img-top" '
			if(self.config.env == "dev") html += 'id="card_'+n+'_image_edit_'+row_id+'"' 
			html += 'src="'+params.img+'" alt="Проект 1">'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="card_'+n+'_image_edit_'+row_id+'_input" value="'+params.img+'">'
			html +=	'	  <div class="card-block">'
			html +=	'	    <h4 class="card-title"'
			if(self.config.env == "dev") html += ' id="card_'+n+'_title_edit_'+row_id+'"'
			html += '>'+params.title+'</h4>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="card_'+n+'_title_edit_'+row_id+'_input" value="'+params.title+'">'
			html +=	'	    <p class="card-text"' 
			if(self.config.env == "dev") html += 'id="card_'+n+'_text_edit_'+row_id+'"'
			html += '>'+params.text+'</p>'
			if(self.config.env == "dev") html += '	<textarea class="base-input hidden" type="text" id="card_'+n+'_text_edit_'+row_id+'_input">'+params.text+'</textarea>'
			html +=	'	  </div>'
			html +=	'	  <ul class="list-group list-group-flush">'
					for (var i = params.list.length - 1; i >= 0; i--) {
			html +=	'<li class="list-group-item">'+params.list[i]+'</li>'
					}
			html +=	'	  </ul>'
			html +=	'	  <div class="card-block">'
					for (var i = 0; i < params.links.length; i++) {
			html +=	'<a href="'+params.links[i].href+'" class="card-link">'+params.links[i].text+'</a><br>'
					}
			html +=	'	  </div>'
			html +=	'	</div>'
			html +=	'</div>'

			return html;
	}

	this.imageItem = function(params) {
		var row_id = params.id
		var n = params.n
		var html  ='<div class="col-xs-12 '+params.column+' text-center process-feature">'
			html +=	'<img id="iItem_'+n+'_image_edit_'+row_id+'" src="'+params.img+'">'
			if(self.config.env == "dev") html += '	<input class="base-input hidden" type="text" id="iItem_'+n+'_image_edit_'+row_id+'_input" value="'+params.img+'">'
			html +=	'<h4 id="iItem_'+n+'_text_edit_'+row_id+'">'+params.text+'</h4>'
			if(self.config.env == "dev") html += '	<input class="base-input hidden text-input" type="text" id="iItem_'+n+'_text_edit_'+row_id+'_input" value="'+params.text+'">'
			html +='</div>'
		return html;
	}


	this.slideTitle = function(params) {

		var html  ='<div class="row">'
			html += '<div class="col-xs-12 text-center">'
			html += '	<hr>'
			html += '	<h4 style="text-transform: uppercase;">'+params.title+'</h4>'
			html += '	<hr>'
			html += '</div>'
			html +='</div>'
		return html

	}

	this.imageRow3 = function(params) {
		var html  =""
		if(params.title) html += self.slideTitle(params)

			html +='<div class="row max-1000" id="row_container_'+params.id+'">'
			for (var i = 0; i < params.items.length; i++) {
				params.items[i].column = "col-lg-4"
				params.items[i].n = i
				params.items[i].id = params.id
				html += self.imageItem(params.items[i])
			}
			html +='</div>'
		return html;

	}

	this.imageRow5 = function(params) {
		var html  = ""
		if(params.title) html += self.slideTitle(params)

			html +='<div class="row max-1000" id="row_container_'+params.id+'">'

			for (var i = 0; i < params.items.length; i++) {
				if(i == 0 || i == 2 || i == 4) params.items[i].column = 'col-lg-2'
				else params.items[i].column = 'col-lg-3'
				params.items[i].n = i
				params.items[i].id = params.id	
				html += self.imageItem(params.items[i])
			}
			html +='</div>'

		return html;
	}

	this.cardRow = function(params) {
		var html = ''
		if(params.title) html += self.slideTitle(params)

			html += '<div class="row max-1000" id="row_container_'+params.id+'">'
			for (var i = 0; i < params.items.length; i++) {
				var p    = params.items[i]
					p.id = params.id
					p.n  = i
				html += self.card(p)
			}
			html += '</div>'

		return html;
	}
}