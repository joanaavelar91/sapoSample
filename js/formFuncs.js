validateIntegerNumbers = (value) => {
  return value >= 0;
};
transformStringToNumber = (value) => {
  if (!isNaN(value) && !(typeof value === "number"))
    return value.trim() !== "" ? Number(value) : NaN;
  return value;
};
xYValidations = (xValue, yValue) => {
  return xValue <= yValue;
};
blueValidation = (buttonClicked, xValue, valid) => {
  if (buttonClicked.includes("rightButton")) {
    valid = xValue <= 7;
  }
  return valid;
};
greenValidation = (buttonClicked, xValue, valid) => {
  if (buttonClicked.includes("middleButton")) {
    valid = xValue === 3;
  }
  return valid;
};
validateXValue = (event, xValue) => {
  var value = xValue !== undefined ? xValue : $(event.target).val(),
    newXValue = transformStringToNumber(value),
    valid = validateIntegerNumbers(newXValue);
  const yValue = transformStringToNumber($("#yValue").val());
  const dValue = transformStringToNumber($("#dValue").val());
  const buttonClicked = $(".bodyElemContainer").attr("class");

  if (validateIntegerNumbers) {
    valid =
      xYValidations(newXValue, yValue) &&
      valid &&
      blueValidation(buttonClicked, newXValue, valid) &&
      greenValidation(buttonClicked, newXValue, valid);
  }

  if (xValue === undefined) {
    formValidation(
      valid,
      yValueOnChange(null, yValue),
      dValueOnChange(null, dValue)
    );
  }

  if (!valid) {
    $(".xWarning").removeClass("hideText");
  } else {
    $(".xWarning").addClass("hideText");
  }
  return valid;
};
yValueOnChange = (event, yValue) => {
  var value = yValue !== undefined ? yValue : $(event.target).val(),
    newYValue = transformStringToNumber(value),
    valid = validateIntegerNumbers(newYValue),
    newXValue = transformStringToNumber($("#xValue").val());
  const dValue = transformStringToNumber($("#dValue").val());
  valid = valid && xYValidations(newXValue, newYValue);

  yValue !== undefined ? "" : validateXValue(null, newYValue);

  if (yValue === undefined) {
    formValidation(
      validateXValue(null, newXValue),
      valid,
      dValueOnChange(null, dValue)
    );
  }
  if (!valid) {
    $(".yWarning").removeClass("hideText");
  } else {
    $(".yWarning").addClass("hideText");
  }
  return valid;
};
dValueOnChange = (event, dValue) => {
  var value = dValue !== undefined ? dValue : $(event.target).val(),
    newDValue = transformStringToNumber(value),
    valid = validateIntegerNumbers(newDValue);
  const newXValue = transformStringToNumber($("#xValue").val()),
    newYValue = transformStringToNumber($("#yValue").val());

  if (!valid) {
    $(".dWarning").removeClass("hideText");
  } else {
    $(".dWarning").addClass("hideText");
  }

  if (dValue === undefined) {
    formValidation(
      validateXValue(null, newXValue),
      yValueOnChange(null, newYValue),
      valid
    );
  }

  return valid;
};
formValidation = (validX, validY, validD) => {
  if (validX && validY && validD) {
    $(".submitButton").attr("disabled", false);
  } else {
    $(".submitButton").attr("disabled", true);
  }
};
resetInputValues = () => {
  $("#xValue").val("");
  $("#yValue").val("");
  $("#dValue").val("");
};
hideWarningMessages = () => {
  !$(".xWarning").hasClass("hideText")
    ? $(".xWarning").addClass("hideText")
    : "";
  !$(".yWarning").hasClass("hideText")
    ? $(".yWarning").addClass("hideText")
    : "";
  !$(".dWarning").hasClass("hideText")
    ? $(".dWarning").addClass("hideText")
    : "";
};
submitFunc = () => {
  const xValue = transformStringToNumber($("#xValue").val()),
    yValue = transformStringToNumber($("#yValue").val()),
    dValue = transformStringToNumber($("#dValue").val()),
    jump = Math.ceil((yValue - xValue) / dValue),
    label = jump < 2 ? "Deu [N] salto" : "Deu [N] saltos";

  $(".sectionTitleH1").text(label.replace("[N]", jump));
};
