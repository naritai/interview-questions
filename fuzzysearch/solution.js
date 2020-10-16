
 /**
 * Функция проверяет, является ли первая строка подпоследовательностью второй
 * (нечеткий поиск — fuzzysearch или approximate string matching).
 *  
 * Нужно реализовать функцию с использованием только одного прохода 
 * по символам строки, без использования регулярных выражений.
 * 
 * 
 * Пример работы:
 * 
 * fuzzysearch('car', 'cartwheel')         // true
 * fuzzysearch('cwhl', 'cartwheel')        // true
 * fuzzysearch('cwheel', 'cartwheel')      // true
 * fuzzysearch('cartwheel', 'cartwheel')   // true
 * fuzzysearch('cwheeel', 'cartwheel')     // false
 * fuzzysearch('lw', 'cartwheel')          // false
*/

function fuzzysearch(needle, stack) {
  for (let char of stack) {
    if (char === needle.charAt(0)) {
      needle = needle.slice(1);
    }
  }
  console.log(!needle.length);
};

fuzzysearch('car', 'cartwheel')         // true
fuzzysearch('cwhl', 'cartwheel')        // true
fuzzysearch('cwheel', 'cartwheel')      // true
fuzzysearch('cartwheel', 'cartwheel')   // true
fuzzysearch('cwheeel', 'cartwheel')     // false
fuzzysearch('lw', 'cartwheel')          // false