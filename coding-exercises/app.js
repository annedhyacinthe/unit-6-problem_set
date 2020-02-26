window.addEventListener('load', () => {
		let location = document.getElementsByClassName('userLocation')[0]
		let animations = document.getElementsByClassName('animation')[0]
		let tempNum = document.getElementsByClassName('degree')[0]
		let scale = document.getElementsByClassName('scale')[0]
		let condition = document.getElementsByClassName('description')[0]
		let butt = document.getElementsByClassName('button')[0]
		scale.innerText = 'F'
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/743dbb90bc929a52b53c774bbf1e206e/${lat},${long}
			`,{
				match:'GET',
				header:{'origin':'https://api.darksky.net'}
			})
				.then(response => response.json())
				.then(response => {
					let fullLoc = response.timezone
					let index = fullLoc.indexOf('/')
					let state = fullLoc.substring(index + 1)
					location.innerText = state.replace( /_/g, " " )
					tempNum.innerText = response.currently.temperature
					
					condition.innerText = response.currently.summary
					butt.innerText = 'Celsius'
					let icon = response.currently.icon
					setIcons(animations,icon)
				})
			butt.addEventListener('click', function(){
				if(scale.innerText === 'F'){
					butt.innerText = 'Fahrenheit'
					scale.innerText = 'C'
					tempNum.innerText = Number.parseFloat((tempNum.innerText - 32) * (5/9) ).toFixed(2)
				}else{
					butt.innerText = 'Celsius'
					scale.innerText = 'F'
					tempNum.innerText = Number.parseFloat( (tempNum.innerText * (9/5)) + 32).toFixed(2)
				}
			})
		
		});
	}


	const setIcons = (icon,iconID) => {
			let skycons = new Skycons();
			skycons.add(icon,iconID);
			skycons.play();
	};
});

