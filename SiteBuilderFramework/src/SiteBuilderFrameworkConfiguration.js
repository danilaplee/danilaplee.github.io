///THIS THING CONFIGURATES EVERYTHING
var SiteBuilderFrameworkConfiguration = function(params) {
	//@SITEBUILDER CONFIGURATION
	this.db_key 		= "SiteBuilder"
	this.db_version 	= "0.5.3"
	this.env 			= "dev"
 
	// //@HTML INTEGRATION
	this.html = 
	{
		_first: 	"first_slide",
		_second: 	"second_slide",
		_third: 	"third_slide",
		_fourth: 	"fourth_slide",
		_fifth: 	"fifth_slide",
		_add_slide: "add_slide",
		_top: 		"top_nav"
	}

	this.params = params;


	/////////@MODEL/////////

	var card = {
			title:"Card title",
			img:"http://media.rightmove.co.uk/dir/crop/10:9-16:9/69k/68839/48031953/68839_7381294_IMG_01_0000_max_476x317.jpg",
			text:"Some quick example text to build on the card title and make up the bulk of the card`s content.",
			links:[
				{
				 	"href":"#",
				 	"text":"Card link",
				},
				{
				 	"href":"#",
				 	"text":"Another link",
				}
			],
			list:[]
	}
	var image_w_text  = {
		img:"http://media.rightmove.co.uk/dir/crop/10:9-16:9/69k/68839/48031953/68839_7381294_IMG_01_0000_max_476x317.jpg",
		text:"Hello World!"
	}
	var image_w_n_text  = {
		img:"http://media.rightmove.co.uk/dir/crop/10:9-16:9/69k/68839/48031953/68839_7381294_IMG_01_0000_max_476x317.jpg",
		text:""
	}

	this.data_structures = 
	{
		company:{
			logo:"logo1.svg",
			logoText:"СтройДом <br> Технологии",
			slogan:"Строим наверняка!",
			phone:"+79991119999",
			email:"admin@domplanstroi",
			address:"Москва, ул. Домовая 15"
		},
		card: card,
		cardRow: {
			type:"card_row",
			items:[
				card,
				card,
				card
			],
		},
		image_w_text: image_w_text,
		imageRow3: {
			title:"Построенные обьекты",
			type:"image_row_3",
			items: [
				image_w_text,
				image_w_text,
				image_w_text
			]
		},
		imageRow5: {
			title:"Технология",
			type:"image_row_5",
			items: [
				image_w_n_text,
				image_w_n_text,
				image_w_n_text,
				image_w_n_text,
				image_w_n_text
			]
		}
	}

	/////////@MODEL/////////
}