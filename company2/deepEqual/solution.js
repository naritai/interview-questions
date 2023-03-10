function isEqual(obj1, obj2) {
  const first = Object.entries(obj1);
  const second = Object.entries(obj2);

  if (first.length !== second.length) {
    return false;
  }

  let objectsEqual = true;

  first.forEach(([key, valObj1]) => {
    const valObj2 = obj2[key];

    const isVal1Obj = valObj1 && typeof valObj1 === 'object';
    const isVal2Obj = valObj2 && typeof valObj2 === 'object';

    if (isVal1Obj && isVal2Obj) {
      if (isEqual(valObj1, valObj2) === false) {
        objectsEqual = false;
      }
    } else {
      if (valObj2 !== valObj1) {
        objectsEqual = false;
      }
    }
  });
  
  return objectsEqual;
}

// TODO: OPTIMIZE & REFACTOR