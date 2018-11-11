;
"use strict"
export default function navCollapse(nodeList,classIn,classOut) {
    let classToAdd;
    let classToRem;
    if (nodeList[0].classList.contains(classIn)) {
      classToAdd = classOut;
      classToRem = classIn;
    } else {
      classToAdd = classIn;
      classToRem = classOut;
    }
    for (let i=0; i<nodeList.length; i++) {
      nodeList[i].classList.add(classToAdd);
      nodeList[i].classList.remove(classToRem);
    }
  };