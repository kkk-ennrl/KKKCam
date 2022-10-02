app.htmlAdd = `
<div class='mini-screen-1'>
			
			<div class="title">Добавить устройство</div>

			<div class="message">Для начала подключитесь к доступной точке доступа Wifi под названием "KKKCam Setup"<br>Далее нажмите на кнопку продолжить и дождитесь ответа камеры</div>

            <div class="camera_animation"></div>

			<div class="button-bottom" onclick="

				let n = new XMLHttpRequest;
				n.timeout = 5e3;
				n.open('GET', 'http://192.168.4.1/scan', true);
				n.onload = function() {

					mini_screen_redirect(dqs('.screen-popup.app-add-device .mini-screen-1'), dqs('.screen-popup.app-add-device .mini-screen-2'));

					let db = JSON.parse(n.response).networks

					let html = ''

					for (var i = 0; i < db.length; i++) {
						html += '<div class=\'network\'><div class=\'icon signal-100\'></div><div class=\'name\'>' + db[i].name + '</div>'
						html += '<div class=\'locked\'></div><div class=\'connect\' onclick=\'connect_to_wifi(' + JSON.stringify(db[i]) +')\'><span class=\'apple-symbol\'>􀅼</span></div></div>'
					}
					dqs('.mini-screen-2 .wifi-networks').innerHTML = html

				}
				n.onerror = function(){

				}
				n.send()
				


			">Продолжить <span class="apple-symbol">􀄫</span></div>
	

		</div>

		<div class="mini-screen-2">
			
			<div class="title">Подключение к сети</div>

			<div class="message">Выберите wifi сеть для подключения к ней</div>

			<div class="wifi-networks">
				
				<div class="network">
					<div class="icon signal-100"><span class="apple-symbol">􀙇</span></div>
					<div class="name">Wifi1</div>
					<div class="locked"></div>
					<div class="connect"><span class="apple-symbol">􀅼</span></div>
				</div>

				<div class="network">
					<div class="icon signal-100"><span class="apple-symbol">􀙇</span></div>
					<div class="name">Wifi1</div>
					<div class="locked"></div>
					<div class="connect"><span class="apple-symbol">􀅼</span></div>
				</div>

				<div class="network">
					<div class="icon signal-100"><span class="apple-symbol">􀙇</span></div>
					<div class="name">Wifi1</div>
					<div class="locked"></div>
					<div class="connect"><span class="apple-symbol">􀅼</span></div>
				</div>

			</div>


		</div>

		<div class="mini-screen-3">
			
			<div class="title">Подключение к {wifi_name}</div>

			<div class="message">Введите пароль от wifi сети</div>

			<input type="password" class="password-in" placeholder="Введите пароль от сети">
			
			<div class="button-bottom" onclick="

			let l = new XMLHttpRequest;
			l.timeout = 5e3;
			l.open('GET', 'http://192.168.4.1/connect?net={wifi_name_full}&pass=' + dqs('.mini-screen-3 .password-in').value, true);
			l.onload = function(){

				console.log(l.response)

				dqs('.mini-screen-4').innerHTML = dqs('.mini-screen-4').innerHTML.replaceAll('{ip}', JSON.parse(l.response).ip)

				mini_screen_redirect(dqs('.screen-popup.app-add-device .mini-screen-3'), dqs('.screen-popup.app-add-device .mini-screen-4'));

			}
			l.send()

			">Подключить <span class="apple-symbol">􀄫</span></div>

		</div>

		<div class="mini-screen-4">
			
			<div class="title">Почти готово!</div>

			<div class="message">Данные на камеру отправлены!<br>Теперь подключитесь к сети к которой подключили камеру и мы закончим настройку устройства!
			<br><br>
			Обратите внимание: если камера не может подключиться к сети в течении 30 секунд, то она сбрасывает настройку и включается заново!
			</div>
			<div class="button-bottom" onclick="

			if (buttonEnabled.btnConnectedWifi) {

				let n = new XMLHttpRequest;
				n.timeout = 5e3;
				n.open('GET', 'http://{ip}/temp', true)
				n.onload = function(){
					
					let camera = {}
					camera.ip = '{ip}'
					camera.wifi = '{wifi_name_full}'
					let dt = JSON.parse(app.fs.cams)
					dt.push(camera)
					app.fs.cams = JSON.stringify(dt)

					app.screens.home.click()

					refresh_home()

					buttonEnabled.btnConnectedWifi = true
					dqs('.mini-screen-4 .button-bottom').classList = 'button-bottom'

				}
				n.onerror = function() {
					buttonEnabled.btnConnectedWifi = true
					dqs('.mini-screen-4 .button-bottom').classList = 'button-bottom'
				}
				n.send()

				buttonEnabled.btnConnectedWifi = false

				dqs('.mini-screen-4 .button-bottom').classList = 'button-bottom disabled'

			}

			

			">Подключен <span class="apple-symbol">􀄫</span></div>

		</div>

`
app.animation_framerate = 60;
app.animation_thisFrame = 1;
app.animation_enable = true;
app.animation_max = 0


