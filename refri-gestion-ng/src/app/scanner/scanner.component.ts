import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  private measures: Measure[];
  private selected_measure: Measure;
  constructor() {
    this.measures = [];
    let measureQte = new Measure(1, 'Qte', 1);
    let measureL = new Measure(2, 'L', 1);
    let measureKg = new Measure(3, 'kg', 1);
    this.measures.push(measureQte);
    this.measures.push(measureL);
    this.measures.push(measureKg);

    console.log('measure', this.measures);
   }

  ngOnInit() {
  }

}
