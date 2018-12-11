export default [
  {
    type: 'text',
    author: `me`,
    data: { text: `Ahoi Ich möchte gerne 1 Millionen Foxdox Dollar!` }
  },
  {
    type: 'text',
    author: `mattmezza`,
    data: {
      text: `Da müssten sie mir einmal ihren top Secret Foxdox Token geben.`
    }
  },
  {
    type: 'text',
    author: `me`,
    data: { text: `Brauchen sie auch meinen Bank PIN?` }
  },
  {
    type: 'text',
    author: `mattmezza`,
    data: {
      text: `Ja.`
    }
  },
  {
    type: 'file',
    author: `me`,
    data: {
      text: `Alle wichtigen Informationen`,
      file: { name: 'file.csv', url: '#' }
    }
  },
  {
    type: 'system',
    data: {
      text: 'Ihr Konto wurde leergeräumt!',
      meta: '03-11-2018 18:32'
    }
  },
  { type: 'emoji', author: `me`, data: { emoji: `😋` } },
  {
    type: 'text',
    author: `me`,
    data: { text: `Do you read me...`, meta: '✓✓ Read' }
  },
  {
    type: 'text',
    author: `me`,
    data: { text: `...or not?`, meta: '✓ Delivered' }
  },
  {
    type: 'text',
    author: `support`,
    data: { text: `What about suggestions?` },
    suggestions: [
      'Hallo!',
      'Alles wird gut.',
      'Wir bitten um Entschuldigung.',
      'Gewitter? In Neuss?.'
    ]
  }
];
