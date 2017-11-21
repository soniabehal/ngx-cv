import { Component } from '@angular/core';
import * as cv from "./ngx-cv"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data = [{
    "phoneNumber": 9685732410,
    "internships": {
      "description": "Learnt about nodejs",
      "skills": "nodejs mongo angular",
      "to": null,
      "from": null,
      "companyName": "Venturepact"
    },
    "hobbies": [
      "singing",
      "Dancinf",
      "Nothin more"
    ],
    "certificates": [
      {
        "year": "2014",
        "description": "got first prize",
        "name": "Singing Talent Hunt"
      },
      {
        "year": "2016",
        "description": "got second prize",
        "name": "Crafting Talent Hunt"
      },
      {
        "year": "2015",
        "description": " got first prize",
        "name": " Dancing Talent Hunt"
      }
    ],
    "achievements": [
      {
        "year": "2014",
        "description": "Got First Prize",
        "title": "Singing Talent Hunt"
      },
      {
        "year": "2012",
        "description": "Got Second Prize",
        "title": "Crafting Talent Hunt"
      },
      {
        "year": "2014",
        "description": "During this internship i learnt a lot of technologies",
        "title": "Internship in venturepact"
      }
    ],
    "projects": {
      "skillsUsed": null,
      "description": null,
      "title": null
    },
    "education": {
      "currentAcademics": {
        "universityName": "abc uiversity",
        "marks": "81",
        "passingYear": "2018"
      },
      "class12": {
        "institute": "institute",
        "board": "ICSE",
        "passingYear": " 2014",
        "medium": null,
        "marks": 83,
        "city": " amritsar",
        "subjects": null
      },
      "class10": {
        "institute": "school",
        "board": "ICSE",
        "passingYear": " 2012",
        "medium": null,
        "marks": 89,
        "city": " Amritsar"
      }
    },
    "careerObjective": "To Become Successful Person In My Life",
    "skills": [
      "NodeJs",
      "Angular"
    ],
    "languages": [
      "english,hindi"
    ],
    "nationality": "India",
    "maritalStatus": "single",
    "currentAddress": {
      "city": "Amritsar",
      "state": "Punjab",
      "country": "India",
      "locality": "Ranjit Avenue",
      "HNo": "#426"
    },
    "motherName": "smriti rani",
    "fatherName": " gurdeep ",
    "gender": "female",
    "email": "abc12@gmail.com",
    "passingYear": "2018",
    "lastName": "",
    "middleName": "kumar",
    "firstName": "abc",
    "dateOfBirth": "1998-05-12T00:00:00.000Z"
    ,
    "countryCode": "+91(IN)"
  }]
  clickMe() {
    console.log("cv value  ", cv);
    cv.onePageCV("../assets/img/profile-pic.jpg","../assets/img/logo.png",this.data);
  }

}
