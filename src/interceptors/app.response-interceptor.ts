import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { AppResponse } from "src/app.response";

@Injectable()
export class AppResponseInterceptor<T extends object> implements NestInterceptor<T, AppResponse<T>>{
  
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<AppResponse<T>> {
    return next.handle().pipe(map(data => {
      const response = new AppResponse<T>();
      if(data) {
        response.setData(data);
      }

      return response;
    }))    
  }
}