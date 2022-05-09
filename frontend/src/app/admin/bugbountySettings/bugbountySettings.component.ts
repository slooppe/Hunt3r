import {Component, OnInit,TemplateRef } from '@angular/core';

import { FormGroup,FormBuilder  } from '@angular/forms';
import { BugbountyPlatformService } from '../../core/bugbountyPlatform/bugbountyPlatform.service'
import {
  NbToastrService,
  NbComponentStatus

} from '@nebular/theme';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './bugbountySettings.component.html',
  styleUrls: ['./bugbountySettings.component.scss']
})
export class BugbountySettingsComponent implements OnInit {


  yeswehackForm: FormGroup = <FormGroup> {};
  yeswehackExist=false;
  yeswehack = {
    "email":"",
    "password":"",
    "otp":""
  }
  
  intigritiForm: FormGroup = <FormGroup> {};
  intigritiExist=false;
  intigriti = {
    "email":"",
    "hunter_username":"",
    "password":"",
    "otp":""
  }

  hackeroneForm: FormGroup = <FormGroup> {};
  hackeroneExist=false;
  hackerone = {
    "email":"",
    "password":"",
    "otp":""
  }



  loading=true

  constructor(private fbuilder: FormBuilder,
    private toastrService: NbToastrService,
    private bugbountyPlatform : BugbountyPlatformService) {

      this.yeswehackForm = this.fbuilder.group({
          email:'',
          password:'',
          otp:''
      });
      this.intigritiForm = this.fbuilder.group({
        email:'',
        password:'',
        otp:''
    });
    this.hackeroneForm = this.fbuilder.group({
        email:'',
        hunter_username:'',
        password:'',
        otp:''
    });
  }

  ngOnInit(): void {
    this.yeswehackExist = false;
    this.intigritiExist = false;
    this.getPlatform()
  }

  getPlatform(){
    this.intigriti = {
      "email":"",
      "hunter_username":"",
      "password":"",
      "otp":""
    }
    this.yeswehack = {
      "email":"",
      "password":"",
      "otp":""
    }
    this.hackerone = {
      "email":"",
      "password":"",
      "otp":""
    }
    this.bugbountyPlatform.getPlatform().subscribe( (result) => {
      
      this.yeswehackExist = false;
      this.intigritiExist = false;
      this.hackeroneExist = false
      result.data.forEach( (element) => {
        console.log(this.yeswehackExist)
        if(element.name == 'yeswehack'){
          this.yeswehack.email = element.email
          this.yeswehackExist=true
        } 
        if(element.name == 'intigriti'){
          this.intigriti.email = element.email
          this.intigritiExist = true
        } 
        if(element.name == 'hackerone'){
          this.hackerone.email = element.email
          this.hackeroneExist = true
        } 

      });     
      this.loading = false;
    },(err) =>{
      this.loading = false;
      this.showToast(err.message,'danger')
    })
  }

  deleteYeswehack() {
    this.loading = true;
    this.bugbountyPlatform.deletePlatform('yeswehack').subscribe( (result) => {
      this.loading=false
      this.yeswehackExist=false
      this.showToast('Settings of YesWeHack platform deleted','success')
      this.getPlatform()
    },(err) =>{
      this.loading = false;
      this.showToast(err.message,'danger')
    })
  }
  updateYeswehack(event:any) {
    this.loading=true
    event.preventDefault()
    let data = this.yeswehackForm.value
    let finalData = {"platform": data}
    data.name='yeswehack'
    if(this.yeswehackExist)
    {
      this.bugbountyPlatform.updatePlatform(finalData).subscribe( (result) =>{
        this.loading=false
        this.showToast('Settings of YesWeHack updated','success')
        this.getPlatform()
      },(err) =>{
        this.loading = false;
        this.showToast(err.message,'danger')
      })
    } else {
      this.bugbountyPlatform.createPlatform(finalData).subscribe( (result) =>{
        this.loading=false
        this.showToast('Settings of YesWeHack created','success')
        this.getPlatform()
      },(err) =>{
        this.loading = false;
        this.showToast(err.message,'danger')
      })
    }
  }

  updateIntigriti(event:any) {
    this.loading=true
    event.preventDefault()
    let data = this.intigritiForm.value
    if(data.otp=='') delete data.otp
    let finalData = {"platform": data}

    data.name='intigriti'
    if(this.intigritiExist)
    {
      this.bugbountyPlatform.updatePlatform(finalData).subscribe( (result) =>{
        this.loading=false
        this.showToast('Settings of Intigriti updated','success')
        this.getPlatform()
      },(err) =>{
        this.loading = false;
        this.showToast(err.message,'danger')
      })
    } else {
      this.bugbountyPlatform.createPlatform(finalData).subscribe( (result) =>{
        this.loading=false
        this.showToast('Settings of Intigriti created','success')
        this.getPlatform()
      },(err) =>{
        this.loading = false;
        this.showToast(err.message,'danger')
      })
    }
  }
  deleteIntigriti() {
    this.loading = true;
    this.bugbountyPlatform.deletePlatform('intigriti').subscribe( (result) => {
      this.loading=false
      this.yeswehackExist=false
      this.showToast('Settings of Intigriti platform deleted','success')
      this.getPlatform()
    },(err) =>{
      this.loading = false;
      this.showToast(err.message,'danger')
    })
  }
  


  updateHackerone(event:any) {
    this.loading=true
    event.preventDefault()
    let data = this.hackeroneForm.value
    if(data.otp == "" ) delete data.otp
    data.name='hackerone'
    if(this.yeswehackExist)
    {
      this.bugbountyPlatform.updatePlatform(data).subscribe( (result) =>{
        this.loading=false
        this.showToast(result.message,'success')
        this.getPlatform()
      },(err) =>{
        this.loading = false;
        this.showToast(err.message,'danger')
      })
    } else {
      this.bugbountyPlatform.createPlatform(data).subscribe( (result) =>{
        this.loading=false
        this.showToast(result.message,'success')
        this.getPlatform()
      },(err) =>{
        this.loading = false;
        this.showToast(err.message,'danger')
      })
    }
  }
  deleteHackerone() {
    this.loading = true;
    this.bugbountyPlatform.deletePlatform('hackerone').subscribe( (result) => {
      this.loading=false
      this.showToast(result.message,'success')
      this.getPlatform()
    },(err) =>{
      this.loading = false;
      this.showToast(err.message,'danger')
    })
  }



  showToast(message: string, status: NbComponentStatus = 'danger') {
    if(status == 'danger' ) this.toastrService.show(message, 'Error', { status });
    if(status == 'success' ) this.toastrService.show(message, 'Success', { status });
  }
}
