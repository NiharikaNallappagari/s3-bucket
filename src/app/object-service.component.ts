import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectServiceComponent {

  private usersUrl: string;
  private downloadUrl: string;

constructor(private http: HttpClient) {
  this.usersUrl = 'http://localhost:8080/retrieve-data';
  this.downloadUrl= "http://localhost:8080/download";
}

public getData() {
  return this.http.get<any []>(this.usersUrl);
}

// public downloadDirFile(){
//   return this.http.get(this.downloadUrl, { responseType: 'blob' }); //, {response:'text'}
// }

download(fileName: string, type: string, url:string): Observable<Blob> {
   // const checkedIdsKey = checkedIds.entries();
   // const { value}=checkedIdsKey.next();
   // let {key, value}
  let params = new HttpParams();
  params = params.append('resourceType', type);
  return this.http.get(`http://localhost:8080/zip/${url}/${fileName}`, { //get(`http://localhost:8080/download/${checkedIds}`
    responseType: 'blob',
    params: params
  });
}

public getDirectoryChild(url:string){
  return this.http.get<any []>(`http://localhost:8080/retrieve-data/${url}`);
}

// public downloadDirFile(): Observable<any> {
//     const url = this.downloadUrl;
//     const headers = new HttpHeaders({
//         Accept: 'application/pdf',
//         'Access-Control-Allow-Origin': 'http://localhost:8080/',
//         'Access-Control-Allow-Headers': 'Content-Type',
//         'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
//     });

//     return this.http.get(url, { headers });
// }
}
