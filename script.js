const apiKey = 'e53b34c95c1699b74ac314d856175ea8';

function fetchCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude, 'current-weather');
      },
      (error) => {
        const errorMsg =
          error.code === error.PERMISSION_DENIED
            ? 'Permission denied for Geolocation.'
            : 'Error fetching location.';
        document.getElementById('current-weather').innerText = errorMsg;
      }
    );
  } else {
    document.getElementById('current-weather').innerText = 'Geolocation not supported.';
  }
}

function fetchWeather(lat, lon, elementId) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const weather = `${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
      document.getElementById(elementId).innerText = weather;
      recommendSongs(data.weather[0].main); // Recommend songs based on weather
    })
    .catch((error) => {
      document.getElementById(elementId).innerText = 'Error fetching weather data.';
      console.error(error);
    });
}

function fetchManualWeather() {
  const location = document.getElementById('manual-location').value;
  if (!location.trim()) {
    document.getElementById('manual-weather').innerText = 'Please enter a location!';
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Location not found');
      }
      return response.json();
    })
    .then((data) => {
      const weather = `${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
      document.getElementById('manual-weather').innerText = weather;
      recommendSongs(data.weather[0].main); // Recommend songs based on weather
    })
    .catch((error) => {
      document.getElementById('manual-weather').innerText = 'Unable to fetch weather data.';
      console.error(error);
    });
}


// Weather-based song playlist recommendations
const weatherPlaylists = {
  Clear: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWTwbZHrJRIgD?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Rain: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2bK0LgUFYs8pdItSUzILAa?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Clouds: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0Agslc4ODEicTt3zzKcqYq?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Snow: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/71VrNVqt1ro4wy08exR0bO?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Mist: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1E8O6y2orvyvmg?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Drizzle: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6ALfRKlHn1t?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Thunderstorm: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Smoke: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0SM0LYsmbMT?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Haze: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWY4lFlS4Pnso?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Dust: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXa4ss91ghMY4?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Fog: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2czWA9hqErK?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Sand: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2czWA9hqErK?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Ash: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Squall: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8SfyqmSFDwe?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  Tornado: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
};

// Recommend songs based on the weather
function recommendSongs(weather) {
  const playlist = weatherPlaylists[weather] || weatherPlaylists['Clear'];
  document.getElementById('songs').innerHTML = playlist; // Use the playlist as-is
}


// Fetch the current location weather when the page loads
fetchCurrentLocationWeather();

