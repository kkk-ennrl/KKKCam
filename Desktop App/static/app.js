let app = {}
app.connectionIP = ""
app.connection = false

function validateCode(el) {
	if (el.value.length == 5) {


		let code   = el.value;
		let spCode = code.split("");
		let ip = "192.168.1.16" + spCode[spCode[0]];
		let summ = Number(spCode[0]) + Number(spCode[1]) + Number(spCode[2]) + Number(spCode[3])
		if (summ.toString().length == 2) {
			summ = summ.toString()[1]
		} else {
			summ = summ.toString()
		}
		let valid = false
		if (spCode[4] == summ) {
			valid = true
		}
		
		if (valid) {
			el.parentElement.querySelector(".valid").innerHTML = "􀆅"
			el.parentElement.querySelector(".valid").style.color = "rgba(59, 199, 89, 1)"
			el.parentElement.querySelector(".valid").style.display = "block"

			el.disabled = true
			el.style.userSelect = "none";

			setTimeout(function(){

				el.parentElement.querySelector(".valid").innerHTML = "􀊯"
				el.parentElement.querySelector(".valid").style.color = "white";
				el.parentElement.querySelector(".valid").style.animationName = "loading"
				el.parentElement.querySelector(".valid").style.animationIterationCount = "infinite"
				el.parentElement.querySelector(".valid").style.animationDuration = "1s"
				el.parentElement.querySelector(".status").innerHTML = "Connecting to camera ip: 192.168.1.16" + spCode[spCode[0]] + " <div class='statusValidload'>􀊯</div>"
				el.parentElement.querySelector('.status').style.display = "block"

				let connection = new XMLHttpRequest;
				connection.timeout = 5000;
				app.connection = true
				app.connectionIP = "192.168.1.16" + spCode[spCode[0]]
				connection.open("GET", "http://" + app.connectionIP + "/temp", true)
				
				connection.onload = function(){

					console.log('load')

					let status = document.querySelector(".dialog.add-device-code .status")

					status.querySelector(".statusValidload").style.animationDuration = "0.2s"
					status.querySelector(".statusValidload").style.animationIterationCount = "1"
					status.querySelector(".statusValidload").style.animationName = "animValid"
					status.querySelector(".statusValidload").style.color = "rgba(59, 199, 89, 1)"
					status.querySelector(".statusValidload").innerHTML = "􀆅"
					status.innerHTML += "<br>"
					status.innerHTML += "Collecting all available information and adding a camera to the program <div class='statusValidload'>􀊯</div>"

					setTimeout(function(){

						let status = document.querySelector(".dialog.add-device-code .status")

						status.querySelectorAll(".statusValidload")[1].style.animationDuration = "0.2s"
						status.querySelectorAll(".statusValidload")[1].style.animationIterationCount = "1"
						status.querySelectorAll(".statusValidload")[1].style.animationName = "animValid"
						status.querySelectorAll(".statusValidload")[1].style.color = "rgba(59, 199, 89, 1)"
						status.querySelectorAll(".statusValidload")[1].innerHTML = "􀆅"

						setTimeout(function(){

							let el = document.querySelector(".dialog.add-device-code .status")

							el.parentElement.querySelector(".valid").style.animationDuration = "0.2s"
							el.parentElement.querySelector(".valid").style.animationIterationCount = "1"
							el.parentElement.querySelector(".valid").style.animationName = "animValid"
							el.parentElement.querySelector(".valid").style.color = "rgba(59, 199, 89, 1)"
							el.parentElement.querySelector(".valid").innerHTML = "􀆅"

							setTimeout(function(){

								document.querySelector(".dialog.add-device-code").style.animationName = "closeDialog"
								document.querySelector(".dialog.add-device-code").style.animationDuration = "0.5s"

								setTimeout(function(){

									document.querySelector(".dialog.add-device-code").style.display = "none"

								}, 499)

							}, 1000)


						}, 1000)

					}, 2000)

				}
				connection.onerror = function(){

					console.log('error')

					let status = document.querySelector(".dialog.add-device-code .status")

					status.querySelector(".statusValidload").style.animationDuration = "0.2s"
					status.querySelector(".statusValidload").style.animationIterationCount = "1"
					status.querySelector(".statusValidload").style.animationName = "animValid"
					status.querySelector(".statusValidload").style.color = "rgba(255, 59, 48, 1)"
					status.querySelector(".statusValidload").innerHTML = "􀆄"

					setTimeout(function(){

						let el = document.querySelector(".dialog.add-device-code .status")

						el.parentElement.querySelector(".valid").style.animationDuration = "0.2s"
						el.parentElement.querySelector(".valid").style.animationIterationCount = "1"
						el.parentElement.querySelector(".valid").style.animationName = "animValid"
						el.parentElement.querySelector(".valid").style.color = "rgba(255, 59, 48, 1)"
						el.parentElement.querySelector(".valid").innerHTML = "􀆄"

						setTimeout(function(){

								document.querySelector(".dialog.add-device-code").style.animationName = "closeDialog"
								document.querySelector(".dialog.add-device-code").style.animationDuration = "0.5s"

								setTimeout(function(){

									document.querySelector(".dialog.add-device-code").style.display = "none"

								}, 499)

							}, 1000)

					}, 1000)



				}

				connection.onabort = function(){

					let status = document.querySelector(".dialog.add-device-code .status")

					console.log('abort')

					status.querySelector(".statusValidload").style.animationDuration = "0.2s"
					status.querySelector(".statusValidload").style.animationIterationCount = "1"
					status.querySelector(".statusValidload").style.animationName = "animValid"
					status.querySelector(".statusValidload").style.color = "rgba(255, 59, 48, 1)"
					status.querySelector(".statusValidload").innerHTML = "􀆄"

					setTimeout(function(){

						let el = document.querySelector(".dialog.add-device-code .status")

						el.parentElement.querySelector(".valid").style.animationDuration = "0.2s"
						el.parentElement.querySelector(".valid").style.animationIterationCount = "1"
						el.parentElement.querySelector(".valid").style.animationName = "animValid"
						el.parentElement.querySelector(".valid").style.color = "rgba(255, 59, 48, 1)"
						el.parentElement.querySelector(".valid").innerHTML = "􀆄"

						setTimeout(function(){

								document.querySelector(".dialog.add-device-code").style.animationName = "closeDialog"
								document.querySelector(".dialog.add-device-code").style.animationDuration = "0.5s"

								setTimeout(function(){

									document.querySelector(".dialog.add-device-code").style.display = "none"

								}, 499)

							}, 1000)

					}, 1000)

				}

				connection.ontimeout = function(){

					let status = document.querySelector(".dialog.add-device-code .status")

					console.log('timeout')

					status.querySelector(".statusValidload").style.animationDuration = "0.2s"
					status.querySelector(".statusValidload").style.animationIterationCount = "1"
					status.querySelector(".statusValidload").style.animationName = "animValid"
					status.querySelector(".statusValidload").style.color = "rgba(255, 59, 48, 1)"
					status.querySelector(".statusValidload").innerHTML = "􀆄"

					setTimeout(function(){

						let el = document.querySelector(".dialog.add-device-code .status")

						el.parentElement.querySelector(".valid").style.animationDuration = "0.2s"
						el.parentElement.querySelector(".valid").style.animationIterationCount = "1"
						el.parentElement.querySelector(".valid").style.animationName = "animValid"
						el.parentElement.querySelector(".valid").style.color = "rgba(255, 59, 48, 1)"
						el.parentElement.querySelector(".valid").innerHTML = "􀆄"

						setTimeout(function(){

								document.querySelector(".dialog.add-device-code").style.animationName = "closeDialog"
								document.querySelector(".dialog.add-device-code").style.animationDuration = "0.5s"

								setTimeout(function(){

									document.querySelector(".dialog.add-device-code").style.display = "none"

								}, 499)

							}, 1000)

					}, 1000)

				}

				app.temp = connection

				connection.send()

			}, 1000)

		} else {
			el.parentElement.querySelector(".valid").innerHTML = "􀆄"
			el.parentElement.querySelector(".valid").style.color = "rgba(255, 59, 48, 1)"
			el.parentElement.querySelector(".valid").style.display = "block"
		}
	} else {
		el.parentElement.querySelector(".valid").style.display = "none"
	}
	
}

function openDialog() {

	let d = document.querySelector(".dialog.add-device-code")	

	d.style.animationName = "openDialog";
	d.querySelector(".status").innerHTML = ""
	d.querySelector("input").disabled = false
	d.querySelector("input").value = ""
	d.querySelector(".valid").style.display = "none"
	d.querySelector(".status").style.display = "none"

	d.style.display = "block"

}