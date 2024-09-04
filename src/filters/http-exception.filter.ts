import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { AppResponse } from "src/app.response";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {   

    catch(exception: HttpException, host: ArgumentsHost) {                
        const appResponse = new AppResponse<{}>;
        const message = typeof exception.getResponse() === 'string' ? exception.getResponse() : (exception.getResponse() as any).message;                

        if (Array.isArray(message)) {
            message.forEach(msg => appResponse.getErrors().push(msg));            
        }
        else {
            appResponse.getErrors().push(message);
        }

        host.switchToHttp()
            .getResponse<Response>()
            .status(exception.getStatus())
            .send(appResponse);
    }
}