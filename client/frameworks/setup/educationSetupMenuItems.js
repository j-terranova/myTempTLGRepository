import React from 'react';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";

export const EducationPreferencesMenuItems = [
  {
    title: "Preferences" ,
    path: "EducationPreferences",
    icon: <ShoppingCartIcon />,
    nameOfClass: 'nav-text'
  },
];


export const EducationSetupMenuItems = [
  {
    title: "Books" ,
    path: "Books",
    icon: <ShoppingCartIcon />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Chapters",
    path: "Chapters",
    icon: <PeopleIcon  />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Courses",
    path: "Courses",
    icon: <BarChartIcon />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Lessons",
    path: "Lessons",
    icon: <PeopleIcon  />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Drills",
    path: "Drills",
    icon: <BarChartIcon />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Study Guides"  ,
    path: "StudyGuides",
    icon: <ShoppingCartIcon />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Resources",
    path: "Resources",
    icon: <PeopleIcon  />,
    nameOfClass: 'nav-text'
  },
  {
    title: "Tests",
    path: "Tests",
    icon: <PeopleIcon  />,
    nameOfClass: 'nav-text'
  },
];
