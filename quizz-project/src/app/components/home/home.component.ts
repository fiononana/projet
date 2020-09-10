import { Component, OnInit } from '@angular/core';
import {DownloadCsvService} from '../../services/download-csv.service';
import {MatDialog} from '@angular/material/dialog';
import {AllService} from '../../all.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jsonData = [
    {
      name: 'Anil Singh',
      age: 33,
      average: 98,
      approved: true,
      description: 'I am active blogger and Author.'
    },
    {
      name: 'Reena Singh',
      age: 28,
      average: 99,
      approved: true,
      description: 'I am active HR.'
    },
    {
      name: 'Aradhya',
      age: 4,
      average: 99,
      approved: true,
      description: 'I am engle.'
    },
  ];

  constructor(private downService: DownloadCsvService,
              public dialog: MatDialog,
              public all:AllService ) { }
              
  // tslint:disable-next-line: typedef
  getCSV() {
    this.downService.downloadFile(this.jsonData, 'jsontocsv');
  }
  ngOnInit(): void {
  }
 
}

  