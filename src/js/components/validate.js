import { rule } from 'postcss';

import { validateForms } from '../functions/validate-forms.js';


const rules1 = [
  {
    ruleSelector: '.modal__tel',
    tel: true,
    telError: 'Введите корректный телефон',
    rules: [{
      rule: 'required',
      value: true,
      errorMessage: 'Заполните телефон!'
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Заполните телефон!'
    },],

  },

  {
    ruleSelector: '#modalName',
    rules: [{
      rule: 'required',
      value: true,
      errorMessage: 'Как Вас зовут?'
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Минимальное количество символов 3'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Максиимальное количество символов 30'
    },
    ],
  },
  {
    ruleSelector: '#orderMail',
    rules: [{
      rule: 'required',
      value: true,
      errorMessage: 'Укажите корректный Email!'
    },
      {
        rule: 'email',
        errorMessage: 'Укажите корректный Email!'
      },]
  },


];
const rules4 = [
  {
    ruleSelector: '.service-tel',
    tel: true,
    telError: 'Введите корректный телефон',
    rules: [{
      rule: 'required',
      value: true,
      errorMessage: 'Заполните телефон!'
    }]
  },
  {
    ruleSelector: '#serviceCheckbox',
    rules: [{
      rule: 'required',
      value: true,
      errorMessage: 'Необходимо дать согласие!'
    },
    ]
  },
];



 validateForms('.service__form', rules4)


validateForms('.modal__form', rules1)
