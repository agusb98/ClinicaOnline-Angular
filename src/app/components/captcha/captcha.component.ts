import { DOCUMENT } from '@angular/common';
import { Component, OnInit, EventEmitter, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  public key: string = '';
  public formCaptcha: FormGroup;

  public flag = false;
  @Output() status: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.generateRandomString(8);

    this.formCaptcha = this.formBuilder.group({
      recaptcha: new FormControl('', [Validators.required])
    });    
  }

  generateRandomString(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      this.key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  get recaptcha() {
    return this.formCaptcha.get('recaptcha');
  }

  getResult() {
    let retorno = this.recaptcha.value == this.key;
    this.status.emit(retorno);
  }

  resetForm() {
    this.key = '';
    this.start();
  }
}
