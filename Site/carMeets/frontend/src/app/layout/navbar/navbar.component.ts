import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../user/authentication.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public aantalLiked7D= 10;
  public aantalGoing7D= 10;

  constructor(private authService: AuthenticationService) {}

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  ngOnInit() {
    this.authService.getTotalLikedNext7D().subscribe(val => {
      if (val != null) {
        this.aantalLiked7D = val;
      }
    });

    this.authService.getTotalGoingNext7D().subscribe(val => {
      if (val != null) {
        this.aantalGoing7D = val;
      }
    });
  }
}
