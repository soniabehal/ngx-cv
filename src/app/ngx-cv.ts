import * as jsPDF from 'jspdf';
import * as JSZip from 'jszip';
//import { NgModule } from "@angular/core";
import * as fileSaver from "file-saver";
// @NgModule({
//     //declarations:[jsPDF,JSZip],
//     //exports:[jsPDF,JSZip,fileSaver]
// })
//export class ngxcvModule{}

export const onePageCV = (profilepic:any,unipic:any,stuDetails:any)=> {
    var pdf = 0;
    var zip = new JSZip();
    var getImageFromUrl = function (url1:any, url2:any, stdata:any, callback:any) {
        var img = new Image;
        img.src=url1;
        //console.log(" img  ", img);
        var data;
        img.onerror = function () {
            throw new Error('Cannot load image: "' + url1 + '"');
        }
        img.onload = function () {
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Grab the image as a jpeg encoded in base64, but only the data
            data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
            // Convert the data to binary form
            data = atob(data)
            document.body.removeChild(canvas);
            if (typeof callback === 'function') {
                callback(data, url2, stdata, createPDF);
                //console.log(" after callback");
            }
        }
        img.src = url1;
    }

    var getUniversityImage = function (url1:any, url2:any, stdata:any, callback:any) {
        var img = new Image;
        //console.log(" img  ", img);
        var data;
        img.onerror = function () {
            throw new Error('Cannot load image: "' + url2 + '"');
        }
        img.onload = function () {
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Grab the image as a jpeg encoded in base64, but only the data
            data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
            // Convert the data to binary form
            data = atob(data)
            document.body.removeChild(canvas);
            if (typeof callback === 'function') {
                callback(url1, data, stdata, createPDF);
                //console.log(" after callback");
            }
        }
        img.src = url2;
    }

    var createPDF = function (url1:any, url2:any, data:any) {
        // console.log("url ", url1, "    2  ", url2);
        //console.log("student details ", data);
        var image = {
            height: 25,
            width: 25
        }
        var doc = new jsPDF();

        var distTop = 10;
        var margin = {
            left: 10,
            top: 10,
        };
        doc.setFontSize(14);
        doc.setFont("garamond");
        doc.setFontType("bold");

        doc.addImage(url1, 'jpeg', 10, 5, image.width, image.height, "profile");
        doc.addImage(url2, 'jpeg', 150, 5, image.width, image.height, "unilogo");


        image.width += 3;
        var name = data.firstName;
        if (data.middleName != null && data.middleName != ' ' && data.middleName != "") {
            name += " " + data.middleName;
        }
        if (data.lastName != null) {
            name += " " + data.lastName;
        }
        doc.text(name, margin.left + image.width, margin.top);
        doc.setFontSize(11);
        margin.top += 5;
        doc.setFontStyle("normal");
        doc.text("Mechanical Engineering", margin.left + image.width, margin.top);
        margin.top += 5;
        var mobile = data.countryCode + "-" + data.phoneNumber.toString();
        doc.text(mobile, margin.left + image.width, margin.top);
        margin.top += 5;
        doc.text(data.email, margin.left + image.width, margin.top);

        margin.top += distTop;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "BRIEF OVERVIEW / CAREER OBJECTIVE / SUMMARY");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.line(margin.left, margin.top, 200, margin.top);
        margin.top += 5;
        doc.setFontType("normal");
        //console.log("doc width  ", doc.internal.pageSize.width);
        doc.setFontSize(10.5);

        var objective = data.careerObjective;
        var lines = doc.splitTextToSize(objective, 190);
       // console.log("length if lines  ", lines.length);
        doc.text(margin.left, margin.top, lines);
        //heading//
        for (var i = 0; i < lines.length; i++) {
            margin.top += distTop;
        }
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "EDUCATION");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.line(margin.left, margin.top, 200, margin.top);
        margin.top += 5;
        doc.setDrawColor(78, 78, 78);
        doc.rect(margin.left, margin.top, 190, 45);
        margin.top += 5;
        doc.text("Qualification", margin.left + 5, margin.top);
        doc.text("Institute Name", margin.left + 35, margin.top);
        doc.text("Board", margin.left + 75, margin.top);
        doc.text("City", margin.left + 95, margin.top);
        doc.text("Batch Year", margin.left + 125, margin.top);
        doc.text("Aggregate %/CGPA", margin.left + 155, margin.top);
        margin.top += 3;
        doc.setDrawColor(78, 78, 78);
        doc.line(margin.left, margin.top, 200, margin.top);

        doc.setFontSize(10.5);
        doc.setFontStyle("normal");
        margin.top += 5;
        doc.text("Btech", margin.left + 5, margin.top);
        doc.text(data.education.currentAcademics.universityName, margin.left + 35, margin.top);
        doc.text("-", margin.left + 75, margin.top);
        var city = "Jalandhar, Punjab,India";
        var ct = doc.splitTextToSize(city, 30);
        doc.text(ct, margin.left + 95, margin.top);
        //console.log("passing year  ", typeof data.education.currentAcademics.city);
        doc.text(data.education.currentAcademics.passingYear, margin.left + 130, margin.top);
        doc.text(data.education.currentAcademics.marks.toString(), margin.left + 165, margin.top);
        margin.top += 7;
        doc.setDrawColor(78, 78, 78);
        doc.line(margin.left, margin.top, 200, margin.top);


        margin.top += 5;
        doc.text("10+2", margin.left + 5, margin.top);
        doc.text(data.education.class12.institute, margin.left + 35, margin.top);
        doc.text(data.education.class12.board, margin.left + 75, margin.top);
        var city: string = data.education.class12.city;
        var ct = doc.splitTextToSize(city, 30);
        doc.text(ct, margin.left + 95, margin.top);
        doc.text(data.education.class12.passingYear, margin.left + 130, margin.top);
        doc.text(data.education.class12.marks.toString(), margin.left + 165, margin.top);
        margin.top += 7;
        doc.setDrawColor(78, 78, 78);
        doc.line(margin.left, margin.top, 200, margin.top);

        margin.top += 5;
        doc.text("10th", margin.left + 5, margin.top);
        doc.text(data.education.class10.institute, margin.left + 35, margin.top);
        doc.text(data.education.class10.board, margin.left + 75, margin.top);
        var city: string = data.education.class10.city;
        var ct = doc.splitTextToSize(city, 30);
        doc.text(ct, margin.left + 95, margin.top);
        doc.text(data.education.class10.passingYear, margin.left + 130, margin.top);
        doc.text(data.education.class10.marks.toString(), margin.left + 165, margin.top);
        margin.top += 15;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "KEY EXPERTISE / SKILLS");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.setFontType("normal");
        doc.line(margin.left, margin.top, 200, margin.top);
        margin.top += 5;
        var leftDist = 10;
        for (var i = 0; i < data.skills.length; i++) {
            doc.text(leftDist, margin.top, data.skills[i]);
            leftDist += data.skills[i].length + 8;
            //console.log(leftDist);
        }

        //internship
        margin.top += 10;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "INTERNSHIPS");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.setFontType("normal");
        doc.line(margin.left, margin.top, 200, margin.top);
        margin.top += 5;

        doc.setFontType("bold");
        var companyName = data.internships.companyName;
        doc.text(margin.left, margin.top, companyName);
        doc.setFontType("normal");
        var fromDate = new Date(data.internships.from);
        var toDate = new Date(data.internships.to);
        var fDate = fromDate.getUTCDate();
        var fMth = fromDate.getUTCMonth();
        var fYear = fromDate.getUTCFullYear();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dt;
        if (fDate == 1) {
            dt = "st";
        }
        else if (fDate == 2) {
            dt = "nd";
        }
        else if (fDate == 3) {
            dt = "rd";
        }
        else {
            dt = "th";
        }
        var displayFDate = fDate.toString() + dt + " " + months[fMth] + " " + fYear.toString();
        var tDate = toDate.getUTCDate();
        var tMth = toDate.getUTCMonth();
        var tYear = toDate.getUTCFullYear();
        var tdt;
        if (tDate == 1) {
            tdt = "st";
        }
        else if (tDate == 2) {
            tdt = "nd";
        }
        else if (tDate == 3) {
            tdt = "rd";
        }
        else {
            tdt = "th";
        }
        var displayFDate = fDate.toString() + dt + " " + months[fMth] + " " + fYear.toString() + " - " + tDate.toString() +
            tdt + " " + months[tMth] + " " + tYear.toString();

        doc.text(140, margin.top, displayFDate);
        margin.top += 10;
        doc.text(margin.left, margin.top, "Key Skills:");
        doc.setFontType("bold");
        doc.text(margin.left + 20, margin.top, data.internships.skills);

        margin.top += 10;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "ACHIEVEMENTS");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.setFontType("normal");
        doc.line(margin.left, margin.top, 200, margin.top);

        for (var i = 0; i < data.achievements.length; i++) {
            margin.top += 5;
            doc.setFontStyle("bold");
            var index = (i + 1).toString() + " ";
           // console.log(index);
            doc.text(margin.left, margin.top, index);
            doc.setFontType("normal");
            doc.text(margin.left + 5, margin.top, data.achievements[i].description);
        }

        margin.top += 10;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "AWARDS AND SCHOLARSHIPS");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.setFontType("normal");
        doc.line(margin.left, margin.top, 200, margin.top);
        for (var i = 0; i < data.certificates.length; i++) {
            margin.top += 5;
            doc.setFontStyle("bold");
            var index = (i + 1).toString() + " ";
           // console.log(index);
            doc.text(margin.left, margin.top, index);
            doc.setFontType("normal");
            doc.text(margin.left + 5, margin.top, data.certificates[i].description);
        }

        margin.top += 10;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "PERSONAL INTERESTS / HOBBIES    ");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.setFontType("normal");
        doc.line(margin.left, margin.top, 200, margin.top);

        for (var i = 0; i < data.hobbies.length; i++) {
            margin.top += 5;
            doc.setFontStyle("bold");
            var index = (i + 1).toString() + " ";
           // console.log(index);
            doc.text(margin.left, margin.top, index);
            doc.setFontType("normal");
            doc.text(margin.left + 5, margin.top, data.hobbies[i]);
        }



        margin.top += 10;
        doc.setFontSize(11);
        doc.setFont("garamond");
        doc.setFontType("bold");
        doc.text(margin.left, margin.top, "PERSONAL Details   ");
        margin.top += 3;

        doc.setDrawColor(78, 78, 78);
        doc.setLineWidth(0.2);
        doc.setFontType("normal");
        doc.line(margin.left, margin.top, 200, margin.top);
        margin.top += 5;

        doc.setFontStyle("normal");
        doc.text(margin.left, margin.top, "Gender: ");
        doc.text(margin.left + 14, margin.top, data.gender);
        doc.text(margin.left + 120, margin.top, "Date of Birth:");
        var dob = new Date(data.dateOfBirth);
        var dobDate = dob.getDate();
        var dobMth = dob.getMonth();
        var dobYear = dob.getFullYear();
        var ct;
        if (dobDate == 1) {
            ct = "st";
        }
        else if (dobDate == 2) {
            ct = "nd";
        }
        else if (dobDate == 3) {
            ct = "rd";
        }
        else {
            ct = "th";
        }
        var displayDob = dobDate.toString() + " " + months[dobMth] + " " + dobYear.toString();
        doc.text(margin.left + 142, margin.top, displayDob);
        margin.top += 5;
        doc.setFontStyle("normal");
        doc.text(margin.left, margin.top, "Marital Status:");
        doc.text(margin.left + 24, margin.top, data.maritalStatus);
        doc.text(margin.left + 120, margin.top, "Known Languages:");
        var languages = "";
        for (var i = 0; i < data.languages.length; i++) {
            languages += data.languages[i];
            if (i != data.languages.length - 1) {
                languages += ",";
            }
        }
        doc.text(margin.left + 152, margin.top, languages);

        margin.top += 5;
        doc.setFontStyle("normal");
        doc.text(margin.left, margin.top, "Current Address: ");
        var currentAddress = data.currentAddress.HNo + " " + data.currentAddress.locality + " " + data.currentAddress.city;
        doc.text(margin.left + 28, margin.top, currentAddress);
        doc.text(margin.left + 120, margin.top, "Phone Numbers:");
        doc.text(margin.left + 148, margin.top, mobile);

        margin.top += 5;
        doc.text(margin.left, margin.top, "Emails: ");
        doc.text(margin.left + 14, margin.top, data.email);
        if (stuDetails.length == 1) {
            doc.save(data.firstName.trim()+"_"+data.lastName.trim()+ ".pdf");
        }
        else {
            zip.file(data.registrationID.toString() + ".pdf", doc.output(), { binary: true });
            pdf++;
            if (pdf == stuDetails.length) {
                generateZip();
            }
        }
    }
    var generateZip = function () {
        zip.generateAsync({
            type: "blob",
            mimeType: "application/ods",
            compression: "DEFLATE"
        }).then(function (odsFile: any) {
            // odsFile.type == "application/ods"
            //console.log("ods file  ", odsFile);
            // fs.writeFile("hello.zip", odsFile, function(err){/*...*/});
            //location.href="data:application/zip;base64,"+odsFile;
            var filename = 'StudentsData' + Date.now().toString() + ".zip";
            fileSaver.saveAs(odsFile, filename);
        });
    }
    for (var i = 0; i < stuDetails.length; i++) {
        getImageFromUrl(profilepic, unipic, stuDetails[i], getUniversityImage);
    }
}
