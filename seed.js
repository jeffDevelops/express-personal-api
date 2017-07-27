// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })\

const db = require('./models');

var my_stats = [
  {
    superficialStuff: {
      height: 6.16,
      weight: 78,
      eyes: 'green',
      hair: 'brown',
    }
  },
  {
    personalInterests: {
      music: {
        creating: ['house', 'indie-pop', 'bass', 'hiphop', 'classical'],
        listening: ['bass', 'indie-pop', 'alternative', 'electronic', 'classical that\'s not Baroque or early Classical'],
      },
      coding: {
        wantToLearn: ['React', 'React Native', 'PaperJS'],
        favoriteLanguages: ['Javascript', 'CSS', 'Swift']
      }
    }
  }
];

var vsts_list = [
  {
    title: 'Serum',
    developer: 'Xfer Records',
    function: 'Wavetable'
  },
  {
    title: 'Massive',
    developer: 'Native Instruments',
    function: 'Subtractive'
  },
  {
    title: 'Kontakt',
    developer: 'Native Instruments',
    function: 'Physical Modeling'
  },
  {
    title: 'Sylenth 1',
    developer: 'Lennar Digital',
    function: 'Subtractive'
  },
  {
    title: 'FabFilter Pro-Q',
    developer: 'FabFilter',
    function: 'Equalization'
  },
  {
    title: 'Melodyne',
    developer: 'Celemony',
    function: 'Pitch and Timing Editing'
  },
  {
    title: 'Ozone 7',
    developer: 'iZotope',
    function: 'Mastering Chain'
  }
];

db.VST.remove({}, function(err, vsts) {
  if (err) {
    console.log(err);
    return;
  }

  vsts_list.forEach(function(vstData) {
    var vst = new db.VST({
      title: vstData.title,
      developer: vstData.developer,
      function: vstData.function
    });
    vst.save(function(err, savedVst) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Saved ' + savedVst.title + ' in the db!');
    });
  });
});

module.exports = my_stats;


