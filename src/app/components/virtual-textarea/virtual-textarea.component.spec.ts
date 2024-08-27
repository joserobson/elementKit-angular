import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTextareaComponent } from './virtual-textarea.component';

describe('VirtualTextareaComponent', () => {
  let component: VirtualTextareaComponent;
  let fixture: ComponentFixture<VirtualTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTextareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
