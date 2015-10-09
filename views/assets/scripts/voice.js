var recognition = new webkitSpeechRecognition
var count = 1
var analysis
function init() {
	recognition.continuous = true
	recognition.interimResults = true

	recognition.onresult = function (event) {
        console.log(event)
		console.log(event.results[0][0].transcript)
	}
	recognition.onresult = function (event) {
		var str = ""
		var arr = []
		console.log(event)
		for (var i = 0; i < event.results.length; i++) {
			console.log(event.results[i][0].transcript)
			str += event.results[i][0].transcript
		}
		arr = str.split( " " )
		if (arr.length > 50 * count) {
			console.log( "Sent string " + count )
			setText(str)
			count++
		}
	}
	
	recognition.start()
}

function makeCall(data) {
				analysis =
		$.ajax( {
			url: 'https://api.meaningcloud.com/class-1.1?key=129d648c7d24be62927ba5d1df30343f',
			type: 'POST',
			cache: false,
			data: data,
			success: function ( s ) {
				console.log( s )
			}
			, error: function ( jqXHR, textStatus, err ) {
				alert( 'text status ' + textStatus + ', err ' + err )
			}
        } )
				console.log( analysis )
}

function setText( text ) {
	var data = {
		key: '129d648c7d24be62927ba5d1df30343f',
		of: 'json',
		lang: 'en',
		txt: text,
		model: 'IPTC_en'
	}
	makeCall( data )
}

window.onload = init()