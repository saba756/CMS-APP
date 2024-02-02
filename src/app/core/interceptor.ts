import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export const JwtInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const token = localStorage.getItem('token');
    if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer `+token,
          },
        });
        return next(cloned);
      } else {
        return next(req);
      }
};

// export class JwtInterceptor implements HttpInterceptor{
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//     if(token){
//       req = req.clone({
//         setHeaders: {
//          Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(req);
//   }
// }

