// inputs
let salaryInput = document.querySelector(".incomeinput");
let benefitsInput = document.querySelector(".benefitsInput");
let addBenefitsInput = document.querySelector(".addBenefits");
let salary = document.querySelector(".incomeinput");
let nhifCheckbox = document.querySelector("#nhif");
let nssfCheckbox = document.querySelector("#nssf");
let nssfOld = document.querySelector("#old_rate");
let nssfTiered = document.querySelector("#tiered_rate");
let submit = document.querySelector("#calculate");
let emptyField = document.querySelector("#emptyfield");
let alertMessage = document.querySelector(".alert");
let analyze = document.querySelector(".doing_math");
let output = document.querySelector(".output");
let openView = document.querySelector("#output");
let scroller = document.querySelector(".bounce");
let Relief = 2400;
let lowerLimit = 6000;
let upperLimit = 18000;
let NSSFFee, NSSFoldRate, NSSFTieredRate, NSSFPercentage, NHIFFee, Benefits;

// functions
const montlySalary = () => {
  let salary;
  if (salaryInput.value !== "" && Number(salaryInput.value) >= 1000) {
    emptyField.innerHTML = "";
    emptyField.classList.add("hide");
    if (salaryInput.value < 230000) {
      salary = salaryInput.value;
    } else {
      salary = salaryInput.value / 12;
    }
  } else {
    emptyField.classList.remove("hide");
    emptyField.innerHTML = `<span id="empty_field">This Field cannot be empty. Enter Values greater than 999</span>`;
    // return;
  }
  return salary;
};

const nssfTieredFee = () => {
  NSSFTieredRate = 0;
  NSSFPercentage = 0.06;
  if (montlySalary() < lowerLimit) {
    NSSFTieredRate = NSSFTieredRate;
  } else if (montlySalary() > upperLimit) {
    NSSFTieredRate = 2160;
  } else {
    NSSFTieredRate = montlySalary() * NSSFPercentage;
  }
  return NSSFTieredRate;
};

let state = false;
nssfCheckbox.addEventListener("click", () => {
  state = !state;
  nssfOld.value = "false";
  if (state) {
    nssfOld.value = "true";
  } else {
    nssfOld.value = "false";
  }
  if (nssfOld.checked !== !nssfOld.checked) {
    nssfOld.checked = !nssfOld.checked;
  }
});

nssfTiered.addEventListener("click", () => {
  if (state === false) {
    if (nssfOld.checked !== !nssfOld.checked) {
      nssfTiered.checked = !nssfTiered.checked;
      nssfOld.checked != !nssfOld.checked;
    }
  } else {
    nssfOld.checked = !nssfOld.checked;
  }
});

nssfOld.addEventListener("click", () => {
  nssfOld.checked = !nssfOld.checked;
});

const calculateNSSFFee = () => {
  NSSFoldRate = 200;
  if (state !== false) {
    alertMessage.innerHTML = "";
    alertMessage.classList.add("hide");
    if (nssfOld.checked === true) {
      NSSFFee = NSSFoldRate;
    } else {
      NSSFFee = nssfTieredFee();
    }
  } else {
    alertMessage.classList.remove("hide");
    alertMessage.innerHTML = `<span id="alert_message">Please check this box before proceeding</span>`;
    return;
  }
  return NSSFFee;
};

const calculateIncomeAfterPension = () => {
  let incomeAvailable = 0;
  if (montlySalary() >= lowerLimit) {
    incomeAvailable = montlySalary() - calculateNSSFFee();
  } else return montlySalary();
  return incomeAvailable;
};

const calculateBenefits = () => {
  Benefits = 0;
  if (benefitsInput.value !== "" && addBenefitsInput.value !== "") {
    Benefits = Number(benefitsInput.value) + Number(addBenefitsInput.value);
  } else if (benefitsInput.value !== "" && addBenefitsInput.value === "") {
    Benefits = Number(benefitsInput.value);
  } else if (benefitsInput.value === "" && addBenefitsInput.value !== "") {
    Benefits = Number(addBenefitsInput.value);
  } else {
    Benefits = 0;
  }
  return Benefits;
};

const calculateTaxableIncome = () => {
  let taxableIncome = 0;
  taxableIncome = calculateIncomeAfterPension() - calculateBenefits();
  return taxableIncome;
};

const calculateTaxOnTaxableIncome = () => {
  let tax;
  switch (true) {
    case montlySalary() < 12298:
      tax = montlySalary() * 0.1;
      break;
    case montlySalary() > 12298 && montlySalary() < 23885:
      tax = montlySalary() * 0.15;
      break;
    case montlySalary() > 23885 && montlySalary() < 35472:
      tax = montlySalary() * 0.2;
      break;
    case montlySalary() > 35472 && montlySalary() < 47059:
      tax = montlySalary() * 0.25;
      break;
    case montlySalary() > 47059:
      tax = montlySalary() * 0.3;
      break;
  }
  return tax;
};

const checkRelief = () => {
  let relevantRelief = 0;
  relevantRelief = calculateTaxOnTaxableIncome() - Relief;
  if (relevantRelief <= 1000) {
    relevantRelief = 0;
  } else relevantRelief = Relief;
  return relevantRelief;
};

const calculateTaxAfterRelief = () => {
  let taxAfterRelief = 0;
  taxAfterRelief = calculateTaxOnTaxableIncome() - checkRelief();
  return taxAfterRelief;
};

