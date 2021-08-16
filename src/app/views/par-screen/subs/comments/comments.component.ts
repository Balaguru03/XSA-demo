import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  name=new FormControl('',Validators.required)
  
  edit=false
    constructor(public dialogRef: MatDialogRef<CommentsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        console.log(this.data)
        if(data!=''){
          this.name.setValue(this.data)
        }
      
      }
  
    ngOnInit(): void {
    }
    submit(){
     this.dialogRef.close(this.name.value)
    }
    cancel(){
      this.dialogRef.close(this.data)
    }
}
