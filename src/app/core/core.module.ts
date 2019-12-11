import { NgModule } from "@angular/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HTTPService } from './service/http.sevice';

@NgModule({
    imports:[HttpClientModule],
    providers:[
        HTTPService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass:AuthInterceptor,
            multi:true
        }
    ]

})
export class CoreModule {}