

const getGamerScore = (gamerLevel, playTime,inCorrectAttempts, winLossDraw)=> {
    const timeBase = getTimeBase(gamerLevel);
    const basePoints = getGamerLevelMaxScore(gamerLevel);
    const allowedMisses = getAllowedMisses(gamerLevel);
    console.log("scoring - getTicTacToeScore - gamerLevel = ", gamerLevel);
    console.log("scoring - getTicTacToeScore - playTime = ", playTime);
    console.log("scoring - getTicTacToeScore - inCorrectAttempts = ", inCorrectAttempts);
    console.log("scoring - getTicTacToeScore - winLossDraw = ", winLossDraw);
    console.log("scoring - getTicTacToeScore - timeBase = ", timeBase);
    console.log("scoring - getTicTacToeScore - basePoints = ", basePoints);
    console.log("scoring - getTicTacToeScore - allowedMisses = ", allowedMisses);
    let timeAdjustment = 0;
    let missAdjustment = 0;
    let gs = 0;
    let gamerScore=0;

    if (winLossDraw === "Win")
    {
        if (playTime > timeBase)
        {
            timeAdjustment = (playTime-timeBase)/timeBase;
            if (timeAdjustment>1)
            {
                timeAdjustment = 1;
            }
        }
        console.log("scoring - getTicTacToeScore - timeAdjustment = ", timeAdjustment);
        if (inCorrectAttempts> allowedMisses)
        //Note, less than allowed misses will add to total
        {
            missAdjustment = (allowedMisses - inCorrectAttempts ) * 25
        }
        console.log("scoring - getTicTacToeScore - missAdjustment = ", missAdjustment);
        gs = basePoints - (basePoints * timeAdjustment) + missAdjustment;
        if (gs < 0)
        {
          gs = 0;
        }
        gamerScore= gs.toFixed(2);
    }
    return gamerScore;
}

const getTimeBase = (gamerLevel) => {
    let timeBase = 0;
    switch(gamerLevel) {
        case 1: 
          timeBase =  300;
          break;
        case 2: 
          timeBase =  250;
          break;
        case 3:  
          timeBase =  200;
          break;
        case 4:  
          timeBase =  175;
          break;
        case 5:  
          timeBase =  150;
          break;
        case 6:  
          timeBase =  125;
          break;
        case 7:  
          timeBase =  100;
          break;
        default:
          timeBase = 175;
          break;
    }
    return timeBase;
}

const getGamerLevelMaxScore = (gamerLevel) => {
    let maxLevelPoints = 75;
    switch(gamerLevel) {
        case 1: 
          maxLevelPoints =  50
          break;
        case 2: 
          maxLevelPoints =  60
          break;
        case 3:  
          maxLevelPoints =  70
          break;
        case 4:  
          maxLevelPoints =  75
          break;
        case 5:  
          maxLevelPoints =  100
          break;
        case 6:  
          maxLevelPoints =  125
          break;
        case 7:  
          maxLevelPoints =  150
          break;
        default:
           maxLevelPoints = 75
          break;
    }
    return maxLevelPoints;
}
const getAllowedMisses = (gamerLevel) => {
    let allowedMisses = 0;
    switch(gamerLevel) {
        case 1: 
          allowedMisses = 5;
          break;
        case 2: 
        allowedMisses = 4;
          break;
        case 3:  
        allowedMisses = 3;
          break;
        case 4:  
        allowedMisses = 2;
          break;
        case 5:  
        allowedMisses = 1;
          break;
        case 6:  
        allowedMisses = 0;
          break;
        case 7:  
        allowedMisses = 0;
          break;
        default:
        allowedMisses = 2;
          break;
    }
    return allowedMisses;
}

const getOpponentResponseFrequency = (gamerLevel) => {
    let opponentResponseFrequency = 0;
    switch(gamerLevel) {
        case 1: 
          opponentResponseFrequency =  50;
          //return 50;
          break;
        case 2: 
          opponentResponseFrequency =  63;
          //return 63;
          break;
        case 3:  
          opponentResponseFrequency =  75;
          //return 75;
          break;
        case 4:  
          opponentResponseFrequency =  80;
          //return 88;
          break;
        case 5:  
          opponentResponseFrequency =  90;
          //return 100;
          break;
        case 6:  
          opponentResponseFrequency =  95;
          //return 100;
          break;
        case 7:  
          opponentResponseFrequency =  100;
          //return 100;
          break;
        default:
          return 88;
          break;
    }
    return opponentResponseFrequency;
}

const gamerLevelOptions = [ 
    {id: 1, title: "PreSchooler"}, 
    {id: 2, title: "Beginner"},
    {id: 3, title: "Learner"},
    {id: 4, title: "Intermediate"},
    {id: 5, title: "Scholar"},   
    {id: 6, title: "Expert"}, 
    {id: 7, title: "Wizard"},                 
];

// Relationship between gamerLevel and difficultyLEvel
// gamerLevel    MinDifficultyLevel  MaxDifficultyLevel
// PreSchooler    1                 2
// Beginner       3                 4
// Learner        5                 8
// Intermediate   9                 12
// Scholar        13                14
// Expert         15                17
// Wizard         18                26

const getMinDifficultyLevel = (gamerLevel) => {
  let difficultyLevel = 1
  switch(gamerLevel) {
      case 1: 
        difficultyLevel = 1;
        break;
      case 2: 
      difficultyLevel = 3;
        break;
      case 3:  
      difficultyLevel = 5;
        break;
      case 4:  
      difficultyLevel = 9;
        break;
      case 5:  
      difficultyLevel = 13;
        break;
      case 6:  
      difficultyLevel = 15;
        break;
      case 7:  
      difficultyLevel = 18;
        break;
      default:
      difficultyLevel = 1;
        break;
  }
  return difficultyLevel;
}

const getMaxDifficultyLevel = (gamerLevel) => {
  let difficultyLevel = 1
  switch(gamerLevel) {
      case 1: 
        difficultyLevel = 2;
        break;
      case 2: 
      difficultyLevel = 4;
        break;
      case 3:  
      difficultyLevel = 8;
        break;
      case 4:  
      difficultyLevel = 12;
        break;
      case 5:  
      difficultyLevel = 14;
        break;
      case 6:  
      difficultyLevel = 17;
        break;
      case 7:  
      difficultyLevel = 26;
        break;
      default:
      difficultyLevel = 1;
        break;
  }
  return difficultyLevel;
}

const getGamerLevel = (difficultyLevel) => {
  let gamerLevel = 1
  switch(true) {
      case (difficultyLevel >= 1 && difficultyLevel <= 2): 
        gamerLevel = 1;
        break;
      case (difficultyLevel >= 3 && difficultyLevel <= 4): 
        gamerLevel = 2;
        break;
      case (difficultyLevel >= 5 && difficultyLevel <= 8):  
        gamerLevel = 3;
        break;
      case (difficultyLevel >= 9 && difficultyLevel <= 12):  
        gamerLevel = 4;
        break;
      case (difficultyLevel >= 13 && difficultyLevel <= 14):  
        gamerLevel = 5;
        break;
      case (difficultyLevel >= 15 && difficultyLevel <= 17):  
        gamerLevel = 6;
        break;
      case (difficultyLevel >= 18 && difficultyLevel <= 26):  
        gamerLevel = 7;
        break;
      default:
        gamerLevel = 1;
        break;
  }
  return gamerLevel;
}

export default {
    getGamerScore,
    getOpponentResponseFrequency,
    getGamerLevelMaxScore,
    getMinDifficultyLevel,
    getMaxDifficultyLevel,
    getGamerLevel,
    gamerLevelOptions,
  };