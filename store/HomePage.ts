import {action, makeObservable, observable} from "mobx";
import {IConstructorParams} from "@lomray/react-mobx-manager";

class HomePage {
    name = 'Demo2'

    nameFromApi = ''

    private api: IConstructorParams['endpoints'];

    constructor({ endpoints }: IConstructorParams) {
        this.api = endpoints;

        makeObservable(this, {
            name: observable,
            nameFromApi: observable,
            setName: action.bound,
            setNameFromApi: action.bound,
        });
    }

    setName(name: string) {
        this.name = name;
    }

    setNameFromApi(name: string) {
        this.nameFromApi = name;
    }

    async getNameFromApi() {
        const { result } = await this.api.backend.getName();

        this.setNameFromApi(result?.name ?? 'unknown');
    }
}

export default HomePage;
