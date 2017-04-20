import EnergyDataDto from './energyDataDto';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export default class EnergyDataApi {
    private yearOptions: string[] = [];
    private energyDataCache: EnergyDataDto[] = [];
    constructor(private http: HttpClient) {
        http.configure(config => {
             config.withBaseUrl('api/');
        });
    }

    public async getYearOptions() {
        // let's cache the results client side, it doesn't help in the current setup (we only load it once), 
        // but would help if multiple pages or other imagined scenarios
        // this shows the usefullness of a energyDataApi class, using promises, and a caching option.
        // we could also have the server return 304 and do the caching that way
        if (this.yearOptions.length > 0) {
            return Promise.resolve(this.yearOptions);
        }

        // return the promise
        // fetch documentation http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/1
        this.yearOptions = await this.http.fetch('energy/yearOptions')
            .then<string[]>(response => response.json());

        return this.yearOptions;
    }

    public async getEnergyData(option: string) {
        this.energyDataCache = await this.http.fetch(`energy/solar?year=${option}`)
            .then<EnergyDataDto[]>(response => response.json());

        return this.energyDataCache;
    }

    public async getEnergyDataByIdAndYear(id: string, year: number): Promise<EnergyDataDto> {
        if (this.energyDataCache.length > 0) {
            return Promise.resolve(this.findEnergyMatch(id, year));
        }

        await this.getEnergyData(year.toString());
        return Promise.resolve(this.findEnergyMatch(id, year));
    }

    private findEnergyMatch(id: string, year: number) {
        return this.energyDataCache.filter((item) => {
            return item.countryId.toString() === id.toString() && item.year.toString() === year.toString();
        })[0];
    }
}
