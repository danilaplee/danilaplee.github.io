///THIS IS THE MONSTER/CORE APP
var SiteBuilderFramework = 
{

	//@INITIALIZE
	SiteBuilder:function(config) {
		this.config 	= config;
		this.dom 		= SiteBuilderFramework.DomWorker.bind(this)()
		this.storage 	= SiteBuilderFramework.StorageAdapter.bind(this)()
		this.controller = SiteBuilderFramework.Controller.bind(this)()
		return this;
	},

	//@CONTROLLER
	Controller:function() {
		var self = this
		self.dom.buildDefault()
	},

	//@VIEW
	DomWorker:function() {
		var self = this
		self.dom = {}
		self.dom.templates 	= new SiteBuilderFrameworkTemplateEngine(self.config)

		//HERE WE GET ALL THE FIRST LEVEL BINDINGS
		//THIS SHOULD AUTOMATICALLY GENERATED TO ALLOW VERTICAL SCALING
		
		self.dom.top 		= document.getElementById(self.config.html._top)
		self.dom.first 		= document.getElementById(self.config.html._first)
		self.dom.second 	= document.getElementById(self.config.html._second)
		self.dom.third 		= document.getElementById(self.config.html._third)
		self.dom.fourth 	= document.getElementById(self.config.html._fourth)
		self.dom.fifth 		= document.getElementById(self.config.html._fifth)

		self.dom.toggleClass = function(el, change) {
		
			if(el.className.search(change) > -1) {
				el.className = el.className.replace(" "+change, "")
				el.className = el.className.replace(change, "")
			} else {
				el.className += " "+change
			}
			return el;
		}

		self.dom.buildDefault = function() {
			try{
				//FILL UP THE HEADER
				self.dom.top.innerHTML 		= self.dom.templates.topNav(self.config.data_structures.company)

				//GENDATA
				var first_row = JSON.parse(JSON.stringify(self.config.data_structures.cardRow))
					first_row.id = self.storage.uuid4()
				var second_row = JSON.parse(JSON.stringify(self.config.data_structures.imageRow3))
					second_row.id = self.storage.uuid4()
				var third_row = JSON.parse(JSON.stringify(self.config.data_structures.imageRow5))
					third_row.id = self.storage.uuid4()
				var fourth_row = JSON.parse(JSON.stringify(self.config.data_structures.imageRow3))
					fourth_row.id = self.storage.uuid4()
					fourth_row.title = "Работа с возражениями"

				//FILL UP THE BLOCKS
				self.dom.first.innerHTML 	= self.dom.templates.cardRow(first_row)
				self.dom.second.innerHTML 	= self.dom.templates.imageRow3(second_row)
				self.dom.third.innerHTML 	= self.dom.templates.imageRow5(third_row)
				self.dom.fourth.innerHTML 	= self.dom.templates.imageRow3(fourth_row)

				//
				var cardRowWithTitle 		= JSON.parse(JSON.stringify(self.config.data_structures.cardRow))
					cardRowWithTitle.id 	= self.storage.uuid4()
					cardRowWithTitle.title  = "Подробная Техническая Информация"

					//TESTING THE ITEM LIST
					cardRowWithTitle.items[0].list[0] = "Совершенство"
					cardRowWithTitle.items[0].list[1] = "Технологии"
					cardRowWithTitle.items[0].list[2] = "Маркетинг"

					cardRowWithTitle.items[1].list[0] = "Совершенство"
					cardRowWithTitle.items[1].list[1] = "Технологии"
					cardRowWithTitle.items[1].list[2] = "Маркетинг"

					cardRowWithTitle.items[2].list[0] = "Совершенство"
					cardRowWithTitle.items[2].list[1] = "Технологии"
					cardRowWithTitle.items[2].list[2] = "Маркетинг"
				self.dom.fifth.innerHTML 	= self.dom.templates.cardRow(cardRowWithTitle)

				var rows = 
				{
					first:first_row,
					second:second_row,
					third:third_row,
					fourth:fourth_row,
					fifth:cardRowWithTitle
				}
				//HERE WE SYMLINK ALL THE DATA WE CREATED TO OUR CACHE STORAGE
				self.storage.cache.rows = rows;
				self.dom.bindDefault()
			}
			catch(err) {
				console.error(err)
			}
		}

		self.dom.bindTopNav = function() {
			
			var name 	= document.getElementById("company_name")
			var logo 	= document.getElementById("company_logo")
			var slogan  = document.getElementById("company_slogan")
			var contacts = {

				"phone" 		:document.getElementById("company_phone"),
				"address" 		:document.getElementById("company_address"),
				"email"			:document.getElementById("company_email"),
				"email_edit" 	:document.getElementById("company_email_input"),
				"address_edit" 	:document.getElementById("company_address_input"),
				"phone_edit" 	:document.getElementById("company_phone_input"),
				"email_c" 		:document.getElementById("company_email_container"),
				"address_c" 	:document.getElementById("company_address_container"),
				"phone_c" 		:document.getElementById("company_phone_container"),

			}

			var titles = {
				name:document.getElementById("company_name"),
				name_edit:document.getElementById("company_name_input"),
				slogan:document.getElementById("company_slogan"),
				slogan_edit:document.getElementById("company_slogan_input")
			}
			var enableEditingForContacts = function(contact) {

				contacts[contact].addEventListener("click", function(){
					contacts[contact+"_edit"].value = contacts[contact].innerHTML
					self.dom.toggleClass(contacts[contact+"_c"], "hidden")
					self.dom.toggleClass(contacts[contact+"_edit"], "hidden")
					contacts[contact+"_edit"].focus()
				})

				contacts[contact+"_edit"].addEventListener("focusout", function() {
					contacts[contact].innerHTML = contacts[contact+"_edit"].value
					self.dom.toggleClass(contacts[contact+"_edit"], "hidden")
					self.dom.toggleClass(contacts[contact+"_c"], "hidden")
				})

			}

			var enableEditingForTitles = function(title)
			{
				titles[title].addEventListener("click", function()
				{
					titles[title+"_edit"].value = titles[title].innerHTML
					self.dom.toggleClass(titles[title], "hidden");
					self.dom.toggleClass(titles[title+"_edit"], "hidden");
					titles[title+"_edit"].focus()
				})

				titles[title+"_edit"].addEventListener("focusout", function() 
				{
					titles[title].innerHTML = titles[title+"_edit"].value
					self.dom.toggleClass(titles[title+"_edit"], "hidden")
					self.dom.toggleClass(titles[title], "hidden")
				})
			}

			enableEditingForContacts("phone");
			enableEditingForContacts("address");
			enableEditingForContacts("email")

			enableEditingForTitles("name")
			enableEditingForTitles("slogan")
		}


		var bindCard = function(i, row_id) 
		{
			var image 	= document.getElementById('card_'+i+'_image_edit_'+row_id)
			var title 	= document.getElementById('card_'+i+'_title_edit_'+row_id)
			var text  	= document.getElementById('card_'+i+'_text_edit_'+row_id)
			var image_i = document.getElementById('card_'+i+'_image_edit_'+row_id+'_input')
			var title_i = document.getElementById('card_'+i+'_title_edit_'+row_id+'_input')
			var text_i  = document.getElementById('card_'+i+'_text_edit_'+row_id+'_input')

			image.addEventListener("click", function(){
				image_i.value = image.src
				self.dom.toggleClass(image, "hidden")
				self.dom.toggleClass(image_i, "hidden")
				image_i.focus()
			})
			image_i.addEventListener("focusout", function(){
				image.src = image_i.value
				self.dom.toggleClass(image_i, "hidden")
				self.dom.toggleClass(image, "hidden")
			})
			title.addEventListener("click", function(){
				title_i.value = title.innerHTML
				self.dom.toggleClass(title, "hidden")
				self.dom.toggleClass(title_i, "hidden")
				title_i.focus()
			})
			title_i.addEventListener("focusout", function(){
				title.innerHTML = title_i.value
				self.dom.toggleClass(title_i, "hidden")
				self.dom.toggleClass(title, "hidden")
			})
			text.addEventListener("click", function(){
				text_i.innerHTML = text.innerHTML
				self.dom.toggleClass(text, "hidden")
				self.dom.toggleClass(text_i, "hidden")
				text_i.focus()
			})
			text_i.addEventListener("focusout", function(){
				text.innerHTML = text_i.innerHTML
				self.dom.toggleClass(text_i, "hidden")
				self.dom.toggleClass(text, "hidden")
			})
		}

		var bindImage = function(i, row_id) {
			try {
				var image 	= document.getElementById('iItem_'+i+'_image_edit_'+row_id)
				var title 	= document.getElementById('iItem_'+i+'_text_edit_'+row_id)
				var image_i = document.getElementById('iItem_'+i+'_image_edit_'+row_id+'_input')
				var title_i = document.getElementById('iItem_'+i+'_text_edit_'+row_id+'_input')
				image.addEventListener("click", function(){
					image_i.value = image.src
					self.dom.toggleClass(image, "hidden")
					self.dom.toggleClass(image_i, "hidden")
					image_i.focus()
				})
				image_i.addEventListener("focusout", function(){
					image.src = image_i.value
					self.dom.toggleClass(image_i, "hidden")
					self.dom.toggleClass(image, "hidden")
				})
				title.addEventListener("click", function(){
					title_i.value = title.innerHTML
					self.dom.toggleClass(title, "hidden")
					self.dom.toggleClass(title_i, "hidden")
					title_i.focus()
				})
				title_i.addEventListener("focusout", function(){
					title.innerHTML = title_i.value
					self.dom.toggleClass(title_i, "hidden")
					self.dom.toggleClass(title, "hidden")
				})
			}
			catch(err){
				console.error(err)
			}

		}

		self.dom.bindCardRow = function(row) {
			var row_id = row.id
			var d = [0,1,2]

			for (var i = 0; i < d.length; i++) bindCard(i, row_id)
		}

		self.dom.bindCardRows = function() {
			var rows = self.storage.cache.rows
			var r_keys = Object.keys(rows)
			for (var i = 0; i < r_keys.length; i++) if(rows[r_keys[i]].type == "card_row") self.dom.bindCardRow(rows[r_keys[i]])
		}
		self.dom.bindImageRow = function(row) {
			// var type = row.type
			var d = []
			if(row.type == "image_row_3") d = [0,1,2]
			if(row.type == "image_row_5") d = [0,1,2,3,4]

			for (var i = 0; i < d.length; i++) bindImage(i, row.id)
		}
		self.dom.bindImageRows = function() {
			var rows = self.storage.cache.rows
			var r_keys = Object.keys(rows)
			for (var i = 0; i < r_keys.length; i++) if(rows[r_keys[i]].type != "card_row") self.dom.bindImageRow(rows[r_keys[i]])

		}

		self.dom.bindDefault = function() {
			self.dom.bindTopNav()
			self.dom.bindCardRows()
			self.dom.bindImageRows()
		}

		return self.dom;

	},
	//@MODEL
	StorageAdapter:function() 
	{
		var self 				= this
		var gen_db_key 			= function(key) { return self.config.db_key+":"+self.config.db_version+":"+key }
		self.storage 			= {}
		self.storage.cache 		= {}
		self.storage.gen_db_key = gen_db_key
		self.storage.uuid4 = function () {
		    var uuid = '', ii;
		    for (ii = 0; ii < 32; ii += 1) {
		      switch (ii) {
		      case 8:
		      case 20:
		        uuid += '';
		        uuid += (Math.random() * 16 | 0).toString(16);
		        break;
		      case 12:
		        uuid += '';
		        uuid += '4';
		        break;
		      case 16:
		        uuid += '';
		        uuid += (Math.random() * 4 | 8).toString(16);
		        break;
		      default:
		        uuid += (Math.random() * 16 | 0).toString(16);
		      }
		    }
		    return uuid;
		};
		self.storage.set = function(key, value) {
			console.log("====== storage set =======")
			console.log(gen_db_key(key), value)
			console.log("====== storage set =======")
			localStorage.setItem(gen_db_key(key), JSON.stringify(value))
		}
		self.storage.get = function(key)
		{
			return new Promise(function(resolve,reject){
				try {
					var data = JSON.parse(localStorage.getItem(gen_db_key(key)))
					if(data == null) return reject("data is empty");
					resolve(data)
				}
				catch(err) {
					reject(err)
				}
			})
		}
		return self.storage;
	}
}

//LETS RUN IT!
var siteEngine = new SiteBuilderFramework.SiteBuilder(new SiteBuilderFrameworkConfiguration())

document.getElementById("scripts_container").remove()