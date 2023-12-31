import http2 from "@/shared/services/http-common2";
import http from "@/shared/services/http-common3";
export class CompanyApiService {

    getCompanies() {
        return http2.get('/companies');
    }

    getCompanyById(id) {
        return http2.get(`/companies?id=${id}`);
    }

    deleteCompany(id) {
        return http2.delete(`/companies/${id}`);
    }

    updateCompany(id, data){
        return http2.put(`/companies/${id}`, data);
    }

    createCompany(data) {
        return http.post('/companies', data);
    }
}
