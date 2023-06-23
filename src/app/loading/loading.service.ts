import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false)
  loading$: Observable<boolean> = this.loadingSubject.asObservable()

  showloaderUntilcompleted<T>(obs: Observable<T>): Observable<T> {
    let res = new Observable<any>((observer) => {
      observer.next(null)
    })
    console.log("here is the res", res);

    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs),
      finalize(() => this.loadingOff())
    )

  }


  loadingOn() {
    this.loadingSubject.next(true)

  }

  loadingOff() {
    this.loadingSubject.next(false)
  }
}
