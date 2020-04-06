import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
    async model() {
        //Catidades totales
        let all = await fetch('http://api.coronastatistics.live/all');
        let dataAll = await all.json();
        // console.log(dataAll);

        //Cantidades por ciudades
        let countries = await fetch('http://api.coronastatistics.live/countries');
        let dataCountries = await countries.json();
        // console.log(dataCountries);

        //Almacenamos los datos en una variable
        let alltodayCases = 0;
        let alltodayDeaths = 0;
        let alltotalCritical = 0;
        let allcasesPerOneMillion = 0;

        dataCountries.forEach(dataCountries => {
            alltodayCases += dataCountries.todayCases;
            alltodayDeaths += dataCountries.todayDeaths;
            alltotalCritical += dataCountries.active;
            allcasesPerOneMillion += dataCountries.casesPerOneMillion;
        });
        // console.log(" Hoy: ", alltodayCases, " Muertos: ", alltodayDeaths, " Criticos: ", alltotalCritical, " Pormillon: ", allcasesPerOneMillion)

        return [
            {
                title: "Infections",
                data: dataAll.cases,
                today: alltodayCases + " today"
            },
            {
                title: "Deaths",
                data: dataAll.deaths,
                today: alltodayDeaths + " today"
            },
            {
                title: "Deaths",
                data: dataAll.recovered,
                today: alltotalCritical + " remaining"
            }
            ,
            {
                title: "Critical",
                data: dataAll.recovered,
                today: allcasesPerOneMillion + " per million"
            }];

    }
}