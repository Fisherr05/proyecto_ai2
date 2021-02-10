import axios from 'axios';

export class PersonalService{
    baseUrl = "http://localhost:8081/nomina/personal/"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    save(personal){
        return axios.post(this.baseUrl, personal).then(res => res.data);
    }

    async delete(id) {
        await fetch(this.baseUrl+id, { method: 'DELETE' });
    }
}