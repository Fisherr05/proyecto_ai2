import axios from 'axios';

export class AnticipoService{
    baseUrl = "http://localhost:8081/nomina/anticipo/"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(anticipo){
        return axios.post(this.baseUrl, anticipo).then(res => res.data);
    }

    async delete(id) {
        await fetch(this.baseUrl+id, { method: 'DELETE' });
    }
}