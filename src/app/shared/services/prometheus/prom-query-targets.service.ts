import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PROMETHEUS_URL} from '../../../app.constants';
import {TargetsResponseType} from '../../types/prometheus/targets/targets-response.type';
import {createRequestOption} from '../../util/request-util';

@Injectable({
  providedIn: 'root'
})
export class PromQueryTargetsService {
  public resourceUrl = PROMETHEUS_URL + 'api/v1/targets';

  constructor(private http: HttpClient) {
  }

  query(req?: any): Observable<HttpResponse<TargetsResponseType>> {
    const options = createRequestOption(req);
    return this.http.get<TargetsResponseType>(this.resourceUrl, {params: options, observe: 'response'});
  }


}