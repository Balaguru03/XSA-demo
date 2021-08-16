import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { constructor } from 'console';
import * as _ from 'lodash'
import * as moment from 'moment';
import { CommentsComponent } from '../subs/comments/comments.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  currentWeek = moment().startOf('isoWeek').format('YYYY MM DD')
  days: any = [];
  enableEdit = false;
  enableEditIndex = null;
  startDay:any = null;
  endDay:any = null
  record: any =
    {
      fromDate: new Date(moment().startOf('isoWeek').format('YYYY MM DD')),
      data: [
        {
          project: 'demo',
          subProject: 'sub-demo',
          resource: '',
          day0: {
            allocate: '',
            hours: 0.0,
            comments: ''
          },
          day1: {
            allocate: '',
            hours: 0.00,
            comments: ''
          },
          day2: {
            allocate: '',
            hours: 0.00,
            comments: ''
          },
          day3: {
            allocate: '',
            hours: 0.00,
            comments: ''
          },
          day4: {
            allocate: '',
            hours: 0.00,
            comments: ''
          },
          day5: {
            allocate: '',
            hours: 0.00,
            comments: ''
          },
          day6: {
            allocate: '',
            hours: 0.00,
            comments: ''
          },
          comments: ''
        }
      ]
    }
  constructor(private change: ChangeDetectorRef, public dialog: MatDialog) {
    this.datecalc()
  }

  ngOnInit(): void {
  }
  save(index: number, object: string) {
    console.log(this.record.data[index][object]['data'])
  }

  addRow(i: any) {
    this.enableEdit = false;
    this.record.data.push({

      project: 'demo',
      subProject: 'sub-demo',
      day0: {
        allocate: '',
        hours: 0.0,
        comments: ''
      },
      day1: {
        allocate: '',
        hours: 0.00,
        comments: ''
      },
      day2: {
        allocate: '',
        hours: 0.00,
        comments: ''
      },
      day3: {
        allocate: '',
        hours: 0.00,
        comments: ''
      },
      day4: {
        allocate: '',
        hours: 0.00,
        comments: ''
      },
      day5: {
        allocate: '',
        hours: 0.00,
        comments: ''
      },
      day6: {
        allocate: '',
        hours: 0.00,
        comments: ''
      },
      comments:''

    })
    this.enableEditIndex = i;
    this.change.detectChanges()
  }

  enableEditMethod(e: any, i: any) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  sumofdayallocation(property: any) {

    return this.record.data.map((day: any) => day[property].hours).reduce((acc: any, sum: any) =>
      acc + sum
    )
  }

  addcomment(index: any, property: any) {
    const dialog = this.dialog.open(CommentsComponent, { width: "35%", height: "35%", data: this.record.data[index][property].comments })
    dialog.afterClosed().subscribe(savedcomment => {
      this.record.data[index][property].comments = savedcomment
    })
  }
  datecalc() {
    var startOfWeek = moment(this.record.fromDate).subtract(1, 'days');
    var endOfWeek = moment(this.record.fromDate).endOf('isoWeek').subtract(1, 'days');
    var day = startOfWeek;
    while (day < endOfWeek) {
      this.days.push(day.format('ddd - MM / DD'));
      day = day.clone().add(1, 'd');
    }
    this.startDay = startOfWeek.add(1,'days').format('DD/MM/YYYY')
    this.endDay = endOfWeek.subtract(1,'days').format('DD/MM/YYYY')
  }

  manipulationOfWeek(process:string){
   if(process=='increment'){
    if(this.currentWeek > moment(this.record.fromDate).startOf('isoWeek').format('YYYY MM DD')){
      this.days = []
      this.record.fromDate = moment(this.record.fromDate).add(1,'week')
      this.datecalc()
    }
   }
   else{
    this.days = []
    this.record.fromDate = moment(this.record.fromDate).subtract(1,'week')
    this.datecalc()
   }
  }
}
