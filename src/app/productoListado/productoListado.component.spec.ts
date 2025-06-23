import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoListadoComponent } from './productoListado.component';

describe('ProductoListaComponent', () => {
  let component: ProductoListadoComponent;
  let fixture: ComponentFixture<ProductoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
