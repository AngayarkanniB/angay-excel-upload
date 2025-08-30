import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelUploadService {
  private modalState = new BehaviorSubject<{
    isVisible: boolean;
    resolve?: (value: string[] | null) => void;
  }>({ isVisible: false });

  modalState$: Observable<any> = this.modalState.asObservable();

  openModal(): Promise<string[] | null> {
    return new Promise((resolve) => {
      this.modalState.next({
        isVisible: true,
        resolve
      });
    });
  }

  closeModal(result: string[] | null = null) {
    const state = this.modalState.value;
    state.resolve?.(result);
    this.modalState.next({ isVisible: false });
  }
}
