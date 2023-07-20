import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Goals from 'src/app/model/Goals';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/v1/goals';

  getGoalsByUserId(userId: number): Observable<Goals[]>{
    return this.http.get<Goals[]>(`${this.baseUrl}/findByUserId/${userId}`);
  }

  addGoals(goals: Goals): Observable<Goals>{
    return this.http.post<Goals>(`${this.baseUrl}/add`, goals);
  }

}
