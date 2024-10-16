import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})

export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>(); 
  private debouncerSubscription?: Subscription; 

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output() 
  public onEnter = new EventEmitter<string>(); 
  
  @Output() 
  public onDebounce = new EventEmitter<string>(); 

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300),
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  onEnterValue(value: string): void {
    this.onEnter.emit(value)
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm); 
  }

}
