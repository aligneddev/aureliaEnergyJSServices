import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import EnergyRowViewModel from './energyRowViewModel';
import EnergyDataApi from './energyDataApi';
@autoinject
export class Energy {
    public yearOptions: string[] = [];
    public selectedOption = 'all';
    public energyData: EnergyRowViewModel[] = [];
    get showEnergyDataTable() {
        return this.energyData.length > 0;
    }

    constructor(private energyDataApi: EnergyDataApi, private router: Router) {
        // TODO loading indicators
    }

    public async activate() {
        this.yearOptions = await this.energyDataApi.getYearOptions();
        await this.getEnergyData(this.selectedOption);
    }

    public yearOptionSelected(selectedOption: string) {
        return this.getEnergyData(selectedOption);
    }

    public async getEnergyData(option: string) {
        var energyData = await this.energyDataApi.getEnergyData(option);
        const vmList = energyData.map((data) => {
            return new EnergyRowViewModel(data, this.router);
        });
        this.energyData = vmList;
    }
}