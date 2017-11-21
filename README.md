# NgxCv

This npm provides an efficient way to convert your json data to Curriculum vitae format.

### Installation
install using npm 

```bash
npm install --save ngx-cv
```

### Usage 
1. Import from ngx-cv where you want to use it.
```typescript
import {onePageCV} from "ngx-cv/src/app/ngx-cv";
```
2. Declare an array of json 
```typescript
data = [
  {
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
  }
]
```
3. Use the function
```typescript
onePageCV(profile picture image, university logo image, data);
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/soniabehal/ngx-cv/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/soniabehal/ngx-cv/blob/master/LICENSE) file for the full text)