window.addEventListener("DOMContentLoaded", function(){

	app_start()

	//document.body.innerHTML = Android.getNavigationBarHeight() + "px"
	//document.body.style.fontFamily = "aapl"
	//document.body.style.fontSize = "34px"
	//document.body.style.lineHeight = "100vw"
	//document.body.style.textAlign = "center"

})

function getPWADisplayMode() {return "standalone"}

function app_start() {

	app.screens = {}
	app.screens.appPreloader = dqs(".screen.app-preloader");
	app.screens.home = dqs(".screen.app-home")
	app.screens.add_device = dqs(".screen-popup.app-add-device")

	document.body.style.setProperty("--bar-size", Android.getStatusBarHeight() + "px") 
	document.body.style.setProperty("--nav-size", Android.getNavigationBarHeight() / 2+ "px")

	// Запуск приложения

	// Анимация камеры


        let data_animation = animationCamera;

        let animation_max_frame = data_animation.length;

        app.animation_max = animation_max_frame;

        app.animation_json = data_animation;

        setInterval(function(){

                if (app.animation_enable) {

                    app.animation_thisFrame += 1

                    if (app.animation_thisFrame > app.animation_max) {
                        app.animation_thisFrame = 0
                    }

                    let filenameAnim = app.animation_json[app.animation_thisFrame]


                    dqs('.screen-popup .mini-screen-1 .camera_animation').style.background = "url(" + filenameAnim + ") no-repeat";
                    dqs(".screen-popup .mini-screen-1 .camera_animation").style.backgroundSize = "100%";

                    let sizeCam = dqs(".screen-popup.app-add-device").offsetHeight;
                    sizeCam -= 60
                    sizeCam -= dqs('.screen-popup .mini-screen-1 .title').offsetHeight;
                    sizeCam -= dqs('.screen-popup .mini-screen-1 .message').offsetHeight;
                    sizeCam -= dqs('.screen-popup .mini-screen-1 .button-bottom').offsetHeight
                    sizeCam -= (500 - dqs('.screen-popup .mini-screen-1 .button-bottom').offsetHeight - dqs('.screen-popup .mini-screen-1 .button-bottom').offsetTop)

                    sizeCam -= 40

                    dqs(".screen-popup .mini-screen-1 .camera_animation").style.height = sizeCam + "px"
                    dqs(".screen-popup .mini-screen-1 .camera_animation").style.width = sizeCam + "px"
                    dqs(".screen-popup .mini-screen-1 .camera_animation").style.top = (60 + dqs('.screen-popup .mini-screen-1 .title').offsetHeight + dqs('.screen-popup .mini-screen-1 .message').offsetHeight + 20) + "px"




                }

        	}, 1000/app.animation_framerate)


	refresh_home()

}


async function screen_animation(screen_to_open, screen_to_close) {

	screen_to_close.style.display = "block"
	screen_to_close.style.zIndex = "1"
	screen_to_open.style.transform = "translateX(100vw)"
	screen_to_open.style.display = "block"
	screen_to_open.style.zIndex = "2"
	screen_to_open.style.animationName = "kk_anim_openScreen"
	screen_to_open.style.animationDuration = "0.6s"
	screen_to_open.style.animationTimingFunction = "ease-in-out"
	screen_to_close.style.animationName = "kk_anim_blacked"
	screen_to_close.style.animationDuration = "0.6s"
	screen_to_close.style.animationTimingFunction = "ease-in-out"
	setTimeout(await function(){

		screen_to_close.style.display = "none"
		screen_to_open.style.transform = "translateX(0px)"

		screen_to_close.animationName = ""

	}, 598)

}


async function screen_animation_up(screen_to_open, screen_to_close) {

	screen_to_close.style.display = "block"
	screen_to_close.style.zIndex = "1"
	screen_to_open.style.transform = "translateY(100vh)"
	screen_to_open.style.display = "block"
	screen_to_open.style.zIndex = "2"
	screen_to_open.style.animationName = "kk_anim_openScreenUP"
	screen_to_open.style.animationDuration = "0.4s"
	screen_to_open.style.animationTimingFunction = "ease-in-out"
	screen_to_close.style.animationName = "kk_anim_blacked"
	screen_to_close.style.animationDuration = "0.4s"
	screen_to_close.style.animationTimingFunction = "ease-in-out"
	setTimeout(await function(){

		screen_to_close.style.display = "block"
		screen_to_open.style.transform = "translateY(0px)"

		screen_to_close.style.filter ="brightness(0.2)"
		screen_to_close.animationName = ""

	}, 398)

}

