bodyButtonClick = (event) => {
  // Get buttons disposition from DOM
  const tgt = $(event.target),
    parent = tgt.parent();
  var arrayButtons = [...parent.children()];
  const buttonClicked = $(event.target).attr("class");

  // Find index from clicked button
  const position = arrayButtons.findIndex((elem) => {
    return $(elem).attr("class") === buttonClicked;
  });
  var firstElem, lastElem, elemClass;

  // Apply class selected to change elements colours and also the rectangle css

  if (position === 0 || position === arrayButtons.length - 1)
    arrayButtons.map((elem) => {
      elemClass = $(elem).attr("class");

      if (elemClass.includes("selected")) {
        $(elem).removeClass("selected");
        $(".bodyElemContainer").removeClass(elemClass);
      } else if ($(elem).hasClass(buttonClicked)) {
        $(elem).addClass("selected");
        $(".bodyElemContainer").addClass(buttonClicked);
      }
    });

  // Switch buttons' position depending on the clicked one

  if (position === 0) {
    lastElem = arrayButtons.pop();
    arrayButtons.unshift(lastElem);
  } else if (position === arrayButtons.length - 1) {
    firstElem = arrayButtons.shift();
    arrayButtons.push(firstElem);
  }

  // Append the new disposition

  $(parent).empty().append(arrayButtons);

  // reset form values

  resetInputValues();
  hideWarningMessages();
};
collapseText = () => {
  $(".sapoInfo").toggleClass("visibilityText");

  $(".collapseButton").text(
    $(".sapoInfo").hasClass("visibilityText")
      ? "Mostrar Texto"
      : "Esconder Texto"
  );
};
