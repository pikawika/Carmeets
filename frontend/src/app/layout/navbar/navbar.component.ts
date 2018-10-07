import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../user/authentication.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  get aantalLiked7D(): Observable<number> {
    return this.authService.amountLikedNext7D$;
  }

  get aantalGoing7D(): Observable<number> {
    return this.authService.amountGoingNext7D$;
  }

  ngOnInit() {
    this.authService.setTotalGoingNext7D();
    this.authService.setTotalLikedNext7D();
  }
}
