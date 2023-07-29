import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Goals from 'src/app/model/Goals';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/v1/goals';

  getGoalsByUserId(userId: number): Observable<Goals[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Goals[]>(`${this.baseUrl}/findByUserId/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addGoals(goals: Goals): Observable<Goals> {
    const token = localStorage.getItem('token');
    return this.http.post<Goals>(`${this.baseUrl}/add`, goals, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateGoals(id: number, goals: Goals): Observable<Goals> {
    const token = localStorage.getItem('token');
    return this.http.put<Goals>(`${this.baseUrl}/update/${id}`, goals, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteGoals(id: number): Observable<Goals> {
    const token = localStorage.getItem('token');
    return this.http.delete<Goals>(`${this.baseUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteAllGoals(id: number): Observable<Goals> {
    const token = localStorage.getItem('token');
    return this.http.delete<Goals>(`${this.baseUrl}/deleteAll/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
