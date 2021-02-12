import axios from 'axios';

export class CargoService{
    baseUrl = "http://localhost:8081/nomina/cargo/"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(cargo){
        return axios.post(this.baseUrl, cargo).then(res => res.data);
    }

    async delete(id) {
        await fetch(this.baseUrl+id, { method: 'DELETE' });
    }
}