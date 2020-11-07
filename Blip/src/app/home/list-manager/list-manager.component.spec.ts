import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManagerComponent } from './list-manager.component';

describe('ListManagerComponent', () => {
  let component: ListManagerComponent;
  let fixture: ComponentFixture<ListManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
