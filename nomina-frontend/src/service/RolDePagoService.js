import axios from 'axios';

export class RolDePagoService{
    baseUrl = "http://localhost:8081/nomina/rolDePago/"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(rolDePago){
        return axios.post(this.baseUrl, rolDePago).then(res => res.data);
    }

    async delete(id) {
        await fetch(this.baseUrl+id, { method: 'DELETE' });
    }
}