async function screen_animation_up_close(screen_to_open, screen_to_close) {

	screen_to_close.style.display = "block"
	screen_to_close.style.zIndex = "2"
	screen_to_close.style.transform = "translateY(0px)"
	screen_to_open.style.display = "block"
	screen_to_open.style.zIndex = "1"
	screen_to_close.style.animationName = "kk_anim_closeScreenUP"
	screen_to_close.style.animationDuration = "0.4s"
	screen_to_close.style.animationTimingFunction = "ease-in-out"
	screen_to_open.style.animationName = "kk_anim_unblacked"
	screen_to_open.style.animationDuration = "0.4s"
	screen_to_open.style.animationTimingFunction = "ease-in-out"
	setTimeout(await function(){

		screen_to_close.style.display = "none"
		screen_to_open.style.transform = "translateY(0px)"

		screen_to_close.animationName = ""

		screen_to_open.style.filter = "brightness(1)"

	}, 398)

}

function mini_screen_redirect(screen_to_close, screen_to_open) {

	screen_to_close.style.display = "none"
	screen_to_open.style.display = "block"

}


function connect_to_wifi(data) {
	console.log(data)
	if (data.name.length >= 12) {
		name = data.name[0] + data.name[1] + data.name[2] + data.name[3] + data.name[4] + data.name[5] + data.name[6] + "..."
	} else {
		name = data.name
	}
	mini_screen_redirect(dqs('.screen-popup.app-add-device .mini-screen-2'), dqs('.screen-popup.app-add-device .mini-screen-3'));
	dqs(".screen-popup.app-add-device").innerHTML = dqs(".screen-popup.app-add-device").innerHTML.replaceAll("{wifi_name}", name)
	dqs(".screen-popup.app-add-device").innerHTML = dqs(".screen-popup.app-add-device").innerHTML.replaceAll("{wifi_name_full}", data.name)
}



function refresh_home() {
	if (app.fs.cams != "[]") {

		let dt = JSON.parse(app.fs.cams)
		let html = ""
		html += "<div class='add-device apple-symbol'>􀁌</div>"
		html += "<div class='devices'>"
		for (var i = 0; i < dt.length; i++) {

			html += "<div class='device'>"
			html += "<img class='preview' src='http://" + dt[i].ip  +"/stream' onError='errorLoading(this)' onload='streamLoaded(this)'>"
			html += "<div class='ip'>" + dt[i].ip +"</div>"
			html += "</div>"
		}
		html += "</div>"
		dqs(".app-home.screen *[app-type='standalone']").innerHTML = html
		dqs(".app-home *[app-type='standalone'] .add-device").addEventListener("click", function(){

		screen_animation_up(app.screens.add_device, app.screens.home)

		setTimeout(function(){
			app.screens.home.onclick= function(){
				screen_animation_up_close(app.screens.home, app.screens.add_device)
				setTimeout(function(){
					dqs(".screen-popup.app-add-device .mini-screen-1").style.display = "block"
					dqs(".screen-popup.app-add-device .mini-screen-2").style.display = "none"
					dqs(".screen-popup.app-add-device .mini-screen-3").style.display = "none"
				}, 398)
				app.screens.home.onclick = null
				app.screens.add_device.innerHTML = app.htmlAdd
				app.animation_thisFrame = 1

			}
		}, 398)

	})

	} else {
		dqs('.app-home *[app-type=\'standalone\'] .not-devices').style.display = "block"
		dqs(".app-home *[app-type='standalone'] .not-devices .nd-add.apple-symbol.sf-button").addEventListener("click", function(){

		screen_animation_up(app.screens.add_device, app.screens.home)

		setTimeout(function(){
			app.screens.home.onclick= function(){
				screen_animation_up_close(app.screens.home, app.screens.add_device)
				setTimeout(function(){
					dqs(".screen-popup.app-add-device .mini-screen-1").style.display = "block"
					dqs(".screen-popup.app-add-device .mini-screen-2").style.display = "none"
					dqs(".screen-popup.app-add-device .mini-screen-3").style.display = "none"
				}, 398)
				app.screens.home.onclick = null
				app.screens.add_device.innerHTML = app.htmlAdd
				app.animation_thisFrame = 1

			}
		}, 398)

	})
	}
}

