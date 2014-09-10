<script type="text/x-handlebars" id='phoneControls'>
		<article class="selected">
					<p>Тарифы с оплатой за минуты и количество отправленных смс. Без интернета.</p>
					<figure class="basicSelector">
						<p>Куда вы звоните</p>
						<select name="" id="">
							<option value="">На мобильные и городские (Вне сети)</option>
							<option value="">На мобильные и городские (Вне сети)</option>
							<option value="">На мобильные и городские (Вне сети)</option>
						</select>
					</figure>
					<figure class="radioSelector">
							<p>Продолжительность звонка (мин.)</p>
							<input type="radio" name="callTime" class="active" checked>
							<span>Мало <br /> 1-5 мин.</span>
							<input type="radio" name="callTime">
							<span>Средне <br /> 5-10 мин.</span>
							<input type="radio" name="callTime">
							<span>Много <br /> 10 мин. и более</span>
					</figure>
					<figure class="radioSelector">
							<p>Количество СМС (в месяц)</p>
							<input type="radio" name="smsQuantity" class="active" checked>
							<span>50</span>
							<input type="radio" >
							<span>100</span>
							<input type="radio" >
							<span>200</span>	
					</figure>
		</article>
	</script>
	<script type="text/x-handlebars" id='smartControls'>
		<article class="selected">
					<p>Тарифы с пакетами минут, смс и интернета. Оплачиваются раз в месяц.</p>
					<figure class="basicSelector">
						<p>Куда вы звоните</p>
						<select name="" id="">
							<option value="">На мобильные и городские <span>(Вне сети)</span></option>
							<option value="">На мобильные и городские <span>(Вне сети)</span></option>
							<option value="">На мобильные и городские <span>(Вне сети)</span></option>
						</select>
					</figure>
					<figure class="radioSelector">
							<p>Продолжительность звонка (мин.)</p>
							<input type="radio" name="callTime" class="active" checked>
							<span>Мало <br /> 1-5 мин.</span>
							<input type="radio" name="callTime">
							<span>Средне <br /> 5-10 мин.</span>
							<input type="radio" name="callTime">
							<span>Много <br /> 10 мин. и более</span>
					</figure>
					<figure class="basicSelector">
							<p>Объём интернета</p>
							<select name="" id="" class="traffic">
								<option value="">0.5 ГБ <span>(почта и новости)</span></option>
								<option value="">1 ГБ</option>
								<option value="">2 ГБ</option>
							</select>
					</figure>
		</article>
	</script>
	<script type="text/x-handlebars" id='modemControls'>
		<article class="selected">
					<p>Тарифы для интернета. Не подходят для частых звонков и смс.</p>
					<figure class="radioSelector device">
							<p>Устройство</p>
							<input type="radio" name="callTime" class="active" checked>
							<span>Планшет</span>
							<input type="radio" name="callTime">
							<span>USB - модем</span>
					</figure>
					<figure class="basicSelector">
							<p>Объём интернета</p>
							<select name="" id="" class="traffic">
								<option value="">0.5 ГБ <span>(почта и новости)</span></option>
								<option value="">1 ГБ</option>
								<option value="">2 ГБ</option>
							</select>
					</figure>
		</article>
	</script>
	<script type="text/x-handlebars" id="phone">	
		<div class="mobileTable phone selected">
			<header>
				<ul>
					<li class="col-md-4">
						Тариф
					</li>
					<li class="col-md-5">
						Цена за минуту
					</li>
					<li class="col-md-3 lastItem">
						SMS
					</li>

					<li class="col-md-4 secondRow firstItem">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-5 secondRow">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-3 secondRow lastItem">
						<i class="fa fa-sort-down"></i>
					</li>
				</ul>
			</header>
			{{#each}}
			<article>
				<ul>
					<li class="col-md-4">
						<figure class="partner">
							<h4>{{partner}}</h4>
							<br />
							<br />
							<img {{bind-attr src=logoLink}} alt="">
							<p> 
								{{productName}}
							</p>
							<span>
								подробнее о тарифе <i class="fa fa-plus"></i>
							</span>
							<div>Ежемесячный платеж: <b>{{monthlyPayment}}</b></div>
						</figure>
					</li>
					<li class="col-md-5">
						<figure class="time pda">
							<div>
								<p class="green">
									Базовая опция
								</p>
								<p>
									<i>«Интернет на день»</i>
								</p>
								<h4>
									 50 <i class="fa fa-rouble"></i> / <span>день</span> 500 МБ
								</h4>
								<section>
										<p>
										(сверх лимита - 0 руб./мб)
										</p>
										<aside>
											Доп. информация
										</aside>
								</section>
							</div>
							<div>
								<p class="green">
									Базовая опция
								</p>
								<p>
									<i>«Интернет - Mini»</i>
								</p>
								<h4>
									 350 <i class="fa fa-rouble"></i> / <span>мес</span> 3 ГБ
								</h4>
								<section>
										<p>
										(сверх лимита - 0 руб./мб)
										</p>
										<aside>
											Доп. информация
										</aside>
								</section>
							</div>
							<div>
								<p class="green">
									Базовая опция
								</p>
								<p>
									<i>«МТС Планшет»</i>
								</p>
								<h4>
									 400 <i class="fa fa-rouble"></i> / <span>мес</span> 4 ГБ (0 руб./мб) + мобильное ТВ
								</h4>
								<section>
										<p>
										(сверх лимита - 0 руб./мб)
										</p>
										<aside>
											Доп. информация
										</aside>
								</section>
							</div>
						</figure>
						<footer>
							<i class="fa fa-square-o addToMemory"></i>
							<p>ДОБАВИТЬ К СРАВНЕНИЮ</p>
						</footer>
					</li>
					<li class="col-md-3">
						<figure class="time">
							<div>
								<p>
									Внутри сети
								</p>
								<section>
										<span>{{callPriceInsideMoscowNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p>
											На мобильные телефоны МТС Москвы
											и Моск.обл. и городские телефоны Москвы
										</p>
								</section>
								<section>
										<span class="">{{callPriceInsideNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p class="">
											Номера МТС России
										</p>
										<p>
											Бесплатный порог: 20 мин/сутки
										</p>
								</section>
							</div>
							<div>
								<p>
									Вне сети
								</p>
								<section>
										<span>{{callPriceOutsideMoscowNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p>
											На мобильные телефоны МТС Москвы
											и Моск.обл. и городские телефоны Москвы
										</p>
								</section>
								<section>
										<span>{{callPriceOutsideNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p>
											Номера МТС России
										</p>
								</section>
							</div>
						</figure>
						<footer>
						</footer>
					</li>
					<li class="col-md-2">
						<figure class="time">
							<div>
								<p class="green">
									Включено в плату
								</p>
								<h4>
									 600 шт
								</h4>
								<section>
										<p>
											SMS / MMS на все мобильные номера Московского региона
										</p>
								</section>
							</div>
							<div>
								<p>
									Cверх платы
								</p>
								<section>
										<span>2,9</span>
										<i class="fa fa-rouble"></i>
										<p>
											SMS / MMS на все мобильные номера Московского региона
										</p>
								</section>
							</div>
							<div>
							</div>
						</figure>
						<footer>
							<button>
								Оформить тариф
							</button>
						</footer>
					</li>
				</ul>
			</article>
			{{/each}}
		</div>
	</script>

	<script type="text/x-handlebars" id="smart">
		<div class="mobileTable smart selected">			
			<header>
				<ul>
					<li class="col-md-4">
						Тариф
					</li>
					<li class="col-md-3">
						Звонки
					</li>
					<li class="col-md-2">
						SMS
					</li>
					<li class="col-md-5 lastItem">
						Моб-интернет
					</li>

					<li class="col-md-4 secondRow firstItem">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-3 secondRow">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-2 secondRow">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-5 secondRow lastItem">
						<i class="fa fa-sort-down"></i>
					</li>
				</ul>
			</header>
			{{#each}}
			<article>
				<ul>
					<li class="col-md-4">
						<figure class="partner">
							<h4>{{partner}}</h4>
							<br />
							<br />
							<img {{bind-attr src=logoLink}} alt="">
							<p> 
								{{productName}}
							</p>
							<span>
								подробнее о тарифе <i class="fa fa-plus"></i>
							</span>
							<div>Ежемесячный платеж: <b>{{monthlyPayment}}</b></div>
						</figure>
					</li>
					<li class="col-md-3">
						<figure class="time">
							<div>
								<p class="green">
									Включено в плату
								</p>
								<h4>
									 600 мин
								</h4>
								<section>
										<p>
											Вызов на номера «Мегафона»
											всей России и все номера 
											Московского региона
										</p>
								</section>
							</div>
							<div>
								<p>
									Cверх платы
								</p>
								<section>
										<span>0</span>
										<i class="fa fa-rouble"></i>
										<p>
											На номера «Мегафона» Московского региона
										</p>
								</section>
								<section>
										<span>2</span>
										<i class="fa fa-rouble"></i>
										<p>
											На другие номера Московского региона
										</p>
								</section>
							</div>
						</figure>
						<footer>
							<i class="fa fa-square-o addToMemory"></i>
							<p>ДОБАВИТЬ К СРАВНЕНИЮ</p>
						</footer>
					</li>
					<li class="col-md-2">
						<figure class="time">
							<div>
								<p class="green">
									Включено в плату
								</p>
								<h4>
									 600 шт
								</h4>
								<section>
										<p>
											SMS / MMS на все мобильные номера Московского региона
										</p>
								</section>
							</div>
							<div>
								<p>
									Cверх платы
								</p>
								<section>
										<span>2,9</span>
										<i class="fa fa-rouble"></i>
										<p>
											SMS / MMS на все мобильные номера Московского региона
										</p>
								</section>
							</div>
							<div>
							</div>
						</figure>
						<footer>
						</footer>
					</li>
					<li class="col-md-5">
						<figure class="time">
							<div>
								<p class="green">
									Включено в плату
								</p>
								<h4>
									 3 ГБ
								</h4>
								<section>
										<p>
											Пакет действует по всей России, кроме територии ... подробнее
										</p>
										<p>
											При превышении объема Интернет-трафика 3 ГБ максимальная скорость снижается до 64 кбит / с.
										</p>
								</section>
							</div>
							<div>
								<p>
									Cверх платы
								</p>
									<h4>
										<span>0</span>
										<i class="fa fa-rouble"></i>
									</h4>
								<section>
										<p>
											Пакет действует по всей России, кроме територии ... подробнее
										</p>
										<p>
											При превышении объема Интернет-трафика 3 ГБ максимальная скорость снижается до 64 кбит / с.
										</p>
								</section>
							</div>
						</figure>
						<footer>
							<button>
								Оформить тариф
							</button>
						</footer>
					</li>
				</ul>
			</article>
			{{/each}}
		</div>	
	</script>
	<script type="text/x-handlebars" id="modem">
		<div class="mobileTable modem selected">
			<header>
				<ul>
					<li class="col-md-4">
						Тариф
					</li>
					<li class="col-md-5">
						Интернет-пакеты
					</li>
					<li class="col-md-3">
						Звонки
					</li>
					<li class="col-md-2 lastItem">
						SMS
					</li>

					<li class="col-md-4 secondRow firstItem">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-5 secondRow">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-3 secondRow">
						<i class="fa fa-sort-down"></i>
					</li>
					<li class="col-md-2 secondRow lastItem">
						<i class="fa fa-sort-down"></i>
					</li>
				</ul>
			</header>
			{{#each}}
			<article>
				<ul>
					<li class="col-md-4">
						<figure class="partner">
							<h4>{{partner}}</h4>
							<br />
							<br />
							<img {{bind-attr src=logoLink}} alt="">
							<p> 
								{{productName}}
							</p>
							<span>
								подробнее о тарифе <i class="fa fa-plus"></i>
							</span>
							<div>Ежемесячный платеж: <b>{{monthlyPayment}}</b></div>
						</figure>
					</li>
					<li class="col-md-5">
						<figure class="time pda">
							<div>
								<p class="green">
									Базовая опция
								</p>
								<p>
									<i>«Интернет на день»</i>
								</p>
								<h4>
									 50 <i class="fa fa-rouble"></i> / <span>день</span> 500 МБ
								</h4>
								<section>
										<p>
										(сверх лимита - 0 руб./мб)
										</p>
										<aside>
											Доп. информация
										</aside>
								</section>
							</div>
							<div>
								<p class="green">
									Базовая опция
								</p>
								<p>
									<i>«Интернет - Mini»</i>
								</p>
								<h4>
									 350 <i class="fa fa-rouble"></i> / <span>мес</span> 3 ГБ
								</h4>
								<section>
										<p>
										(сверх лимита - 0 руб./мб)
										</p>
										<aside>
											Доп. информация
										</aside>
								</section>
							</div>
							<div>
								<p class="green">
									Базовая опция
								</p>
								<p>
									<i>«МТС Планшет»</i>
								</p>
								<h4>
									 400 <i class="fa fa-rouble"></i> / <span>мес</span> 4 ГБ (0 руб./мб) + мобильное ТВ
								</h4>
								<section>
										<p>
										(сверх лимита - 0 руб./мб)
										</p>
										<aside>
											Доп. информация
										</aside>
								</section>
							</div>
						</figure>
						<footer>
							<i class="fa fa-square-o addToMemory"></i>
							<p>ДОБАВИТЬ К СРАВНЕНИЮ</p>
						</footer>
					</li>
					<li class="col-md-3">
						<figure class="time">
							<div>
								<p>
									Внутри сети
								</p>
								<section>
										<span>{{callPriceInsideMoscowNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p>
											На мобильные телефоны МТС Москвы
											и Моск.обл. и городские телефоны Москвы
										</p>
								</section>
								<section>
										<span class="">{{callPriceInsideNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p class="">
											Номера МТС России
										</p>
										<p>
											Бесплатный порог: 20 мин/сутки
										</p>
								</section>
							</div>
							<div>
								<p>
									Вне сети
								</p>
								<section>
										<span>{{callPriceOutsideMoscowNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p>
											На мобильные телефоны МТС Москвы
											и Моск.обл. и городские телефоны Москвы
										</p>
								</section>
								<section>
										<span>{{callPriceOutsideNetwork}}</span>
										<i class="fa fa-rouble"></i>
										<p>
											Номера МТС России
										</p>
								</section>
							</div>
						</figure>
						<footer>
						</footer>
					</li>
					<li class="col-md-2">
						<figure class="time">
							<div>
								<p class="green">
									Включено в плату
								</p>
								<h4>
									 600 шт
								</h4>
								<section>
										<p>
											SMS / MMS на все мобильные номера Московского региона
										</p>
								</section>
							</div>
							<div>
								<p>
									Cверх платы
								</p>
								<section>
										<span>2,9</span>
										<i class="fa fa-rouble"></i>
										<p>
											SMS / MMS на все мобильные номера Московского региона
										</p>
								</section>
							</div>
							<div>
							</div>
						</figure>
						<footer>
							<button>
								Оформить тариф
							</button>
						</footer>
					</li>
				</ul>
			</article>
			{{/each}}
		</div>
	</script>