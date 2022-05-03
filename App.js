import React from "react";
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import ProfileScreen from "./screens/profileScreen";

export default App = () => {
 
  return (
    <TailwindProvider utilities={utilities}>
     <ProfileScreen/>
   </TailwindProvider>
  );
};



