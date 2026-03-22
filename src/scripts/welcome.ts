class Welcome {
  constructor() {
    console.log('welcome');
  }

   aboutDeveloper() {
    console.log('👨‍💻 Developer: Manish');
    console.log('🚀 Fullstack Developer');
  }
}

const run = async () => {
  const app = new Welcome();
  console.log(app);
 const command = process.argv[2];

 console.log(command);

//   console.log(command);

//   if (command === 'developerinfo') {
//     await app.aboutDeveloper();
//   }
};

run();