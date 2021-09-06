import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import Moment from 'moment';

// define a generatePDF function that accepts a tickets argument
const generateTransfusionPDF = (transfusions, poruka) => {
  // initialize jsPDF
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.setFillColor(135, 124,45,0);

  // define the columns we want and their titles
  const tableColumn = ["Datum objave potrebne transfuzije", "Potrebna krvna grupa", "Mjesto potrebne transfuzije", "Kolicina potrebnih doza"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  transfusions.forEach(t => {
    var type=t.user.typeOfBlood.rhFactor ? '+':'-';
    const donationData = [
    Moment(t.publishingDate).format('DD-MM-YYYY'),
    t.user.typeOfBlood.bloodType + type,
    t.placeOfNeededDonation,
    t.bloodQuantityNeeded
    ];
    tableRows.push(donationData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(poruka, 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_donations_${dateStr}.pdf`);
};

export default generateTransfusionPDF;