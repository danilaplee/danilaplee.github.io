	var logo = Snap.select('#logo');
	var $logo = $('#logo');
	var circles = logo.selectAll('.letter');
	var infoBlock = $('.info-block');
	var opacityBlock = $('.opacity-block');
	var inter = 0;
	var timer = 700;
	var recolor = function(el, text, bg)
	{
			var name = el.node.classList[1];
			var letters = logo.selectAll('.letter-self.'+name)
			letters.forEach(function(letter)
			{
				letter.animate({
					'stroke':text
				}, timer-300)
			})
			el.animate({
				'fill': bg,
				'stroke':'#000'
			}, timer-300)
	}
	var scaleUp = function(el)
	{
		var name = el.node.classList[1];
		var letters = logo.selectAll('.letter-self.'+name)
		letters.forEach(function(l)
		{
			l.animate({
				'transform':'scale(1.45) translate(-100 -150)'
			}, timer)
		})
		el.animate({
				'transform':'scale(1.45) translate(-100 -150)'
		}, timer)

		var other = [];
		circles.forEach(function(c)
		{
			if(c.node.classList[1] != name)
			{
				other.push(c)
			}
		})
		other.forEach(function(o)
		{
			scaleDown(o)
		})
		infoBlock.velocity({
			'top':'30%'
		}, 700)
		opacityBlock.velocity({
			'top':0
		}, 700)
	}
	var scaleDown = function(el)
	{
		var name = el.node.classList[1];
		var letters = logo.selectAll('.letter-self.'+name)
		letters.forEach(function(l)
		{
			l.animate({
				'transform':'scale(0.3)'
			}, 700)
		})
		el.animate({
				'transform':'scale(0.3)'
		}, 700)
	}
	var bindActions = function()
	{
		circles.forEach(function(circle)
		{
			circle.click(function()
			{
				if(circle.node.classList[1] == 'letter-center')
				{
					console.log('center');
					resetState();
				}
				else
				{
					scaleUp(circle)
				}
			})
			circle.mouseover(function()
			{
				recolor(circle,'#fff', '#000');
			});
			circle.mouseout(function()
			{
				recolor(circle,'#000', '#fff');
			});
		});
	}
	circles.forEach(function(circle)
	{
		if(circle.node.classList[1] == 'letter-center')
		{
			setTimeout(recolor, inter*(timer-200), circle, '#46629E', 'transparent');
			setTimeout(bindActions, inter*(timer-150))
		}
		else
		{
			setTimeout(recolor, inter*(timer-200), circle, 'transparent', 'transparent');
		}
		inter++;
	})
	var resetState = function()
	{
		circles.forEach(function(c)
		{
			var name = c.node.classList[1];
			var letters = logo.selectAll('.letter-self.'+name)
			c.animate({
				'transform':'scale(1)'
			}, 600)
			letters.forEach(function(l)
			{
				l.animate({
					'transform':'scale(1)'
				}, 600)
			})
		})
		infoBlock.velocity({
			'top':'-110%'
		}, 700)
		opacityBlock.velocity({
			'top':'100%'
		}, 700)
	}