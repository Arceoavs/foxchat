// export default [
//     {
//       id: 'mattmezza',
//       name: 'Matteo',
//       imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
//     },
//     {
//       id: 'support',
//       name: 'Support',
//       imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
//     }
// ];


export default class Participant {
    constructor(id, name, imageUrl){
        this.id = id;
        this.name = name;
        if(imageUrl != null){
            this.imageUrl = imageUrl;
        } else {
            this.imageUrl = 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4';
        }
    }
}
