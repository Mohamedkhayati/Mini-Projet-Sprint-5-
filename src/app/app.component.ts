import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MySupplement';
  constructor (public authService: AuthService,
    private router: Router
  ) {} 

onLogout(){
this.authService.logout();
}
ngOnInit () {
  this.authService.loadToken();
  if (this.authService.getToken()==null ||
   this.authService.isTokenExpired())
  this.router.navigate(['/login']);
  }

}

