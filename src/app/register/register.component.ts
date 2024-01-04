import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService} from '../services/vehicle.service';
import { any } from 'codelyzer/util/function';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedFileDynamic: File | undefined;
  selectedFile: File | undefined;
  selectedFile1: File | undefined;
  selectedFile2: File | undefined;
  selectedFile3: File | undefined;
  selectedFile4: File | undefined;
  selectedFile5: File | undefined;
  selectedFile6: File | undefined;
  selectedFile7: File | undefined;
  selectedFile8: File | undefined;
  selectedFile9: File | undefined;
  selectedFile10: File | undefined;
  selectedFile11: File | undefined;
  selectedFile12: File | undefined;
  uploadError: string | null = null;
  uploadError1: string | null = null;
  uploadError2: string | null = null;
  uploadError3: string | null = null;
  uploadError4: string | null = null;
  uploadError5: string | null = null;
  uploadError6: string | null = null;
  uploadError7: string | null = null;
  uploadError8: string | null = null;
  uploadError9: string | null = null;
  uploadError10: string | null = null;
  uploadError11: string | null = null;
  uploadError12: string | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  selectedFileUrl1: string | ArrayBuffer | null = null;
  selectedFileUrl2: string | ArrayBuffer | null = null;
  selectedFileUrl3: string | ArrayBuffer | null = null;
  selectedFileUrl4: string | ArrayBuffer | null = null;
  selectedFileUrl5: string | ArrayBuffer | null = null;
  selectedFileUrl6: string | ArrayBuffer | null = null;
  selectedFileUrl7: string | ArrayBuffer | null = null;
  selectedFileUrl8: string | ArrayBuffer | null = null;
  selectedFileUrl9: string | ArrayBuffer | null = null;
  selectedFileUrl10: string | ArrayBuffer | null = null;
  selectedFileUrl11: string | ArrayBuffer | null = null;
  selectedFileUrl12: string | ArrayBuffer | null = null;
  user : any = localStorage.getItem("currentUser");
  arrImages: string[] = [];
  photos: string[] = [];
  nationalImageIds: String[] = [];
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private vehicleService: VehicleService
  ) {
    this.formGroup = formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      sex: new FormControl(1, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      dob: new FormControl(null),
      address: new FormControl(null, Validators.required),
      plate: new FormControl(null, Validators.required),
      class: new FormControl(null, Validators.required),
      contractTerm: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      approvalStatus: new FormControl(0),
      enableStatus:  new FormControl(0)
    });
  }

  ngOnInit() {
    if (!this.user){
      this.router.navigate(['/login']);
    }
  }
  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('currentUser');
        this.user = null;
      },
      (error) => {
        this.toastr.error('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi');
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewSelectedFile();
    this.uploadFile(0);
  }

  onFileSelected1(event: any) {
    this.selectedFile1 = event.target.files[0] as File;
    this.previewSelectedFile1();
    this.uploadFile(1);
  }

  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0] as File;
    this.previewSelectedFile2();
    this.uploadFile(2);
  }

  onFileSelected3(event: any) {
    this.selectedFile3 = event.target.files[0] as File;
    this.previewSelectedFile3();
    this.uploadFile(3);
  }

  onFileSelected4(event: any) {
    this.selectedFile4 = event.target.files[0] as File;
    this.previewSelectedFile4();
    this.uploadFile(4);
  }

  onFileSelected5(event: any) {
    this.selectedFile5 = event.target.files[0] as File;
    this.previewSelectedFile5();
    this.uploadFile(5);
  }

  onFileSelected6(event: any) {
    this.selectedFile6 = event.target.files[0] as File;
    this.previewSelectedFile6();
    this.uploadFile(6);
  }

  onFileSelected7(event: any) {
    console.log("test7");
    this.selectedFile7 = event.target.files[0] as File;
    this.previewSelectedFile7();
    this.uploadFile(7);
  }

  onFileSelected8(event: any) {
    console.log("test");
    this.selectedFile8 = event.target.files[0] as File;
    this.previewSelectedFile8();
    this.uploadFile(8);
  }

  onFileSelected9(event: any) {
    this.selectedFile9 = event.target.files[0] as File;
    this.previewSelectedFile9();
    this.uploadFile(9);
  }

  onFileSelected10(event: any) {
    this.selectedFile10 = event.target.files[0] as File;
    this.previewSelectedFile10();
    this.uploadFile(10);
  }

  onFileSelected11(event: any) {
    this.selectedFile11 = event.target.files[0] as File;
    this.previewSelectedFile11();
    this.uploadFile(11);
  }

  onFileSelected12(event: any) {
    this.selectedFile12 = event.target.files[0] as File;
    this.previewSelectedFile12();
    this.uploadFile(12);
  }

  previewSelectedFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  previewSelectedFile1() {
    if (this.selectedFile1) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl1 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile1);
    }
  }

  previewSelectedFile2() {
    if (this.selectedFile2) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl2 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile2);
    }
  }

  previewSelectedFile3() {
    if (this.selectedFile3) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl3 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile3);
    }
  }

  previewSelectedFile4() {
    if (this.selectedFile4) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl4 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile4);
    }
  }
  previewSelectedFile5() {
    if (this.selectedFile5) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl5 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile5);
    }
  }

  previewSelectedFile6() {
    if (this.selectedFile6) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl6 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile6);
    }
  }

  previewSelectedFile7() {
    if (this.selectedFile7) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl7 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile7);
    }
  }

  previewSelectedFile8() {
    if (this.selectedFile8) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl8= e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile8);
    }
  }

  previewSelectedFile9() {
    if (this.selectedFile9) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl9 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile9);
    }
  }

  previewSelectedFile10() {
    if (this.selectedFile10) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl10 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile10);
    }
  }

  previewSelectedFile11() {
    if (this.selectedFile11) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl11 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile11);
    }
  }

  previewSelectedFile12() {
    if (this.selectedFile12) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl12 = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile12);
    }
  }

  uploadFile(number) {
    if (number == 0) {
      this.selectedFileDynamic = this.selectedFile
    }else if (number == 1) {
      this.selectedFileDynamic = this.selectedFile1
    }else if (number == 2) {
      this.selectedFileDynamic = this.selectedFile2
    }else if (number == 3){
      this.selectedFileDynamic = this.selectedFile3
    }else if (number == 4) {
      this.selectedFileDynamic = this.selectedFile4
    }else if (number == 5) {
      this.selectedFileDynamic = this.selectedFile5
    }else if (number == 6) {
      this.selectedFileDynamic = this.selectedFile6
    }else if (number == 7) {
      this.selectedFileDynamic = this.selectedFile7
    }else if (number == 8) {
      this.selectedFileDynamic = this.selectedFile8
    }else if (number == 9) {
      this.selectedFileDynamic = this.selectedFile9
    }else if (number == 10) {
      this.selectedFileDynamic = this.selectedFile10
    }else if (number == 11) {
      this.selectedFileDynamic = this.selectedFile11
    }else if (number == 12) {
      this.selectedFileDynamic = this.selectedFile12
    }
    if (this.selectedFileDynamic) {
      console.log("thaotv" + number)
      const formData = new FormData();
      formData.append('file', this.selectedFileDynamic, this.selectedFileDynamic.name);
      this.vehicleService.uploadFile(formData).subscribe(
        (response) => {
          console.log('Upload success:', response);
          if (number == 9) {
            this.photos.push(response.detail);
          }else if (number == 7 || number == 8) {
            this.nationalImageIds.push(response.detail);
          }
          this.arrImages.push(response.detail);
          return response;
          // Xử lý phản hồi từ server sau khi tải lên thành công
        },
        (error) => {
          console.error('Upload error:', error);
          return error;
          // Xử lý lỗi nếu có khi tải lên
        }
      );
    }
  }

  upload(){
    if (!this.selectedFile) {
      this.uploadError = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile1){
      this.uploadError1 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile2) {
      this.uploadError2 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile3){
      this.uploadError3 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile4){
      this.uploadError4 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile5){
      this.uploadError5 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile6){
      this.uploadError6 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile7){
      this.uploadError7 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile8){
      this.uploadError8 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile9){
      this.uploadError9 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile10){
      this.uploadError10 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile11){
      this.uploadError11 = 'Vui lòng tải ảnh lên.';
      return;
    }else if (!this.selectedFile12){
      this.uploadError12 = 'Vui lòng tải ảnh lên.';
      return;
    }
    const vehicle: any = {
      name: this.formGroup.value.name,
      accountId: "string",
      vehicleImages: this.arrImages,
      plate: this.formGroup.value.plate,
      class: String(this.formGroup.value.class),
      year: 0,
      cost: this.formGroup.value.cost,
      contractTerm: this.formGroup.value.contractTerm,
      status: 0
    }
    this.vehicleService.vehicle(vehicle).subscribe(
      (response) => {
        const driver: any = {
          name: this.formGroup.value.name,
          accountId: response.detail.accountId,
          vehicleImages: this.arrImages,
          plate: this.formGroup.value.plate,
          class: String(this.formGroup.value.class),
          year: 0,
          cost: this.formGroup.value.cost,
          contractTerm: this.formGroup.value.contractTerm,
          status: 0,
          dob: "2022-01-31",
          sex: this.formGroup.value.sex,
          address: this.formGroup.value.address,
          phoneNumber: this.formGroup.value.phoneNumber,
          nationalId: "string",
          nationalImages: this.nationalImageIds,
          photos: this.photos,
          vehicleIds: [
            "string"
          ]
        }
        this.vehicleService.becomeDriver(driver).subscribe(
          (res) => {
            this.router.navigate(['/']);
          },
            (error) => {
              this.toastr.error('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi');
            }
        )
      },
      (error) => {
        this.toastr.error('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi');
      }
    );
  }
}
