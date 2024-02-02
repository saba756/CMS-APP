import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, Injectable, OnInit } from '@angular/core';
 @Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [CommonModule]
})
@Injectable({providedIn: 'platform'})
export class ModalComponent implements OnInit {
  @ViewChild('createModal') createModal!: ElementRef;
  constructor() { 
  }
  ngOnInit(): void {
    
  }
  openModal() {
    console.log(this.createModal)
    this.createModal.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.createModal.nativeElement.style.display = 'none';
  }
}