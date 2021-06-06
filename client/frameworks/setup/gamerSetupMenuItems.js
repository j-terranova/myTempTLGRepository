import React from 'react';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";

export const GamerPreferencesMenuItems = [
  {
    title: "Preferences" ,
    path: "GamerPreferences",
    icon: <ShoppingCartIcon />,
    nameOfClass: 'nav-text'
  },
];


export const GamerSetupMenuItems = [
// {
 //   title: "Adventure",
 //   path: "Adventure",
 //   icon: <PeopleIcon  />,
 //   nameOfClass: 'nav-text'
 // },
 {
  title: "BoardGames" ,
  path: "BoardGames",
  icon: <ShoppingCartIcon />,
  nameOfClass: 'nav-text'
},
//{
//  title: "Combat",
//  path: "Combat",
//  icon: <BarChartIcon />,
//  nameOfClass: 'nav-text'
//},
//{
//  title: "Flight",
//  path: "Flight",
//  icon: <BarChartIcon />,
//  nameOfClass: 'nav-text'
//},
{
  title: "Puzzles"  ,
  path: "Puzzles",
  icon: <ShoppingCartIcon />,
  nameOfClass: 'nav-text'
},
{
  title: "Racing",
  path: "Racing",
  icon: <PeopleIcon  />,
  nameOfClass: 'nav-text'
},
//{
//  title: "Strategy",
//  path: "Strategy",
//  icon: <PeopleIcon  />,
//  nameOfClass: 'nav-text'
//},
{
  title: "Tabular"  ,
  path: "Tabular",
  icon: <ShoppingCartIcon />,
  nameOfClass: 'nav-text'
},
{
  title: "TicTacToe",
  path: "TicTacToe",
  icon: <PeopleIcon  />,
  nameOfClass: 'nav-text'
},
{
  title: "Trivia"  ,
  path: "Trivia",
  icon: <ShoppingCartIcon />,
  nameOfClass: 'nav-text'
},
  
];
