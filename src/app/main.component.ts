import { Component, OnInit } from '@angular/core';
import {BucketObject} from './service/BucketObject';
import {ObjectServiceComponent} from './object-service.component';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{
    pageTitle: string ="Welcome to S3 Bucket List";
    headerCheckBox: boolean= false;
    temp: BucketObject[]=[{
        id: 123,
        name: "devl-rgsn/",
        type: "Folder",
        modified: "",
        size: "",
        storage: "Standard",
    },
    {
        id: 456,
        name: "faa/",
        type: "Folder",
        modified: "October 15, 2021, 08:13:20 (UTC-05:00)",
        size: "",
        storage: "Standard",
    },  {
        id: 789,
        name: "illumio/",
        type: "Folder",
        modified: "October 15, 2021, 08:13:20 (UTC-05:00)",
        size: "177.0 B",
        storage: "Standard",
    },
    {
        id: 321,
        name: "waf/",
        type: "Folder",
        modified: "",
        size: "177.0KB",
        storage: "Standard",
    },  {
        id: 654,
        name: "metadata_faa-devl-rgsn.csv",
        type: "csv",
        modified: "December 12, 2020, 08:13:20 (UTC-05:00)",
        size: "",
        storage: "Standard",
    },
    {
        id: 987,
        name: "devl-rgsn/",
        type: "Folder",
        modified: "",
        size: "",
        storage: "Standard",
    },
    {
        id: 324,
        name: "faa/",
        type: "Folder",
        modified: "October 15, 2021, 08:13:20 (UTC-05:00)",
        size: "",
        storage: "Standard",
    },  {
        id: 343,
        name: "illumio/",
        type: "Folder",
        modified: "October 15, 2021, 08:13:20 (UTC-05:00)",
        size: "177.0 B",
        storage: "Standard",
    },
    {
        id: 346,
        name: "waf/",
        type: "Folder",
        modified: "",
        size: "177.0KB",
        storage: "Standard",
    },  {
        id: 677,
        name: "metadata_faa-devl-rgsn.csv",
        type: "csv",
        modified: "December 12, 2020, 08:13:20 (UTC-05:00)",
        size: "",
        storage: "Standard",
    },{
        id: 767,
        name: "waf/",
        type: "Folder",
        modified: "",
        size: "177.0KB",
        storage: "Standard",
    },  {
        id: 450,
        name: "metadata_faa-devl-rgsn.csv",
        type: "csv",
        modified: "December 12, 2020, 08:13:20 (UTC-05:00)",
        size: "",
        storage: "Standard",
    }];
    defaultPage: number = 1;
    itemsPerPage: number = 5;

    downloadZip: string="";
     constructor(private objectServiceComponent: ObjectServiceComponent) {
       console.log("-----main component-----");
     }

     returnedData: any[]= [];
     ngOnInit() {
       this.objectServiceComponent.getData().subscribe(data => {
        this.returnedData = [];
        for (let entry of data) {
          entry.isChecked=false;
            this.returnedData.push(entry);
        }this.returnedData;
       });
     }

     url:string ="DummyDirectories";

     checkedIds: Map<string, string>=new Map();
     download(): void {
        const checkedIdsKey = this.checkedIds.entries();
        for (let value of checkedIdsKey) {
          this.objectServiceComponent.download(value[0], value[1], this.url).subscribe(data => {
              console.log("entered in dir file");
              const fileName =value[0].split(".");
            saveAs(data, fileName[0]); //value[0]
          });
        }
    }

    onChange(bucketObject:any, check:any) {
        const isChecked:boolean =check.checked;
        for(let i=0;i<this.returnedData.length;i++){
          if(this.returnedData[i].id===bucketObject.id){
            const temp:any={...this.returnedData[i]};
            temp.isChecked=isChecked;
            this.returnedData[i]=temp;
            break;
          }
        }
        if(isChecked) {
            this.checkedIds.set(bucketObject.name, bucketObject.type);
            if(this.checkedIds.size===this.returnedData.length) this.headerCheckBox=isChecked;
        } else {
            this.checkedIds.delete(bucketObject.name);
            if(this.headerCheckBox) this.headerCheckBox=false;
        }
    }

    exploreFolder(name: string){
        this.headerCheckBox=false;
        this.checkedIds=new Map();
        this.returnedData = [];
        this.url+="$"+name;
        console.log("clicked------"+this.url)
        this.objectServiceComponent.getDirectoryChild(this.url).subscribe(data => {
            for (let i=0; i<data.length;i++) {
                this.returnedData.push(data[i]);
            }
            this.defaultPage=1;
            this.returnedData;
        });
    }

    pageChanged(event:any){
      console.log("page changed");
      this.defaultPage=event;
    }

    onHeaderCheckboxChange(check:any){
        const isChecked:boolean =check.checked;
        this.headerCheckBox=isChecked;
        for(let i=0;i<this.returnedData.length;i++){
            const temp:any={...this.returnedData[i]};
            temp.isChecked=isChecked;
            this.returnedData[i]=temp;
            if(isChecked){
               this.checkedIds.set(temp.name, temp.type);
            } else{
              this.checkedIds.delete(temp.name);
            }
        }
    }
}
