import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppDataService } from '../../core/services/app-data.service';
import { AppConstants } from '../../core/constants/appConstants'
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ModalComponent } from 'src/app/core/common/modal/modal.component';

import { map } from 'rxjs/operators'


@Component({
  selector: 'app-member-add-edit',
  templateUrl: './member-add-edit.component.html',
  styleUrls: ['./member-add-edit.component.scss']
})
export class MemberAddEditComponent implements OnInit {
  @ViewChild('pAddEdit', { static: false }) editForm: NgForm;

  headers: HttpHeaders = new HttpHeaders();
  params: HttpParams = new HttpParams();
  bsModalRef2: BsModalRef;
  originalValues: object;
  title: string;
  closeBtnName: string;
  member: object;
  ddTitle: object;
  ddGender: object;
  ddEducation: object;
  ddMaritalStatus: object;
  ddIndicators: object;
  ddOccupation: object;
  ddStatus: object

  constructor(
    public bsModalRef: BsModalRef,
    private appDataService: AppDataService,
    private modalService2: BsModalService
  ) { }

  ngOnInit() {
    console.log(this.member)
    let dateOB;
    if (this.member['dateOfBirth'] == null) {
      dateOB = null;
    } else {
      dateOB = moment(this.member['dateOfBirth']).format('DD-MM-YYYY');
    }
    this.originalValues = {
      titleSel: this.member['titleCd'],
      firstName: this.member['firstName'],
      middleName: this.member['middleName'],
      lastName: this.member['lastName'],
      address: this.member['address'],
      area: this.member['area'],
      pincode: this.member['pincode'],
      mobile: this.member['phoneNo'],
      lLine: this.member['landlineNo'],
      email: this.member['emailId'],
      genderSel: this.member['genderCd'],
      dob: dateOB,
      height: this.member['height'],
      star: this.member['star'],
      rashi: this.member['rashi'],
      studentSel: this.member['currentlyStudyingIndCd'],
      eduSel: this.member['highestEducationCd'],
      empSel: this.member['employedCd'],
      occSel: this.member['occupationCd'],
      maritalStatusSel: this.member['maritalStatusCd'],
      famHeadSel: this.member['headOfFamilyCd'],
      memberId: this.member['memberID'],
      memberStatus: this.member['statusCd']
    }

    setTimeout(() => {
      this.editForm.setValue(this.originalValues)
    })



  }

  onAddEditPerson(form: NgForm) {
    console.log(form)
    const value = form.value;
    console.log(form);
    let dateOB;
    if (value.dob == null) {
      dateOB = null;
    } else {
      dateOB = moment(value.dob).format('YYYY-MM-DD');
    }
    let saveObj = {
      personId: this.member['personId'],
      title: value.titleSel,
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
      address: value.address,
      area: value.area,
      pincode: value.pincode,
      phoneNo: value.mobile,
      landlineNo: value.lLine,
      emailId: value.email,
      gender: value.genderSel,
      dateOfBirth: dateOB,
      age: undefined,
      height: value.height,
      star: value.star,
      rashi: value.rashi,
      currentlyStudyingInd: value.studentSel,
      highestEducation: value.eduSel,
      employed: value.empSel,
      occupation: value.occSel,
      maritalStatus: value.maritalStatusSel,
      headOfFamily: value.famHeadSel,
      memberID: value.memberId,
      status: value.memberStatus,
      updateId: 'dev'
    }
    console.log(saveObj);
    this.appDataService.sendPostRequest(
      AppConstants.baseUrl + AppConstants.personAddEditUrl
      , saveObj
      , { headers: this.headers, params: this.params }).pipe(map((data) => {
        console.log(data)
        if (data[1][0]['@output'] === 'Success')
          return 'Success'
        else
          return data[1][0]['@output']
      }))
      .subscribe(
        (response) => {
          var initialState = {};
          if (response === 'Success') {
            initialState = {
              message: 'Data saved successfully!',
              title: response,
              status: 'done'
            };
            this.bsModalRef.hide();
            // this.editForm.reset(this.originalValues);
          }
          else {
            initialState = {
              message: response,
              title: 'Failed',
              status: 'error'
            };
          }
          this.bsModalRef2 = this.modalService2.show(ModalComponent, { initialState });
          this.bsModalRef2.content.closeBtnName = 'Ok';
        },
        (error) => {
          console.log(error);
        }
      )
  }

  onReset() {
    this.editForm.setValue(this.originalValues);
  }
}
