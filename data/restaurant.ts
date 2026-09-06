export const restaurant = {
  name:'Sushi em Casa Express', slug:'sushi-em-casa-express', whatsapp:process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5544999999999', instagram:'sushiemcasaexpress',
  address:{street:'R. Palotina, 227', district:'Conj. Hab. Parigot de Souza', city:'Campo Mourão', state:'PR', postalCode:'87310-606'},
  coordinates:{lat:-24.0437,lng:-52.3827}, minimumOrder:25, delivery:{estimate:'35—55 MIN',defaultFee:7,zones:{Centro:5,'Parigot de Souza':4,LarParaná:7}},
  hours:[{day:0,open:'18:30',close:'23:00'},{day:1,open:'18:30',close:'23:00'},{day:2,open:'18:30',close:'23:00'},{day:3,open:'18:30',close:'23:00'},{day:4,open:'18:30',close:'23:30'},{day:5,open:'18:30',close:'23:30'},{day:6,open:'18:30',close:'23:30'}],
};