let newState = false;
nhifCheckbox.addEventListener("click", () => {
  newState = !newState;
  if (newState === true) {
    caclulateNHIFFee();
  } else {
    NHIFFee = 0;
  }
});

const caclulateNHIFFee = () => {
  NHIFFee = 0;
  if (nhifCheckbox.checked === true) {
    switch (true) {
      case montlySalary() > 1000 && montlySalary() <= 5999:
        NHIFFee = 150;
        break;
      case montlySalary() > 5999 && montlySalary() <= 7999:
        NHIFFee = 300;
        break;
      case montlySalary() > 7999 && montlySalary() <= 11999:
        NHIFFee = 400;
        break;
      case montlySalary() > 11999 && montlySalary() <= 14999:
        NHIFFee = 500;
        break;
      case montlySalary() > 14999 && montlySalary() <= 19999:
        NHIFFee = 600;
        break;
      case montlySalary() > 19999 && montlySalary() <= 24999:
        NHIFFee = 750;
        break;
      case montlySalary() > 24999 && montlySalary() <= 29999:
        NHIFFee = 850;
        break;
      case montlySalary() > 29999 && montlySalary() <= 34999:
        NHIFFee = 900;
        break;
      case montlySalary() > 34999 && montlySalary() <= 39999:
        NHIFFee = 950;
        break;
      case montlySalary() > 39999 && montlySalary() < 44999:
        NHIFFee = 1000;
        break;
      case montlySalary() > 44999 && montlySalary() <= 49999:
        NHIFFee = 1100;
        break;
      case montlySalary() > 49999 && montlySalary() <= 59999:
        NHIFFee = 1200;
        break;
      case montlySalary() > 59999 && montlySalary() <= 69999:
        NHIFFee = 1300;
        break;
      case montlySalary() > 69999 && montlySalary() <= 79999:
        NHIFFee = 1400;
        break;
      case montlySalary() > 79999 && montlySalary() <= 89999:
        NHIFFee = 1500;
        break;
      case montlySalary() > 89999 && montlySalary() < 99999:
        NHIFFee = 1600;
        break;
      case montlySalary() > 99999:
        NHIFFee = 1700;
        break;
    }
  } else NHIFFee = NHIFFee;
  return NHIFFee;
};

const calculateNetPay = () => {
  let NetPay = 0;
  if (montlySalary() >= lowerLimit) {
    NetPay =
      calculateTaxableIncome() -
      (calculateTaxAfterRelief() + caclulateNHIFFee());
  } else return (NetPay = montlySalary());
  return NetPay;
};

submit.addEventListener("click", () => {
  if (montlySalary() >= 0) {
    if (calculateNSSFFee() >= 0) {
      analyze.innerHTML = `<span id="call_message">Calculating...</span>`;
      submit.style.backgroundColor = "#6090ff";
      submit.style.color = "white";
      submit.style.border = "1px solid transparent";
      setTimeout(function calculating() {
        analyze.innerHTML = "";
        output.classList.remove("hide");
        scroller.classList.remove("hide");
        submit.style.backgroundColor = "transparent";
        submit.style.color = "#003c6e";
        submit.style.border = "1px solid #707070";
      }, 2000);
      document.querySelector("#display").innerHTML = `
      <div id="row-1">
        <p>INCOME BEFORE PENSION DEDUCTION</p>
        <p>${montlySalary()}</p>
      </div>
      <div id="row-1">
        <p>DEDUCTIBLE NSSF PENSION CONTRIBUTION</p>
        <p>${calculateNSSFFee()}</p>
      </div>
      <div id="row-1">
        <p>INCOME AFTER PENSION DEDUCTIONS</p>
        <p>${calculateIncomeAfterPension()}</p>
      </div>
      <div id="row-1">
        <p>BENEFITS IN KIND</p>
        <p>${calculateBenefits()}</p>
      </div>
      <div id="row-1">
        <p>TAXABLE INCOME</p>
        <p>${calculateTaxableIncome()}</p>
      </div>
      <div id="row-1">
        <p>TAX ON TAXABLE INCOME</p>
        <p>${calculateTaxOnTaxableIncome()}</p>
      </div>
      <div id="row-1">
        <p>PERSONAL RELIEF</p>
        <p>${checkRelief()}</p>
      </div>
      <div id="row-1">
        <p>TAX NET OF RELIEF</p>
        <p>${calculateTaxAfterRelief()}</p>
      </div>
      <div id="row-1">
        <p>PAYEE</p>
        <p>${calculateTaxAfterRelief()}</p>
      </div>
      <div id="row-1">
        <p>CHARGABLE INCOME</p>
        <p>${calculateTaxableIncome()}</p>
      </div>
      <div id="row-1">
        <p>NHIF CONTRIBUTION</p>
        <p>${caclulateNHIFFee()}</p>
      </div>
      <div id="row-1">
        <p>NET PAY</p>
        <p>${calculateNetPay()}</p>
      </div>
      `;
    } else {
      return calculateNSSFFee();
    }
  }
});

let toggleState = false;
openView.addEventListener("click", () => {
  toggleState = !toggleState;
  if (toggleState) {
    document.querySelector("#display").style.transition = ".2s ease-in-out";
    document.querySelector("#display").style.display = "none";
    openView.querySelector("img").style.transition = ".25s ease-in-out";
    openView.querySelector("img").style.transform = "rotate(0deg)";
  } else {
    document.querySelector("#display").style.display = "block";
    openView.querySelector("img").style.transform = "rotate(180deg)";
  }
});