function open_device(el){

	let img = el.querySelector("img.preview")
	let x = img.x
	let y = img.y
	let height = img.height
	let width = img.width
	let style = `
@keyframes anim_to_image {
	0% {

		position: fixed;
		top: ` + y +`px;
		left: ` + x+`px;
		width: ` + width +`px;
		height: ` + height +`px;

	}
	100% {
		position: fixed;
		width: 100vw;
		height: calc(100vw / 4 * 3);
		top: calc(50% - ((100vw / 4 * 3) / 2));
		left: 0px;
	}

	`



	let styleEL = document.createElement("style")
	styleEL.innerHTML = style
	document.head.appendChild(styleEL)
	styleEL.id = "tempStyle";
	img.style.left = "0px";
	img.style.position = "fixed";
	img.style.top = "calc(50% - ((100vw / 4 * 3) / 2))"
	img.style.height = "calc(100vw / 4 * 3)"
	img.style.width = "100vw"
	img.style.animationName = "anim_to_image"
	img.style.animationDuration = "0.5s"
	img.style.animationTimingFunction = "ease-in-out"
	img.style.zIndex = "999"
	dqs(".camera_view").style.display = "block"
	dqs(".camera_view").style.animationName = "home_fade"
	dqs(".camera_view").style.animationDuration = "0.5s"
	dqs(".camera_view").style.animationTimingFunction = "ease-in-out"

	let code = ""
	let numCode = Math.floor((Math.random() * (4-1)) + 1)
	code += numCode
	for (var i = 1; i < 4; i++) {
	    if (i == numCode) {
	        let numCam = el.querySelector(".ip").innerHTML
	        code += numCam[numCam.length-1]
	    } else {
	        code += Math.floor((Math.random() * (9-0) + 0))
	    }
	}
	let summ = Number(code[0]) + Number(code[1]) + Number(code[2]) + Number(code[3])
	if (summ.toString().length == 2) {
	    code += summ.toString()[1]
	} else {
	    code += summ.toString()
	}
    dqs(".camera_view .code").innerHTML = "Одноразовый код: " + code


	el.setAttribute("onclick", "")

	setTimeout(function(){
		document.head.removeChild(dqs("#tempStyle"))
		dqs(".camera_view .close").onclick = function(){
			let style = `
				@keyframes anim_to_image {
					100% {

						position: fixed;
						top: ` + y +`px;
						left: ` + x+`px;
						width: ` + width +`px;
						height: ` + height +`px;

					}
					0% {
						position: fixed;
						width: 100vw;
						height: calc(100vw / 4 * 3);
						top: calc(50% - ((100vw / 4 * 3) / 2));
						left: 0px;
					}

			`
			let styleEL = document.createElement("style")
			styleEL.innerHTML = style
			document.head.appendChild(styleEL)
			styleEL.id = "tempStyle";

			img.style.left = null;
			img.style.position = null;
			img.style.top = null
			img.style.height = "calc((50vw - 20px - 5px) / 4*3)"
			img.style.width = "calc(100%)"
			img.style.animationName = "anim_to_image"
			img.style.animationDuration = "0.5s"
			img.style.animationTimingFunction = "ease-in-out"
			img.style.zIndex = "999"
			dqs(".camera_view").style.opacity = "0"
			dqs(".camera_view").style.animationName = "fade_out"
			dqs(".camera_view").style.animationDuration = "0.5s"
			dqs(".camera_view").style.animationTimingFunction = "ease-in-out"
			el.setAttribute("onclick", "open_device(this)")

			setTimeout(function(){
				dqs(".camera_view").style.display = "none"
				dqs(".camera_view").style.opacity = "1"
				document.head.removeChild(dqs("#tempStyle"))
			}, 500)
	

		}
	}, 500)

}


function errorLoading(e) {
	let parent = e.parentElement
	parent.querySelector("img").style.visibility = "hidden"
	parent.innerHTML += "<div class='not-connection-image'>􀘰</div>"
	parent.querySelector("img").setAttribute("onerror", "")
	parent.querySelector("img").setAttribute("src", "")
	parent.querySelector("img").setAttribute("onload", "")
	parent.innerHTML += "<div class='not-connection-text'>Поток отсутствует</div>"
	parent.innerHTML += "<div class='not-connection-text1'>Нажмите для перезагрузки</div>"
	parent.setAttribute("onclick", "refresh_home()")
}
function streamLoaded(e) {
	let parent = e.parentElement
	parent.setAttribute("onclick", "open_device(this)")

}