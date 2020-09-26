class Forecast {
  constructor() {
    this.key = 'rvzdWxHPGrGO95fHjJOiek09Ao3P70K7';
    this.weatherURI =
      'https://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI =
      'https://dataservice.accuweather.com/locations/v1/cities/search';
    this.cityNameURI =
      'https://api.bigdatacloud.net/data/reverse-geocode-client';
  }
  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    return { cityDets, weather };
  }
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }
  async getCityNameByLocation(latitude, longitude) {
    const query = `?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(this.cityNameURI + query);
    const data = await response.json();
    return data.principalSubdivision;
  }
}
