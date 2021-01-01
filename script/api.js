const api = {
    baseUrl: "https://api.themoviedb.org/3",
    apiKey: "api_key=f680a867566257f0ead418be1d746aca",

    async searchMovie(movie) {
        console.log("request")
        const responce = await fetch(`${this.baseUrl}/search/movie?${this.apiKey}&query=${movie}`);

        return await responce.json();
    }
}