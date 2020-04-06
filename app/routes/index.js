import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
    async model() {
        let response = await fetch('http://api.coronastatistics.live/all');
        let parsed = await response.json();
        console.log(parsed.cases);

        return {
            cases: parsed.cases,
            deaths: parsed.deaths,
            recovered: parsed.recovered,
        };

    }
}