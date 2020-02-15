import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AppDataService } from '../../core/services/app-data.service';
import { AppConstants } from '../../core/constants/appConstants';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { MemberAddEditComponent } from '../member-add-edit/member-add-edit.component'


@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  @ViewChild('mViewGrid') mViewGrid: AgGridAngular;

  hdrs: HttpHeaders = new HttpHeaders;
  params: HttpParams = new HttpParams();
  bsModalRef: BsModalRef;
  public columnDefs = [];
  public rowData = [];
  private selectedRow;
  public title = [];
  public gender = [];
  public education = [];
  public maritalStatus = [];
  public indicators = [];
  public status = [];
  public occupation = [];
  public searchName: string = '';

  constructor(
    private appDataService: AppDataService,
    private modalService: BsModalService
  ) {
    this.columnDefs = [
      { headerName: 'Title', field: 'title' },
      { headerName: 'First Name', field: 'firstName' },
      { headerName: 'Middle Name', field: 'middleName' },
      { headerName: 'Last Name', field: 'lastName' },
      { headerName: 'Address', field: 'address' },
      { headerName: 'Area', field: 'area' },
      { headerName: 'Pincode', field: 'pincode' },
      { headerName: 'Contact No', field: 'phoneNo' },
      { headerName: 'Landline', field: 'landlineNo' },
      { headerName: 'Email', field: 'emailId' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Date Of Birth', field: 'dateOfBirth' },
      { headerName: 'Age', field: 'age' },
      { headerName: 'Height', field: 'height' },
      { headerName: 'Star Sign', field: 'star' },
      { headerName: 'Rashi', field: 'rashi' },
      { headerName: 'Student', field: 'currentlyStudyingInd' },
      { headerName: 'Education', field: 'highestEducation' },
      { headerName: 'Employed', field: 'employed' },
      { headerName: 'Occupation', field: 'occupation' },
      { headerName: 'Marital Status', field: 'maritalStatus' },
      { headerName: 'Head of Family Ind', field: 'headOfFamily' },
      { headerName: 'Life Member ID', field: 'memberID' },
      { headerName: 'Member Status', field: 'status' }
    ]
    this.rowData = [];
  }

  ngOnInit() {
    //Get Title Dropdown
    this.getDropDownValues(AppConstants.ddTitle, (data) => {
      this.title = data
    })
    this.getDropDownValues(AppConstants.ddGender, (data) => {
      this.gender = data
    })
    this.getDropDownValues(AppConstants.ddEducation, (data) => {
      this.education = data
    })
    this.getDropDownValues(AppConstants.ddMaritalStatus, (data) => {
      this.maritalStatus = data
    })
    this.getDropDownValues(AppConstants.ddIndicators, (data) => {
      this.indicators = data
    })
    this.getDropDownValues(AppConstants.ddStatus, (data) => {
      this.status = data
    })
    this.getDropDownValues(AppConstants.ddOccupation, (data) => {
      this.occupation = data
    })
  }

  getDropDownValues(ddName: string, callback) {
    this.appDataService.getDataFromService(
      AppConstants.baseUrl + AppConstants.getDropdownUrl,
      this.hdrs,
      this.params.set(AppConstants.getDropdownParamName, ddName)
    ).subscribe(
      ((data) => {
        callback(data['data'])
      }),
      ((error) => {
        callback(error);
      }))
  }

  onSearch() {
    // console.log(this.searchName)
    this.params = this.params.set('personName', this.searchName)
    this.appDataService.getDataFromService(AppConstants.baseUrl + AppConstants.personSearchUrl, this.hdrs, this.params)
      .subscribe(
        ((data) => {
          // console.log(data)
          this.rowData = data['data'];
        }),
        ((error) => {
          console.log(error);
        })
      )
  }

  onReset() {
    this.rowData = [];
    this.searchName = '';
  }


  openEditModal() {
    const modalOption = {
      initialState: {
        title: 'Edit Values for ' + this.selectedRow.firstName + ' ' + this.selectedRow.lastName,
        member: this.selectedRow,
        ddTitle: this.title,
        ddGender: this.gender,
        ddEducation: this.education,
        ddMaritalStatus: this.maritalStatus,
        ddIndicators: this.indicators,
        ddOccupation: this.occupation,
        ddStatus: this.status
      },
      class: 'modal-xl',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(MemberAddEditComponent, modalOption);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openAddNewModal() {
    const modalOption = {
      initialState: {
        title: 'Add New Member',
        member: {
          address: null
          , age: null
          , area: null
          , currentlyStudyingInd: 'SEL'
          , currentlyStudyingIndCd: 'SEL'
          , dateOfBirth: null
          , emailId: null
          , employed: null
          , employedCd: 'SEL'
          , firstName: null
          , gender: null
          , genderCd: 'SEL'
          , headOfFamily: null
          , headOfFamilyCd: 'SEL'
          , height: null
          , highestEducation: null
          , highestEducationCd: 'SEL'
          , landlineNo: null
          , lastName: null
          , maritalStatus: null
          , maritalStatusCd: 'SEL'
          , memberID: null
          , middleName: null
          , occupation: null
          , occupationCd: 'SEL'
          , personId: null
          , phoneNo: null
          , pincode:null
          , rashi: null
          , star: null
          , status: null
          , statusCd: 'SEL'
          , title: null
          , titleCd: 'SEL'
        },
        ddTitle: this.title,
        ddGender: this.gender,
        ddEducation: this.education,
        ddMaritalStatus: this.maritalStatus,
        ddIndicators: this.indicators,
        ddOccupation: this.occupation,
        ddStatus: this.status
      },
      class: 'modal-xl',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(MemberAddEditComponent, modalOption);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  onSelectionChanged() {
    this.selectedRow = this.mViewGrid.api.getSelectedRows()[0];
    // console.log(this.title);
  }


}
