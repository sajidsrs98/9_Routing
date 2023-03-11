import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  // To ge access of currently loaded route
  constructor(private route: ActivatedRoute) { }

  // To load the user
  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    // Observables are a feature added by other third party package, 
    // not by angular but heavily used by Angular which allow you to
    // easily work with asynchronous tasks. This is a asynchronous task 
    // because parameters of the currently loaded route might change in the 
    // future or may never change but you can't block the code and wait user to 
    // to click the link of "load Anna (10)".
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
