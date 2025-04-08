import "inputmask/dist/inputmask.min.js";

document.addEventListener('DOMContentLoaded', function() {
  const phoneInputs = document.querySelectorAll('.input-phone');
  if (phoneInputs.length) {
    phoneInputs.forEach(input => {
      Inputmask({
        mask: '+38 (099) 999-99-99',
        placeholder: '_',
        clearMaskOnLostFocus: true,
        showMaskOnHover: true
      }).mask(input);
    });
  }

  const emailInputs = document.querySelectorAll('.input-email');
  if (emailInputs.length) {
    emailInputs.forEach(input => {
      Inputmask({
        alias: 'email',
        placeholder: '',
        clearMaskOnLostFocus: true,
        showMaskOnHover: true
      }).mask(input);
    });
  }

  const otherInputs = document.querySelectorAll('input:not(.input-phone):not([type="email"])');
  if (otherInputs.length) {
    flsModules.inputmask = Inputmask().mask(otherInputs);
  }
});